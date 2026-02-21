# Deploy Backend Only to Railway via GitHub

## Quick Start (5 minutes)

### Step 1: Connect Railway to GitHub

1. Go to https://railway.app
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Click **Connect GitHub**
5. Authorize Railway to access your GitHub account
6. Select your `bnpl_clean` repository
7. Click **Deploy**

Railway will automatically detect it's a Python project and deploy the backend.

### Step 2: Set Environment Variables

1. In Railway dashboard, go to your project
2. Click the **Variables** tab
3. Add these variables:

```
SECRET_KEY=your-random-secret-key-min-32-chars
OAUTHLIB_INSECURE_TRANSPORT=1
BACKEND_URL=https://your-railway-url.railway.app
FRONTEND_URL=https://yourusername.github.io/bnpl_clean/
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://yourusername.github.io/bnpl_clean/
```

Replace:
- `your-random-secret-key-min-32-chars` with a random string (use `python -c "import secrets; print(secrets.token_hex(32))"`)
- `your-railway-url` with your Railway URL (shown in Railway dashboard)
- `yourusername` with your GitHub username

4. Click **Save**

### Step 3: Get Your Backend URL

1. In Railway dashboard, go to your project
2. Click the **Deployments** tab
3. Look for the URL (should be something like `https://bnpl-guardian-backend.railway.app`)
4. Copy this URL - you'll need it for Google OAuth

### Step 4: Update Google Cloud Console

1. Go to https://console.cloud.google.com/
2. APIs & Services → Credentials
3. Click your OAuth 2.0 Client ID
4. Add redirect URI:
   ```
   https://your-railway-url.railway.app/auth/callback
   ```
5. Save

### Step 5: Test Backend

```bash
curl https://your-railway-url.railway.app/api/health
# Should return: {"status":"ok"}
```

Done! Your backend is now deployed on Railway.

---

## Remove Frontend from Repository

If you want to remove the frontend folder from your repository:

### Option 1: Remove Frontend Folder (Keep Git History)

```bash
# Remove frontend folder
git rm -r frontend

# Commit the change
git commit -m "Remove frontend - deploying backend only"

# Push to GitHub
git push origin main
```

### Option 2: Remove Frontend Folder (Clean Git History)

```bash
# Remove frontend folder
rm -rf frontend

# Add to git
git add -A

# Commit the change
git commit -m "Remove frontend - deploying backend only"

# Push to GitHub
git push origin main
```

### Option 3: Keep Frontend but Don't Deploy It

If you want to keep the frontend folder but not deploy it to GitHub Pages:

1. Delete `.github/workflows/deploy.yml` (GitHub Actions workflow)
2. Delete `frontend/public/404.html` (routing fix)
3. Commit and push

```bash
git rm .github/workflows/deploy.yml
git rm frontend/public/404.html
git commit -m "Remove GitHub Pages deployment"
git push origin main
```

---

## Clean Up Documentation Files

If you want to remove deployment documentation files:

```bash
# Remove all deployment guides
git rm START_HERE.md
git rm QUICK_DEPLOYMENT_GUIDE.md
git rm DEPLOYMENT_CHECKLIST.md
git rm DEPLOYMENT_READY.md
git rm ENVIRONMENT_SETUP.md
git rm DEPLOYMENT_SUMMARY.md
git rm GITHUB_PAGES_SETUP_COMPLETE.md
git rm DEPLOYMENT_INDEX.md
git rm FINAL_DEPLOYMENT_STATUS.md
git rm GITHUB_PAGES_DEPLOYMENT.md
git rm FIX_OAUTH_NOW.md
git rm OAUTH_REDIRECT_FIX.md
git rm RAILWAY_BACKEND_ONLY.md

# Commit
git commit -m "Remove deployment documentation"

# Push
git push origin main
```

---

## Final Repository Structure

After removing frontend:

```
bnpl_clean/
├── backend/
│   ├── models.py
│   ├── finance.py
│   ├── gmail_service.py
│   ├── parser.py
│   ├── security.py
│   └── simulation.py
├── database/
│   └── bnpl.db
├── app.py
├── config.py
├── requirements.txt
├── Procfile
├── .env
├── .env.example
├── client_secret.json
├── client_secret.json.example
└── .gitignore
```

---

## Verify Deployment

### Check Backend is Running

```bash
curl https://your-railway-url.railway.app/api/health
```

Should return:
```json
{"status":"ok"}
```

### Check Logs

In Railway dashboard:
1. Click your project
2. Click **Logs** tab
3. Should see Flask server running

### Test API Endpoints

```bash
# Test health
curl https://your-railway-url.railway.app/api/health

# Test login (should redirect to Google)
curl -L https://your-railway-url.railway.app/api/login
```

---

## Environment Variables Reference

### Required
```
SECRET_KEY=your-random-secret-key
OAUTHLIB_INSECURE_TRANSPORT=1
BACKEND_URL=https://your-railway-url.railway.app
```

### Optional
```
FRONTEND_URL=https://yourusername.github.io/bnpl_clean/
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://yourusername.github.io/bnpl_clean/
```

---

## Troubleshooting

### Railway Deployment Failed

Check logs in Railway dashboard:
1. Click your project
2. Click **Logs** tab
3. Look for error messages

Common issues:
- Missing `requirements.txt`
- Python version mismatch
- Environment variables not set

### Backend Returns 404

Make sure you're using the correct URL:
- Check Railway dashboard for your URL
- Make sure there's no trailing slash
- Wait 5 minutes for deployment to complete

### OAuth Redirect Error

1. Verify `BACKEND_URL` is set in Railway
2. Add redirect URI to Google Cloud Console
3. Wait 5 minutes for Google to update

---

## Next Steps

1. Deploy backend to Railway (5 min)
2. Set environment variables (2 min)
3. Update Google Cloud Console (2 min)
4. Test backend (1 min)
5. Remove frontend from repository (optional)

**Total time**: ~10 minutes

---

## Quick Commands

```bash
# Generate SECRET_KEY
python -c "import secrets; print(secrets.token_hex(32))"

# Test backend
curl https://your-railway-url.railway.app/api/health

# Remove frontend
git rm -r frontend
git commit -m "Remove frontend"
git push origin main

# Remove deployment files
git rm START_HERE.md QUICK_DEPLOYMENT_GUIDE.md DEPLOYMENT_CHECKLIST.md
git commit -m "Remove deployment documentation"
git push origin main
```

---

**Status**: ✅ Ready to deploy

**Time to complete**: ~10 minutes

**Next action**: Go to https://railway.app and create new project
