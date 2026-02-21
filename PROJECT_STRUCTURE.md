# Project Structure

```
bnpl-guardian/
│
├── backend/                          # Backend Python modules
│   ├── __pycache__/                 # Python cache (ignored)
│   ├── finance.py                   # Risk calculation logic
│   ├── gmail_service.py             # Gmail API integration
│   ├── models.py                    # Database models and operations
│   ├── parser.py                    # Email parsing logic
│   ├── security.py                  # Security utilities (if needed)
│   └── simulation.py                # Simulation utilities (if needed)
│
├── database/                         # SQLite database
│   └── bnpl.db                      # Main database file (auto-created)
│
├── frontend/                         # React frontend
│   ├── node_modules/                # NPM dependencies (ignored)
│   ├── src/                         # Source code
│   │   ├── api/                     # API integration
│   │   │   └── axios.js             # Axios instance with config
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.jsx        # Main dashboard page
│   │   │   └── Login.jsx            # Login page
│   │   ├── styles/                  # CSS files
│   │   │   ├── Dashboard.css        # Dashboard styles
│   │   │   └── Login.css            # Login styles
│   │   ├── App.jsx                  # Main app component
│   │   ├── index.css                # Global styles
│   │   └── main.jsx                 # Entry point
│   ├── index.html                   # HTML template
│   ├── package.json                 # NPM dependencies
│   └── vite.config.js               # Vite configuration
│
├── venv/                             # Python virtual environment (ignored)
│
├── .env                              # Environment variables (ignored)
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── app.py                            # Main Flask application
├── client_secret.json                # Google OAuth credentials (ignored)
├── client_secret.json.example        # OAuth credentials template
├── config.py                         # Flask configuration
├── requirements.txt                  # Python dependencies
│
├── API_DOCUMENTATION.md              # API endpoint documentation
├── IMPLEMENTATION_SUMMARY.md         # Implementation details
├── PROJECT_STRUCTURE.md              # This file
├── QUICKSTART.md                     # Quick setup guide
├── README.md                         # Main documentation
├── TESTING_GUIDE.md                  # Testing instructions
│
├── setup.bat                         # Windows setup script
└── setup.sh                          # Linux/Mac setup script
```

---

## File Descriptions

### Backend Files

#### `app.py`
Main Flask application with all API endpoints:
- Authentication routes (`/auth/*`)
- User management routes (`/api/user/*`)
- BNPL operations routes (`/api/bnpl/*`, `/api/emails/sync`, `/api/risk-score`)
- Legacy routes for backward compatibility

#### `config.py`
Flask configuration class that loads environment variables.

#### `backend/models.py`
Database layer with SQLite operations:
- `init_db()` - Initialize database tables
- `get_bnpl_records()` - Fetch BNPL records
- `insert_bnpl_record()` - Insert new record
- `clear_bnpl_records()` - Clear user records
- `get_user_salary()` - Get user salary
- `update_user_salary()` - Update salary

#### `backend/parser.py`
Email parsing logic:
- `parse_bnpl_email()` - Extract BNPL data from email
- `extract_vendor()` - Identify vendor/merchant
- `is_bnpl_email()` - Check if email is BNPL-related

#### `backend/finance.py`
Financial calculations:
- `calculate_analysis()` - Calculate risk metrics
  - Total outstanding
  - Monthly obligation
  - Debt-to-income ratio
  - Risk score (0-100)

#### `backend/gmail_service.py`
Gmail API integration:
- `create_flow()` - Create OAuth flow
- `get_gmail_service()` - Build Gmail service
- `get_credentials_from_session()` - Retrieve credentials
- `fetch_gmail_messages()` - Fetch and parse messages
- `extract_email_body()` - Extract email content
- `get_user_email()` - Get user's email address

---

### Frontend Files

#### `frontend/src/main.jsx`
React entry point that renders the app.

#### `frontend/src/App.jsx`
Main app component with React Router setup:
- `/` - Login page
- `/dashboard` - Dashboard page

#### `frontend/src/api/axios.js`
Axios instance configured with:
- Base URL: `http://localhost:5000`
- Credentials support
- JSON headers

#### `frontend/src/pages/Login.jsx`
Login page component:
- Google OAuth button
- Feature highlights
- Auto-redirect if authenticated

#### `frontend/src/pages/Dashboard.jsx`
Main dashboard component:
- User info display
- Salary editor
- Email sync button
- Metrics cards (4)
- BNPL records table
- Loading states
- Error handling

#### `frontend/src/styles/*.css`
CSS files for styling components.

#### `frontend/vite.config.js`
Vite configuration:
- React plugin
- Dev server on port 3000

#### `frontend/package.json`
NPM dependencies:
- react, react-dom
- react-router-dom
- axios
- vite

---

### Configuration Files

#### `.env`
Environment variables (not committed):
```
SECRET_KEY="your-secret-key"
```

