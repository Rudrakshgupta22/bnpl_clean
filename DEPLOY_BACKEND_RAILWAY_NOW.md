# Deploy Backend to Railway - Quick Start

## 3 Simple Steps (12 minutes)

### Step 1: Remove Frontend (2 min)

```bash
git rm -r frontend
git commit -m "Remove frontend"
git push origin main
```

### Step 2: Deploy to Railway (5 min)

1. Go to https://railway.app
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Select your `bnpl_clean` repository
5. Click **Deploy**

Wait for deployment to complete (2-3 minutes).

### Step 3: Set Environment Variables (2 min)

1. In Railway dashboard, click your project
2. Click **Variables** tab
3. Add these:

```
SECRET_KEY=<run: python -c "import secrets; print(secrets.token_hex(32))">
OAUTHLIB_INSECURE_TRANSPORT=1
BACKEND_URL=https://your-railway-url.railway.app
FRONTEND_URL=https://yourusername.github.io/bnpl_clean/
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://yourusername.github.io/bnpl_clean/
```

4. Click **Save**

---

## Get Your Backend URL

In Railway dashboard:
1. Click your project
2. Click **Deployments** tab
3. Copy the URL (example: `https://bnpl-guardian-backend.railway.app`)

---

## Update Google OAuth

1. Go to https://console.cloud.google.com/
2. APIs & Services → Credentials
3. Click your OAuth 2.0 Client ID
4. Add redirect URI:
   ```
   https://your-railway-url.railway.app/auth/callback
   ```
5. Save

---

## Test Backend

```bash
curl https://your-railway-url.railway.app/api/health
```

Should return: `{"status":"ok"}`

---

## Done! ✅

Your backend is now deployed on Railway.

---

## Next (Optional)

- Deploy frontend to GitHub Pages
- Deploy frontend to Vercel/Netlify
- Keep frontend local only

---

For detailed guide, see: `BACKEND_ONLY_DEPLOYMENT.md`
