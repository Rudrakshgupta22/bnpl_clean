# Backend Only Deployment to Railway

## Complete Guide - Backend Only Setup

---

## Step 1: Remove Frontend from Repository (2 minutes)

### Option A: Remove Frontend Folder Only
```bash
git rm -r frontend
git commit -m "Remove frontend - backend only deployment"
git push origin main
```

### Option B: Remove Frontend + GitHub Actions
```bash
git rm -r frontend
git rm .github/workflows/deploy.yml
git commit -m "Remove frontend and GitHub Pages deployment"
git push origin main
```

### Option C: Remove Everything (Frontend + Docs)
```bash
git rm -r frontend .github/workflows/deploy.yml
git rm START_HERE.md QUICK_DEPLOYMENT_GUIDE.md DEPLOYMENT_CHECKLIST.md
git rm DEPLOYMENT_READY.md ENVIRONMENT_SETUP.md DEPLOYMENT_SUMMARY.md
git rm GITHUB_PAGES_SETUP_COMPLETE.md DEPLOYMENT_INDEX.md FINAL_DEPLOYMENT_STATUS.md
git rm GITHUB_PAGES_DEPLOYMENT.md FIX_OAUTH_NOW.md OAUTH_REDIRECT_FIX.md
git commit -m "Remove frontend and deployment documentation"
git push origin main
```

---

## Step 2: Deploy Backend to Railway (5 minutes)

### 2.1 Connect Railway to GitHub

1. Go to https://railway.app
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Click **Connect GitHub** (if not already connected)
5. Select your `bnpl_clean` repository
6. Click **Deploy**

Railway will automatically:
- Detect it's a Python project
- Read `requirements.txt`
- Read `Procfile`
- Deploy the backend

### 2.2 Wait for Deployment

Railway will show deployment progress. Wait for:
- ✅ Build successful
- ✅ Deployment successful
- ✅ Service running

This takes 2-3 minutes.

### 2.3 Get Your Backend URL

1. In Railway dashboard, click your project
2. Click the **Deployments** tab
3. Look for the URL (example: `https://bnpl-guardian-backend.railway.app`)
4. Copy this URL

---

## Step 3: Set Environment Variables (2 minutes)

### 3.1 Generate SECRET_KEY

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Copy the output - you'll need it.

### 3.2 Add Variables to Railway

1. In Railway dashboard, click your project
2. Click the **Variables** tab
3. Add these variables:

| Key | Value |
|-----|-------|
| `SECRET_KEY` | (paste the output from above) |
| `OAUTHLIB_INSECURE_TRANSPORT` | `1` |
| `BACKEND_URL` | `https://your-railway-url.railway.app` |
| `FRONTEND_URL` | `https://yourusername.github.io/bnpl_clean/` |
| `CORS_ORIGINS` | `http://localhost:3000,http://localhost:5173,https://yourusername.github.io/bnpl_clean/` |

Replace:
- `your-railway-url` with your Railway URL
- `yourusername` with your GitHub username

4. Click **Save**

Railway will automatically redeploy with the new variables.

---

## Step 4: Update Google Cloud Console (2 minutes)

### 4.1 Add Redirect URI

1. Go to https://console.cloud.google.com/
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click your OAuth 2.0 Client ID (Web application)
5. Under "Authorized redirect URIs", add:

```
https://your-railway-url.railway.app/auth/callback
```

Replace `your-railway-url` with your Railway URL.

6. Click **Save**

---

## Step 5: Test Backend (1 minute)

### 5.1 Test Health Endpoint

```bash
curl https://your-railway-url.railway.app/api/health
```

Should return:
```json
{"status":"ok"}
```

### 5.2 Check Logs

In Railway dashboard:
1. Click your project
2. Click **Logs** tab
3. Should see Flask server running

---

## Done! ✅

Your backend is now deployed on Railway and ready to use.

---

## Summary

