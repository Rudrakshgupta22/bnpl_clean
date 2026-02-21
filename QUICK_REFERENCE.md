# BNPL Guardian - Quick Reference Card

## 🚀 Setup (First Time)

```bash
# 1. Delete old database
rm database/bnpl.db  # Windows: del database\bnpl.db

# 2. Install frontend dependencies
cd frontend
npm install
cd ..

# 3. Start backend
python app.py

# 4. Start frontend (new terminal)
cd frontend
npm run dev
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Landing**: http://localhost:3000/
- **Onboarding**: http://localhost:3000/onboarding
- **Dashboard**: http://localhost:3000/dashboard

## 📁 Key Files

### Backend
- `app.py` - Main Flask app with all endpoints
- `backend/models.py` - Database operations
- `backend/gmail_service.py` - Gmail API integration
- `backend/parser.py` - Email parsing logic
- `backend/finance.py` - Risk calculations

### Frontend
- `frontend/src/pages/Landing.jsx` - Landing page
- `frontend/src/pages/Onboarding.jsx` - Onboarding flow
- `frontend/src/pages/NewDashboard.jsx` - Main dashboard
- `frontend/src/App.jsx` - Router configuration
- `frontend/tailwind.config.js` - Tailwind configuration

## 🔌 API Endpoints

### Authentication
- `GET /auth/login` - Start OAuth
- `GET /auth/callback` - OAuth callback
- `GET /auth/status` - Check auth
- `GET /auth/logout` - Logout

### User
- `GET /api/user/email` - Get user email
- `GET /api/user/profile` - Get profile
- `POST /api/user/profile` - Update profile

### BNPL
- `GET /api/emails/sync` - Sync emails
- `GET /api/bnpl/records` - Get records
- `GET /api/risk-score` - Get risk analysis

## 🎨 Design Tokens

### Colors
```css
Primary Blue: #0ea5e9
Primary Purple: #8b5cf6
Success Green: #10b981
Warning Orange: #f59e0b
Danger Red: #ef4444
Background: #111827
```

### Gradients
```css
Hero: from-gray-900 via-purple-900 to-gray-900
Button: from-blue-500 to-purple-600
Text: from-blue-400 to-purple-400
```

## 📊 Risk Scoring

```javascript
debt_ratio = monthly_obligation / salary

if (debt_ratio < 0.2) {
  risk_score = 0-20 (Low - Green)
} else if (debt_ratio < 0.4) {
  risk_score = 20-50 (Medium - Yellow)
} else {
  risk_score = 50-100 (High - Red)
}
```

## 🔍 Debugging

### Backend Logs
```bash
[Sync] Starting email sync...
[Gmail API] Fetching messages...
[Gmail API] Found 50 messages
[Sync] Stored BNPL record: Amazon - ₹5000
[Sync] Complete! Stored 5 BNPL records
```

### Check Auth Status
```bash
curl http://localhost:5000/auth/status
```

### Test Sync
```bash
curl http://localhost:5000/api/emails/sync -b cookies.txt
```

## 🐛 Common Issues

### Issue: Tailwind not working
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
```

### Issue: Charts not showing
```bash
cd frontend
npm install recharts
```

### Issue: Animations broken
```bash
cd frontend
npm install framer-motion
```

### Issue: Database error
```bash
rm database/bnpl.db
python app.py  # Recreates database
```

### Issue: Email sync fails
- Check backend console logs
- Verify OAuth token
- Check Gmail API quota
- Test with `curl`

## 📦 Dependencies

### Backend (requirements.txt)
- Flask
- flask-cors
- google-api-python-client
- google-auth
- google-auth-oauthlib
- python-dotenv

### Frontend (package.json)
- react
- react-dom
- react-router-dom
- axios
- framer-motion
- recharts
- tailwindcss

## 🎯 User Flow

```
Landing Page
    ↓
Click "Connect with Gmail"
    ↓
Google OAuth
    ↓
New User? → Onboarding (3 steps) → Dashboard
Existing? → Dashboard
    ↓
Click "Sync Emails"
    ↓
View Analytics & Insights
```

## 🔐 Environment Variables

```bash
# .env
SECRET_KEY="your-secret-key-here"
```

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large Desktop */
```

## ⚡ Performance Tips

- Use `motion.div` for animations
- Lazy load charts
- Debounce scroll events
- Memoize expensive calculations
- Optimize images
- Enable compression

## 🧪 Testing Checklist

- [ ] Landing page loads
- [ ] OAuth flow works
- [ ] Onboarding saves data
- [ ] Dashboard displays metrics
- [ ] Email sync works
- [ ] Charts render
- [ ] Table populates
- [ ] Logout works
- [ ] Mobile responsive
- [ ] Animations smooth

## 📞 Support

1. Check `TRANSFORMATION_COMPLETE.md`
2. Check `UPGRADE_GUIDE.md`
3. Review backend console logs
4. Check browser console
5. Test API with curl
6. Verify database schema

## 🎉 Success Indicators

✅ Landing page with animations
✅ Smooth onboarding flow
✅ Email sync without errors
✅ Dashboard with charts
✅ Risk score displays
✅ Table shows records
✅ No console errors

## 🚀 Ready to Demo!

Your BNPL Guardian is now a **professional fintech SaaS application**!

---

**Quick Commands:**

```bash
# Start everything
python app.py &
cd frontend && npm run dev

# Check status
curl http://localhost:5000/api/health

# View logs
tail -f backend.log  # if logging to file
```

---

**Remember:** Delete old database before first run!

```bash
rm database/bnpl.db
```

---

**BNPL Guardian** - Know Your Debt Before It Knows You 💜
