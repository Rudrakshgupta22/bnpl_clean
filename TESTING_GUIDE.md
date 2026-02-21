# Testing Guide

## Manual Testing Checklist

### Backend Testing

#### 1. Health Check
```bash
curl http://localhost:5000/api/health
```
Expected: `{"status": "ok"}`

#### 2. Authentication Flow
1. Visit `http://localhost:5000/auth/login`
2. Should redirect to Google OAuth
3. After authorization, should redirect to `http://localhost:3000/dashboard?auth=success`

#### 3. Check Auth Status (after login)
```bash
curl http://localhost:5000/auth/status \
  -H "Cookie: session=YOUR_SESSION_COOKIE" \
  --cookie-jar cookies.txt
```
Expected: `{"authenticated": true, "email": "your@email.com"}`

#### 4. Sync Emails
```bash
curl http://localhost:5000/api/emails/sync \
  -b cookies.txt
```
Expected: `{"message": "Emails synced successfully", "synced_count": 50, "bnpl_count": X}`

#### 5. Get BNPL Records
```bash
curl http://localhost:5000/api/bnpl/records \
  -b cookies.txt
```
Expected: JSON array of BNPL records

#### 6. Get Risk Score
```bash
curl http://localhost:5000/api/risk-score \
  -b cookies.txt
```
Expected: Risk analysis JSON

#### 7. Update Salary
```bash
curl -X POST http://localhost:5000/api/user/salary \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"salary": 50000}'
```
Expected: `{"message": "Salary updated", "salary": 50000}`

---

### Frontend Testing

#### 1. Login Page
- [ ] Visit `http://localhost:3000`
- [ ] Page loads without errors
- [ ] "Connect with Gmail" button is visible
- [ ] Features list displays correctly
- [ ] Click button redirects to Google OAuth

#### 2. OAuth Flow
- [ ] Google consent screen appears
- [ ] Select account
- [ ] Grant permissions
- [ ] Redirects back to dashboard

#### 3. Dashboard - Initial Load
- [ ] Dashboard loads successfully
- [ ] User email displays in header
- [ ] Salary section shows default ₹30,000
- [ ] "Sync Emails" button is visible
- [ ] Metrics cards display (may show 0 if no data)
- [ ] Empty state message if no records

#### 4. Email Sync
- [ ] Click "Sync Emails" button
- [ ] Button shows "⏳ Syncing..." state
- [ ] Success message appears after sync
- [ ] Metrics update with new data
- [ ] Records table populates

#### 5. Salary Update
- [ ] Click "Edit" button next to salary
- [ ] Input field appears
- [ ] Enter new salary value
- [ ] Click "Save"
- [ ] Salary updates
- [ ] Metrics recalculate

#### 6. Metrics Display
- [ ] Total Outstanding shows correct sum
- [ ] Monthly Obligation calculates correctly
- [ ] Debt-to-Income Ratio displays as percentage
- [ ] Risk Score shows with correct color:
  - Green for Low Risk (< 20)
  - Yellow for Medium Risk (20-50)
  - Red for High Risk (> 50)

#### 7. Records Table
- [ ] Table displays all BNPL records
- [ ] Columns: Vendor, Amount, Installments, Due Date, Email Subject
- [ ] Amounts formatted with ₹ symbol
- [ ] Hover effect on rows
- [ ] Long subjects truncate with ellipsis

#### 8. Logout
- [ ] Click "Logout" button
- [ ] Redirects to login page
- [ ] Session cleared
- [ ] Cannot access dashboard without re-login

---

## Test Scenarios

### Scenario 1: New User First Time
1. User visits app for first time
2. Clicks "Connect with Gmail"
3. Authorizes application
4. Lands on dashboard with default salary
5. Clicks "Sync Emails"
6. Sees BNPL records (if any in Gmail)
7. Views risk analysis

### Scenario 2: User with BNPL Emails
1. User has emails with keywords: "EMI", "installment", "pay later"
2. Syncs emails
3. System detects and parses BNPL data
4. Records appear in table
5. Metrics calculate correctly
6. Risk score reflects debt level

