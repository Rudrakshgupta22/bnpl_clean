# Deploying BNPL Guardian backend to Heroku

Quick steps to get the Flask backend running on Heroku and enable GitHub Pages frontend to use it.

1. Create a Heroku app (or use Railway/Render):

```bash
heroku create your-app-name
```

2. Add required config vars (do NOT store secrets in the repo):

```bash
heroku config:set FRONTEND_URL=https://rudrakshgupta22.github.io/bnpl_clean
heroku config:set CORS_ORIGINS=https://rudrakshgupta22.github.io/bnpl_clean,http://localhost:3000,http://localhost:5173
heroku config:set SECRET_KEY="<your-secret>"
heroku config:set GOOGLE_CLIENT_ID="<from Google Cloud>"
heroku config:set GOOGLE_CLIENT_SECRET="<from Google Cloud>"
```

3. Ensure `client_secret.json` is not committed. Instead, set `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` and update `backend.gmail_service` to read from env if needed.

4. Push to Heroku:

```bash
git push heroku main
```

5. Update Google Cloud OAuth consent/credentials to include the Heroku callback URL:

```
https://your-app-name.herokuapp.com/auth/callback
```

6. After Heroku is live, update frontend production env (in repo `frontend/.env.production` or CI) to set:

```
VITE_API_URL=https://your-app-name.herokuapp.com
```

7. Rebuild and redeploy frontend:

```bash
cd frontend
npm run build
npm run deploy
```

If you want, I can prepare the minor code changes to load Google client ID/secret from env instead of `client_secret.json` and make `client_secret.json` optional.