| Step | Time | Status |
|------|------|--------|
| Remove frontend | 2 min | ✅ |
| Deploy to Railway | 5 min | ✅ |
| Set environment variables | 2 min | ✅ |
| Update Google OAuth | 2 min | ✅ |
| Test backend | 1 min | ✅ |
| **Total** | **~12 min** | **✅** |

---

## Your Backend URLs

### Railway Dashboard
```
https://railway.app
```

### Backend API
```
https://your-railway-url.railway.app
```

### Health Check
```
https://your-railway-url.railway.app/api/health
```

### OAuth Callback
```
https://your-railway-url.railway.app/auth/callback
```

---

## Environment Variables Reference

### Required
```
SECRET_KEY=your-random-secret-key-min-32-chars
OAUTHLIB_INSECURE_TRANSPORT=1
BACKEND_URL=https://your-railway-url.railway.app
```

### Optional (for GitHub Pages frontend)
```
FRONTEND_URL=https://yourusername.github.io/bnpl_clean/
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://yourusername.github.io/bnpl_clean/
```

---

## Troubleshooting

### Deployment Failed

Check Railway logs:
1. Click your project
2. Click **Logs** tab
3. Look for error messages

Common issues:
- Missing `requirements.txt`
- Python version mismatch
- Environment variables not set

**Solution**: Check `requirements.txt` exists and has all dependencies

### Backend Returns 404

Make sure:
- You're using the correct Railway URL
- No trailing slash in URL
- Wait 5 minutes for deployment to complete

**Solution**: Test with `curl https://your-railway-url.railway.app/api/health`

### OAuth Redirect Error

Make sure:
- `BACKEND_URL` is set in Railway
- Redirect URI added to Google Cloud Console
- No trailing slash in URLs

**Solution**: 
1. Verify `BACKEND_URL` in Railway Variables
2. Check Google Cloud Console has correct URI
3. Wait 5 minutes for Google to update

### CORS Errors

Make sure:
- `CORS_ORIGINS` includes your frontend URL
- `FRONTEND_URL` is set correctly

**Solution**: Update `CORS_ORIGINS` in Railway Variables

---

## Local Development

To test locally while backend is on Railway:

```bash
# Update frontend .env.development
VITE_API_URL=https://your-railway-url.railway.app

# Start frontend
cd frontend
npm run dev
```

Now your local frontend will connect to Railway backend.

---

## Monitoring

### View Logs
1. Railway dashboard → Your project → **Logs** tab

### View Metrics
1. Railway dashboard → Your project → **Metrics** tab

### View Deployments
1. Railway dashboard → Your project → **Deployments** tab

---

## Next Steps

1. ✅ Remove frontend from repository
2. ✅ Deploy backend to Railway
3. ✅ Set environment variables
4. ✅ Update Google OAuth
5. ✅ Test backend

**Optional**:
- Deploy frontend to GitHub Pages
- Deploy frontend to Vercel/Netlify
- Keep frontend local only

---

## Quick Reference

### Remove Frontend
```bash
git rm -r frontend && git commit -m "Remove frontend" && git push origin main
```

### Test Backend
```bash
curl https://your-railway-url.railway.app/api/health
```

### View Logs
```
Railway dashboard → Your project → Logs
```

### Update Variables
```
Railway dashboard → Your project → Variables
```

---

## Files in Your Repository

After removing frontend:

```
bnpl_clean/
├── backend/
│   ├── finance.py
│   ├── gmail_service.py
│   ├── models.py
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
├── .gitignore
├── client_secret.json
├── client_secret.json.example
└── README.md
```

---

## Support

### Railway Documentation
- https://docs.railway.app/

### GitHub Integration
- https://docs.railway.app/guides/github

### Environment Variables
- https://docs.railway.app/develop/variables

---

**Status**: ✅ Ready to deploy

**Time to complete**: ~12 minutes

**Next action**: Go to https://railway.app and create new project
