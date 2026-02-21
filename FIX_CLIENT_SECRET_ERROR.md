# Fix "client_secret.json" Error

## Problem
```
OSError: [Errno 22] invalid argument: 'client_secret.json'
```

This error means the backend can't find `client_secret.json` file.

---

## Solution: Use Environment Variables Instead

The backend supports two methods:
1. **`client_secret.json` file** (local development only)
2. **Environment variables** (recommended for production)

Since you're getting this error, use **environment variables**.

---

## Step 1: Get Your Google OAuth Credentials

### From Google Cloud Console:

1. Go to https://console.cloud.google.com/
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click your OAuth 2.0 Client ID (Web application)
5. You'll see:
   - **Client ID**
   - **Client Secret**
   - **Project ID**

Copy these values.

---

## Step 2: Set Environment Variables

### For Local Development

Create/update `.env` file in project root:

```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_PROJECT_ID=your-project-id-here
SECRET_KEY=your-secret-key
OAUTHLIB_INSECURE_TRANSPORT=1
BACKEND_URL=http://localhost:5000
```

Replace:
- `your-client-id-here` with your actual Client ID
- `your-client-secret-here` with your actual Client Secret
- `your-project-id-here` with your actual Project ID

### For Production (Railway)

In Railway dashboard:
1. Click your project
2. Click **Variables** tab
3. Add:

| Key | Value |
|-----|-------|
| `GOOGLE_CLIENT_ID` | your-client-id |
| `GOOGLE_CLIENT_SECRET` | your-client-secret |
| `GOOGLE_PROJECT_ID` | your-project-id |
| `SECRET_KEY` | your-secret-key |
| `OAUTHLIB_INSECURE_TRANSPORT` | `1` |
| `BACKEND_URL` | `https://your-railway-url.railway.app` |

4. Click **Save**

---

## Step 3: Restart Backend

### Local Development
```bash
# Stop the backend (Ctrl+C)
# Restart it
python app.py
```

### Production (Railway)
Railway will automatically redeploy when you save variables.

---

## Step 4: Test

Go to your app and click "Connect with Google" again.

Should now work without the error!

---

## Where to Find Your Credentials

### Google Cloud Console Path:
```
https://console.cloud.google.com/
  → Select Project
  → APIs & Services
  → Credentials
  → Click your OAuth 2.0 Client ID
  → See Client ID, Client Secret, Project ID
```

### Example Values:
```
Client ID: 123456789-abcdefghijklmnop.apps.googleusercontent.com
Client Secret: GOCSPX-1234567890abcdefghijklmnop
Project ID: bnpl-guardian
```

---

## How It Works

The backend code (`backend/gmail_service.py`) checks in this order:

1. **Check for environment variables** (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`)
   - If found, use them ✅
   - If not found, continue to step 2

2. **Check for `client_secret.json` file**
   - If found, use it ✅
   - If not found, error ❌

Since `client_secret.json` is in `.gitignore` (for security), it's not in your repository. So you must use environment variables.

---

## Security Note

**Never commit `client_secret.json` to GitHub!**

Always use environment variables for production:
- ✅ Environment variables (secure)
- ❌ Committing secrets to GitHub (insecure)

---

## Troubleshooting

### Still Getting Error?

1. Verify environment variables are set:
   ```bash
   # Local development
   echo $GOOGLE_CLIENT_ID
   # Should print your client ID
   ```

2. Restart backend after setting variables

3. Check `.env` file exists and has correct values

4. Make sure you're using the correct Client ID and Secret from Google Cloud Console

### Wrong Credentials?

1. Go back to Google Cloud Console
2. Verify you copied the correct values
3. Update environment variables
4. Restart backend

---

## Quick Reference

### Local Development (.env)
```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_PROJECT_ID=your-project-id
SECRET_KEY=your-secret-key
OAUTHLIB_INSECURE_TRANSPORT=1
BACKEND_URL=http://localhost:5000
```

### Production (Railway Variables)
```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_PROJECT_ID=your-project-id
SECRET_KEY=your-secret-key
OAUTHLIB_INSECURE_TRANSPORT=1
BACKEND_URL=https://your-railway-url.railway.app
```

---

## Next Steps

1. Get credentials from Google Cloud Console
2. Set environment variables (local or Railway)
3. Restart backend
4. Test OAuth flow

**Time to fix**: ~5 minutes

---

**Status**: ✅ Ready to fix

**Questions?** Check the troubleshooting section above.
