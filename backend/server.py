from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import time
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import requests


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    project_type: Optional[str] = Field(default="Long-form video editing", max_length=120)
    budget: Optional[str] = Field(default=None, max_length=80)
    message: str = Field(..., min_length=1, max_length=4000)


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    project_type: Optional[str] = None
    budget: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Yousuf Hakim Portfolio API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact_submission(payload: ContactSubmissionCreate):
    try:
        submission = ContactSubmission(**payload.model_dump())
        doc = submission.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.contact_submissions.insert_one(doc)
        return submission
    except Exception as e:
        logger.exception("Failed to store contact submission")
        raise HTTPException(status_code=500, detail="Could not save submission") from e


@api_router.get("/contact", response_model=List[ContactSubmission])
async def list_contact_submissions():
    items = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


# ---------- X (Twitter) video metadata ----------
_X_CACHE: Dict[str, Dict[str, Any]] = {}
_X_CACHE_TTL = 60 * 60 * 24  # 24h


@api_router.get("/x-video/{user}/{tweet_id}")
async def x_video_metadata(user: str, tweet_id: str):
    cache_key = f"{user}/{tweet_id}"
    now = time.time()
    cached = _X_CACHE.get(cache_key)
    if cached and now - cached.get("_at", 0) < _X_CACHE_TTL:
        return {k: v for k, v in cached.items() if k != "_at"}

    try:
        resp = requests.get(
            f"https://api.fxtwitter.com/{user}/status/{tweet_id}",
            timeout=8,
            headers={"User-Agent": "Mozilla/5.0 YousufHakimPortfolio/1.0"},
        )
        if resp.status_code != 200:
            raise HTTPException(status_code=502, detail=f"fxtwitter upstream {resp.status_code}")
        data = resp.json()
        tweet = data.get("tweet") or {}
        media = tweet.get("media") or {}
        videos = media.get("videos") or []
        if not videos:
            raise HTTPException(status_code=404, detail="Tweet has no video")
        # Pick highest-quality variant returned by fxtwitter
        v = videos[0]
        result = {
            "mp4": v.get("url"),
            "thumbnail": v.get("thumbnail_url"),
            "width": v.get("width"),
            "height": v.get("height"),
            "duration_ms": v.get("duration"),
            "author": (tweet.get("author") or {}).get("screen_name") or user,
        }
        _X_CACHE[cache_key] = {**result, "_at": now}
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("x-video fetch failed")
        raise HTTPException(status_code=500, detail=str(e)) from e


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
