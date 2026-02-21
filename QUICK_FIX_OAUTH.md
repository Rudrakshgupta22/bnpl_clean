# Quick Fix - OAuth Error (5 minutes)

## The Error
```
OSError: [Errno 22] invalid argument: 'client_secret.json'
```

## The Fix

### Step 1: Get Your Google Credentials (2 min)

1. Go to https://console.cloud.google.com/
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click your OAuth 2.0 Client ID
5. Copy:
   - **Client ID**
   - **Client Secret**

### Step 2: Update .env File (1 min)

Open `.env` file and update:

```env
GOOGLE_CLIENT_ID=paste-your-client-id-here
GOOGLE_CLIENT_SECRET=paste-your-client-secret-here
GOOGLE_PROJECT_ID=bnpl-guardian
```

Replace:
- `paste-your-client-id-here` with your actual Client ID
- `paste-your-client-secret-here` with your actual Client Secret

### Step 3: Restart Backend (1 min)

```bash
# Stop backend (Ctrl+C)
# Restart it
python app.py
```

### Step 4: Test (1 min)

1. Go to your app
2. Click "Connect with Google"
3. Should work now!

---

## Done! ✅

Your OAuth should now work without errors.

---

## If Still Getting Error

1. Verify you copied the correct credentials from Google Cloud Console
2. Make sure `.env` file is saved
3. Restart backend
4. Clear browser cache
5. Try again

---

For detailed guide, see: `FIX_CLIENT_SECRET_ERROR.md`