### Scenario 3: User with No BNPL Emails
1. User syncs emails
2. No BNPL keywords found
3. Empty state message displays
4. Metrics show 0 values
5. Risk score is 0 (No Data)

### Scenario 4: High Risk User
1. User has high BNPL debt
2. Monthly obligation > 40% of salary
3. Risk score shows 50-100
4. Risk card displays red color
5. "🔴 High Risk" label shows

### Scenario 5: Salary Update Impact
1. User has BNPL records
2. Initial risk score is High
3. User increases salary
4. Risk score recalculates
5. May change to Medium or Low risk

---

## Edge Cases to Test

### Backend
- [ ] Sync with no Gmail messages
- [ ] Sync with emails but no BNPL content
- [ ] Parse email with missing amount
- [ ] Parse email with missing installments
- [ ] Parse email with unusual date format
- [ ] Multiple syncs (should clear old data)
- [ ] Logout and re-login (session handling)
- [ ] Expired OAuth token (should refresh)

### Frontend
- [ ] Slow network (loading states)
- [ ] API errors (error messages)
- [ ] Very long email subjects (truncation)
- [ ] Large number of records (scrolling)
- [ ] Mobile responsive design
- [ ] Browser back button behavior
- [ ] Refresh page (session persistence)

---

## Sample Test Data

### Test Email Subjects
```
"Your EMI payment of ₹5000 is due on 15/03/2024"
"Amazon Pay Later - 3 installments of ₹2000 each"
"Flipkart: Your order with 6 month EMI"
"Payment reminder: ₹10000 installment due"
```

### Expected Parsing Results
```json
{
  "vendor": "Amazon",
  "amount": 5000,
  "installments": 3,
  "due_date": "15/03/2024"
}
```

---

## Performance Testing

### Load Testing
```bash
# Test sync endpoint with multiple requests
for i in {1..10}; do
  curl http://localhost:5000/api/emails/sync -b cookies.txt &
done
```

### Response Time Expectations
- Health check: < 50ms
- Auth status: < 100ms
- Email sync: 2-5 seconds (depends on Gmail API)
- Get records: < 200ms
- Risk calculation: < 100ms

---

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## Common Issues & Solutions

### Issue: "Not authenticated" error
**Solution:** Clear cookies and re-login

### Issue: Sync returns 0 BNPL records
**Solution:** Check if Gmail has emails with BNPL keywords

### Issue: OAuth redirect fails
**Solution:** Verify redirect URI in Google Cloud Console matches `http://localhost:5000/auth/callback`

### Issue: CORS error in browser
**Solution:** Check backend CORS configuration includes frontend origin

### Issue: Session expires quickly
**Solution:** Check Flask session configuration and cookie settings

### Issue: Parsing misses amounts
**Solution:** Check email format and update regex patterns in parser.py

---

## Automated Testing (Future)

### Backend Unit Tests
```python
# test_parser.py
def test_parse_amount():
    text = "Your EMI of ₹5000 is due"
    result = parse_bnpl_email("", text)
    assert result["amount"] == 5000

def test_parse_installments():
    text = "3 installments remaining"
    result = parse_bnpl_email("", text)
    assert result["installments"] == 3
```

### Frontend Tests
```javascript
// Dashboard.test.jsx
test('displays metrics correctly', () => {
  render(<Dashboard />)
  expect(screen.getByText('Total Outstanding')).toBeInTheDocument()
})
```

---

## Security Testing

- [ ] Test SQL injection in inputs
- [ ] Test XSS in email content
- [ ] Verify session hijacking protection
- [ ] Check CSRF protection
- [ ] Test unauthorized API access
- [ ] Verify OAuth token security

---

## Deployment Testing

Before deploying to production:
- [ ] Test with HTTPS
- [ ] Test with production OAuth credentials
- [ ] Test with production database
- [ ] Load test with realistic traffic
- [ ] Security audit
- [ ] Performance monitoring setup
