# API Documentation

Base URL: `http://localhost:5000`

All endpoints require session-based authentication (except `/auth/login`).

## Authentication Endpoints

### POST /auth/login
Initiates Google OAuth flow.

**Response:**
- Redirects to Google OAuth consent screen

---

### GET /auth/callback
OAuth callback handler. Called by Google after user authorization.

**Query Parameters:**
- `code`: Authorization code from Google
- `state`: State parameter for CSRF protection

**Response:**
- Redirects to frontend dashboard with `?auth=success`

---

### GET /auth/status
Check if user is authenticated.

**Response:**
```json
{
  "authenticated": true,
  "email": "user@example.com"
}
```

---

### GET /auth/logout
Logout user and clear session.

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

---

## User Endpoints

### GET /api/user/email
Get authenticated user's email address.

**Response:**
```json
{
  "email": "user@example.com"
}
```

**Errors:**
- `401`: Not authenticated

---

### GET /api/user/salary
Get user's monthly salary.

**Response:**
```json
{
  "salary": 30000
}
```

**Errors:**
- `401`: Not authenticated

---

### POST /api/user/salary
Update user's monthly salary.

**Request Body:**
```json
{
  "salary": 50000
}
```

**Response:**
```json
{
  "message": "Salary updated",
  "salary": 50000
}
```

**Errors:**
- `401`: Not authenticated

---

## BNPL Endpoints

### GET /api/emails/sync
Fetch Gmail messages, parse BNPL data, and store in database.

**Query Parameters:**
- None (uses last 50 emails by default)

**Response:**
```json
{
  "message": "Emails synced successfully",
  "synced_count": 50,
  "bnpl_count": 5
}
```

**Process:**
1. Fetches last 50 Gmail messages
2. Filters for BNPL-related keywords
3. Parses email content for amount, installments, due dates
4. Stores records in database
5. Returns count of synced emails

**Errors:**
- `401`: Not authenticated
- `500`: Could not fetch user email

---

### GET /api/bnpl/records
Get all BNPL records for authenticated user.

**Response:**
```json
{
  "records": [
    {
      "id": 1,
      "vendor": "Amazon",
      "amount": 15000,
      "installments": 3,
      "due_date": "15/03/2024",
      "email_subject": "Your EMI payment is due",
      "created_at": "2024-02-21 10:30:00"
    }
  ],
  "count": 1
}
```

**Errors:**
- `401`: Not authenticated

---

### GET /api/risk-score
Calculate and return financial risk analysis.

**Response:**
```json
{
  "total_outstanding": 45000,
  "monthly_obligation": 15000,
  "debt_ratio": 0.5,
  "risk_score": 75,
  "risk_level": "High",
  "salary": 30000
}
```

**Calculation Logic:**
- `total_outstanding`: Sum of all BNPL amounts
- `monthly_obligation`: Sum of (amount / installments) for each record
- `debt_ratio`: monthly_obligation / salary
- `risk_score`: 
  - 0-20 if debt_ratio < 0.2 (Low)
  - 20-50 if debt_ratio 0.2-0.4 (Medium)
  - 50-100 if debt_ratio > 0.4 (High)

**Errors:**
- `401`: Not authenticated

---

## Legacy Endpoints (Backward Compatibility)

### GET /api/bnpl
Get all BNPL records (no user filtering).

**Response:**
```json
[
  {
    "id": 1,
    "vendor": "Amazon",
    "amount": 15000,
    "installments": 3,
    "due_date": "15/03/2024"
  }
]
```

---

### GET /api/analysis
Calculate analysis with fake profile.

**Response:**
```json
{
  "total_outstanding": 45000,
  "monthly_obligation": 15000,
  "debt_ratio": 0.5,
  "risk_score": 75,
  "risk_level": "High",
  "salary": 30000
}
```

---

## Error Responses

All endpoints may return these error responses:

### 401 Unauthorized
```json
{
  "error": "Not authenticated"
}
```

### 500 Internal Server Error
```json
{
  "error": "Error message describing the issue"
}
```

---

## CORS Configuration

The API allows requests from:
- `http://localhost:3000` (Vite default)
- `http://localhost:5173` (Vite alternative)

Credentials (cookies/sessions) are supported via `withCredentials: true`.

---

## Session Management

- Sessions are stored server-side
- Session cookie is httpOnly
- Session expires when browser closes (or after logout)
- OAuth tokens are stored in session, never exposed to client

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding in production:
- Gmail API has quota limits (check Google Cloud Console)
- Recommended: Implement rate limiting for sync endpoint
- Suggested: Max 1 sync per minute per user

---

## Testing with cURL

### Check authentication status
```bash
curl -X GET http://localhost:5000/auth/status \
  -H "Cookie: session=YOUR_SESSION_COOKIE"
```

### Sync emails
```bash
curl -X GET http://localhost:5000/api/emails/sync \
  -H "Cookie: session=YOUR_SESSION_COOKIE"
```

### Get risk score
```bash
curl -X GET http://localhost:5000/api/risk-score \
  -H "Cookie: session=YOUR_SESSION_COOKIE"
```

### Update salary
```bash
curl -X POST http://localhost:5000/api/user/salary \
  -H "Content-Type: application/json" \
  -H "Cookie: session=YOUR_SESSION_COOKIE" \
  -d '{"salary": 50000}'
```
