# Quick Deployment Guide - 30 Minutes to Live

## TL;DR - 5 Steps

### Step 1: Deploy Backend (Heroku)
```bash
heroku login
heroku create bnpl-guardian-backend
heroku config:set SECRET_KEY=$(python -c "import secrets; print(secrets.token_hex(32))")
heroku config:set OAUTHLIB_INSECURE_TRANSPORT=1
heroku config:set CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://yourusername.github.io/bnpl_clean/
heroku config:set FRONTEND_URL=https://yourusername.github.io/bnpl_clean/
git push heroku main
heroku apps:info bnpl-guardian-backend  # Copy the URL
```

### Step 2: Add GitHub Secret
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. New secret: `VITE_API_URL` = `https://bnpl-guardian-backend.herokuapp.com`

### Step 3: Enable GitHub Pages
1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: gh-pages
4. Save

### Step 4: Deploy
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Step 5: Verify
1. Go to Actions tab - wait for green checkmark
2. Visit `https://yourusername.github.io/bnpl_clean/`
3. Test login

---

## Detailed Steps

### Backend Deployment (Choose One)

#### Heroku (Recommended)
```bash
# Install Heroku CLI first from https://devcenter.heroku.com/articles/heroku-cli

heroku login
heroku create bnpl-guardian-backend

# Generate SECRET_KEY
python -c "import secrets; print(secrets.token_hex(32))"
# Copy the output and use below

heroku config:set SECRET_KEY=<paste-the-output>
heroku config:set OAUTHLIB_INSECURE_TRANSPORT=1
heroku config:set CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://yourusername.github.io/bnpl_clean/
heroku config:set FRONTEND_URL=https://yourusername.github.io/bnpl_clean/

git push heroku main

# Get your backend URL
heroku apps:info bnpl-guardian-backend
# Look for "Web URL" - should be https://bnpl-guardian-backend.herokuapp.com
```

#### Railway
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select your repo
4. Add variables in Railway dashboard:
   - `SECRET_KEY`: (generate with `python -c "import secrets; print(secrets.token_hex(32))"`)
   - `OAUTHLIB_INSECURE_TRANSPORT`: 1
   - `CORS_ORIGINS`: http://localhost:3000,http://localhost:5173,https://yourusername.github.io/bnpl_clean/
   - `FRONTEND_URL`: https://yourusername.github.io/bnpl_clean/
5. Deploy
6. Get your backend URL from Railway dashboard

#### Render
1. Go to https://render.com
2. New Web Service → Connect GitHub
3. Select your repo
4. Configure:
   - Build: `pip install -r requirements.txt`
   - Start: `gunicorn app:app`
5. Add environment variables (same as above)
6. Deploy
7. Get your backend URL from Render dashboard

### GitHub Configuration

#### Add Secret
```
1. GitHub repo → Settings
2. Secrets and variables → Actions
3. New repository secret
4. Name: VITE_API_URL
5. Value: https://your-backend-url.herokuapp.com
6. Add secret
```

#### Enable Pages
```
1. GitHub repo → Settings
2. Pages
3. Source: Deploy from a branch
4. Branch: gh-pages
5. Folder: / (root)
6. Save
```

### Deploy Frontend
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# GitHub Actions will automatically:
# - Build the frontend
# - Deploy to GitHub Pages
# - Create gh-pages branch
```

### Verify Deployment
```bash
# 1. Check GitHub Actions
# Go to Actions tab and wait for green checkmark

# 2. Test backend
curl https://your-backend-url.herokuapp.com/api/health
# Should return: {"status":"ok"}

# 3. Visit GitHub Pages
# https://yourusername.github.io/bnpl_clean/

# 4. Test login
# Click login and try Google OAuth
```

---

## Troubleshooting

### Backend won't deploy
```
Check Heroku logs:
heroku logs --tail

Common issues:
- Missing requirements.txt
- Python version mismatch
- Environment variables not set
```

### GitHub Actions failed
```
Check Actions tab:
1. Click failed workflow
2. Click build-and-deploy job
3. Expand steps to see error

Common issues:
- VITE_API_URL secret not set
- npm install failed
- Build error
```

### Frontend shows blank page
```
Check browser console (F12):
1. Look for errors
2. Check Network tab for failed requests
3. Verify VITE_API_URL is correct

Common issues:
- Backend URL wrong
- Backend not running
- CORS not configured
```

### CORS errors
```
Error: "Access to XMLHttpRequest blocked by CORS policy"

Fix:
1. Update CORS_ORIGINS on backend
2. Include: https://yourusername.github.io/bnpl_clean/
3. Redeploy backend
4. Wait 5 minutes
```

### 404 on page refresh
```
This should be fixed by 404.html

If still happening:
1. Verify frontend/public/404.html exists
2. Rebuild: cd frontend && npm run build
3. Redeploy
```

---

## Verification Checklist

- [ ] Backend deployed
- [ ] Backend health check passes
- [ ] GitHub secret VITE_API_URL added
- [ ] GitHub Pages enabled
- [ ] GitHub Actions workflow completed
- [ ] GitHub Pages URL accessible
- [ ] Login page loads
- [ ] Google OAuth works
- [ ] Dashboard displays data
- [ ] No console errors

---

## Your URLs

Replace `yourusername` with your GitHub username:

```
GitHub Pages: https://yourusername.github.io/bnpl_clean/
Backend: https://bnpl-guardian-backend.herokuapp.com
Repository: https://github.com/yourusername/bnpl_clean
Actions: https://github.com/yourusername/bnpl_clean/actions
```

---

## Environment Variables

### Backend (Heroku/Railway/Render)
```
SECRET_KEY=your-random-secret-key
OAUTHLIB_INSECURE_TRANSPORT=1
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://yourusername.github.io/bnpl_clean/
FRONTEND_URL=https://yourusername.github.io/bnpl_clean/
```

### Frontend (GitHub Secret)
```
VITE_API_URL=https://your-backend-url.herokuapp.com
```

---

## Files Created

```
.github/workflows/deploy.yml          - GitHub Actions workflow
frontend/public/404.html              - Routing fix
frontend/vite.config.js               - Updated with publicDir
DEPLOYMENT_CHECKLIST.md               - Detailed guide
ENVIRONMENT_SETUP.md                  - Env vars reference
DEPLOYMENT_READY.md                   - Architecture overview
GITHUB_PAGES_SETUP_COMPLETE.md        - Setup summary
QUICK_DEPLOYMENT_GUIDE.md             - This file
```

---

## Time Estimate

- Backend deployment: 5-10 minutes
- GitHub configuration: 2-3 minutes
- Frontend deployment: 1 minute
- GitHub Actions build: 2-5 minutes
- Verification: 2-3 minutes

**Total: ~20-30 minutes**

---

## Success Indicators

✅ GitHub Actions shows green checkmark
✅ GitHub Pages URL loads
✅ Login page visible
✅ Google OAuth works
✅ Dashboard shows data
✅ No console errors

---

## Need Help?

1. Read `DEPLOYMENT_CHECKLIST.md` for detailed steps
2. Check GitHub Actions logs for build errors
3. Verify all environment variables are set
4. Test backend: `curl https://your-backend-url/api/health`
5. Check browser console for errors

---

**Status**: ✅ Ready to deploy

**Next**: Follow Step 1 above to deploy backend
