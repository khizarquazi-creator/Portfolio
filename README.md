# Yousuf Hakim — Portfolio

Premium portfolio site for a freelance video editor / motion designer.
Single-page React app with a separate `/contact` route.

- React 19 + Tailwind + Framer Motion + Lenis
- No backend, no database — fully static
- Contact form via [Web3Forms](https://web3forms.com) (free, optional)
- X video metadata via [fxtwitter](https://github.com/FixTweet/FxTwitter) (free, public CORS-enabled)

---

## Local development

```bash
cd frontend
cp .env.example .env       # then optionally paste your Web3Forms key
yarn install
yarn start
```

Open http://localhost:3000

---

## Deploy to Vercel (free)

### One-time setup
1. **Sign up at [vercel.com](https://vercel.com)** with your GitHub account.
2. **Get a Web3Forms access key** (optional, for the contact form to email you):
   - Go to https://web3forms.com
   - Paste `Yousufhakim.work@gmail.com` → copy the access key it shows.

### Push the repo to GitHub
If your code is on GitHub already, skip to "Import to Vercel". Otherwise:

```bash
cd <project-root>
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

### Import to Vercel
1. On the Vercel dashboard click **"Add New… → Project"**.
2. Pick your GitHub repo.
3. In the import screen, configure:
   - **Root Directory:** `frontend`  ← important; the React app lives here.
   - **Framework Preset:** Create React App (auto-detected)
   - **Build Command:** `yarn build` (default)
   - **Output Directory:** `build` (default)
4. Expand **Environment Variables** and add:
   - `REACT_APP_WEB3FORMS_KEY` = your Web3Forms access key (or leave blank to use mailto fallback)
5. Click **Deploy**.

Vercel will build and give you a live URL like `https://yousuf-hakim.vercel.app` in ~60 seconds.

### Custom domain
Vercel project → **Settings → Domains → Add** → enter `yousufhakim.com` (or whatever).
Add the DNS records Vercel tells you to add at your registrar. Done.

---

## How the contact form works

When the form is submitted:

- **If `REACT_APP_WEB3FORMS_KEY` is set:** the form is POSTed as JSON to `https://api.web3forms.com/submit`, which emails the submission to the address tied to your access key. Free tier: 250 submissions / month.
- **If the key is empty:** the form opens the visitor's mail app with everything pre-filled (mailto). No data is stored anywhere.

---

## Folder structure

```
frontend/
  ├─ src/
  │  ├─ components/   # Navbar, Hero, Portfolio, etc.
  │  ├─ pages/        # Home, Contact
  │  ├─ lib/          # content (socials, projects), theme, lenis, useXVideo
  │  └─ App.js
  ├─ public/
  ├─ tailwind.config.js
  ├─ vercel.json      # SPA routing for /contact
  ├─ .env.example
  └─ package.json
backend/   # not used in deployment — kept for reference only, safe to delete
```

---

## Editing your content

Open `frontend/src/lib/content.js` to update:

- **Socials** (email, WhatsApp, Discord, Instagram, X)
- **Portfolio projects** — titles, tags, YouTube IDs, X tweet IDs

Save and the dev server hot-reloads. On Vercel, every `git push` redeploys automatically.
