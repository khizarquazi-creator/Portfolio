"""Backend API tests for Yousuf Hakim portfolio."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://frame-perfect-105.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root ----------
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert "message" in data
    assert isinstance(data["message"], str)


# ---------- Contact create ----------
def test_create_contact_valid(client):
    payload = {
        "name": "TEST_Jane",
        "email": "test_jane@example.com",
        "project_type": "Long-form video editing",
        "budget": "$2k-$5k",
        "message": "TEST_Please edit my video for me."
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code in (200, 201), r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert "_id" not in data
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["project_type"] == payload["project_type"]
    assert data["budget"] == payload["budget"]
    assert data["message"] == payload["message"]
    assert "created_at" in data

    # Verify persisted via list
    lr = client.get(f"{API}/contact")
    assert lr.status_code == 200
    items = lr.json()
    assert any(it.get("id") == data["id"] for it in items)


def test_create_contact_invalid_email(client):
    payload = {
        "name": "TEST_Bad",
        "email": "not-an-email",
        "message": "TEST_msg"
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 422


def test_create_contact_missing_required(client):
    r = client.post(f"{API}/contact", json={"email": "x@y.com"})
    assert r.status_code == 422


# ---------- Contact list ----------
def test_list_contact_sorted_no_objectid(client):
    # Seed two submissions
    for i in range(2):
        client.post(f"{API}/contact", json={
            "name": f"TEST_Seed_{i}",
            "email": f"seed{i}@example.com",
            "message": f"TEST_msg_{i}"
        })
    r = client.get(f"{API}/contact")
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    assert len(items) >= 2
    for it in items:
        assert "_id" not in it
        assert "id" in it
        assert "created_at" in it
    # Sorted desc by created_at
    timestamps = [it["created_at"] for it in items]
    assert timestamps == sorted(timestamps, reverse=True)