#### `.env.example`
Template for environment variables.

#### `client_secret.json`
Google OAuth credentials (not committed):
```json
{
  "web": {
    "client_id": "...",
    "client_secret": "...",
    "redirect_uris": ["http://localhost:5000/auth/callback"]
  }
}
```

#### `client_secret.json.example`
Template for OAuth credentials.

#### `.gitignore`
Specifies files to ignore in git:
- Environment files (.env)
- OAuth credentials (client_secret.json)
- Python cache (__pycache__)
- Virtual environment (venv/)
- Database files (*.db)
- Frontend build files (node_modules/, dist/)

#### `requirements.txt`
Python dependencies:
- Flask
- flask-cors
- google-api-python-client
- google-auth
- google-auth-oauthlib
- python-dotenv
- beautifulsoup4
- And more...

---

### Documentation Files

#### `README.md`
Main project documentation:
- Features overview
- Tech stack
- Setup instructions
- API endpoints
- How it works
- Security features

#### `QUICKSTART.md`
Quick setup guide:
- 5-minute backend setup
- 3-minute frontend setup
- Google Cloud setup
- Troubleshooting

#### `API_DOCUMENTATION.md`
Complete API reference:
- All endpoints documented
- Request/response examples
- Error codes
- Testing with cURL

#### `IMPLEMENTATION_SUMMARY.md`
Implementation details:
- What was built
- Files modified/created
- Data flow
- Parsing strategy
- Risk scoring algorithm

#### `TESTING_GUIDE.md`
Testing instructions:
- Manual testing checklist
- Test scenarios
- Edge cases
- Performance testing
- Browser compatibility

#### `PROJECT_STRUCTURE.md`
This file - project structure documentation.

---

### Setup Scripts

#### `setup.bat`
Windows setup script:
- Checks Python installation
- Creates virtual environment
- Installs dependencies
- Sets up environment files
- Installs frontend dependencies

#### `setup.sh`
Linux/Mac setup script:
- Same functionality as setup.bat
- Bash syntax

---

## Database Schema

### `bnpl_records` table
```sql
CREATE TABLE bnpl_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT,
    vendor TEXT,
    amount REAL,
    installments INTEGER,
    due_date TEXT,
    email_subject TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### `users` table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    salary REAL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

---

## Key Dependencies

### Backend
- **Flask**: Web framework
- **flask-cors**: CORS support
- **google-api-python-client**: Gmail API
- **google-auth**: OAuth authentication
- **python-dotenv**: Environment variables
- **sqlite3**: Database (built-in)

### Frontend
- **React 18**: UI library
- **React Router**: Routing
- **Axios**: HTTP client
- **Vite**: Build tool

---

## Port Configuration

- **Backend**: `http://localhost:5000`
- **Frontend**: `http://localhost:3000`
- **OAuth Redirect**: `http://localhost:5000/auth/callback`

---

## Environment Variables

### Required
- `SECRET_KEY`: Flask session secret

### Optional
- `OAUTHLIB_INSECURE_TRANSPORT`: Set to "1" for local development (HTTP)

---

## Git Workflow

### Ignored Files
- `.env` - Contains secrets
- `client_secret.json` - OAuth credentials
- `venv/` - Virtual environment
- `__pycache__/` - Python cache
- `node_modules/` - NPM dependencies
- `*.db` - Database files
- `frontend/dist/` - Build output

### Committed Files
- Source code (`.py`, `.jsx`, `.css`)
- Configuration templates (`.example` files)
- Documentation (`.md` files)
- Setup scripts (`.sh`, `.bat`)
- Requirements (`requirements.txt`, `package.json`)

---

## Development Workflow

1. **Start Backend**
   ```bash
   python app.py
   ```

2. **Start Frontend** (separate terminal)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Application**
   - Open `http://localhost:3000`
   - Login with Google
   - Sync emails
   - View dashboard

---

## Build for Production

### Backend
```bash
# Set production environment
export OAUTHLIB_INSECURE_TRANSPORT=0
export SECRET_KEY="strong-random-secret"

# Use production WSGI server
pip install gunicorn
gunicorn app:app
```

### Frontend
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

---

## Maintenance

### Update Dependencies

**Backend:**
```bash
pip install --upgrade -r requirements.txt
pip freeze > requirements.txt
```

**Frontend:**
```bash
cd frontend
npm update
```

### Database Migrations

Currently using SQLite with auto-creation. For production:
1. Migrate to PostgreSQL
2. Use Alembic for migrations
3. Implement proper schema versioning

---

## Security Considerations

- Never commit `.env` or `client_secret.json`
- Use strong `SECRET_KEY` in production
- Enable HTTPS in production
- Implement rate limiting
- Sanitize email content before parsing
- Validate all user inputs
- Use secure session cookies
- Rotate OAuth credentials if exposed
