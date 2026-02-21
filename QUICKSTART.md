# Quick Start Guide

## 1. Backend Setup (5 minutes)

```bash
# Install Python dependencies
pip install -r requirements.txt

# Create .env file
echo 'SECRET_KEY="your-random-secret-key-here"' > .env

# Add your Google OAuth credentials to client_secret.json
# (Download from Google Cloud Console)

# Run backend
python app.py
```

Backend runs on: http://localhost:5000

## 2. Frontend Setup (3 minutes)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs on: http://localhost:3000

## 3. Google Cloud Setup

1. Go to https://console.cloud.google.com/
2. Create new project or select existing
3. Enable **Gmail API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Authorized redirect URIs: `http://localhost:5000/auth/callback`
7. Download JSON and save as `client_secret.json` in project root

## 4. Test the Application

1. Open http://localhost:3000
2. Click "Connect with Gmail"
3. Authorize the application
4. You'll be redirected to dashboard
5. Click "Sync Emails" to fetch BNPL data
6. View your financial metrics!

## Troubleshooting

### Backend Issues

**Error: "No module named 'flask'"**
- Solution: Activate virtual environment and run `pip install -r requirements.txt`

**Error: "client_secret.json not found"**
- Solution: Download OAuth credentials from Google Cloud Console

**Error: "SECRET_KEY not set"**
- Solution: Create `.env` file with `SECRET_KEY="your-secret-here"`

### Frontend Issues

**Error: "Cannot connect to backend"**
- Solution: Make sure backend is running on port 5000
- Check CORS settings in app.py

**Error: "npm: command not found"**
- Solution: Install Node.js from https://nodejs.org/

### OAuth Issues

**Error: "redirect_uri_mismatch"**
- Solution: Add `http://localhost:5000/auth/callback` to authorized redirect URIs in Google Cloud Console

**Error: "Access blocked: This app's request is invalid"**
- Solution: Make sure Gmail API is enabled in Google Cloud Console

## Default Test Data

- Default salary: ₹30,000
- You can edit salary from the dashboard
- Sync emails to populate BNPL records

## Next Steps

1. Customize parsing logic in `backend/parser.py`
2. Adjust risk scoring in `backend/finance.py`
3. Modify frontend styling in `frontend/src/styles/`
4. Add more features as needed!
