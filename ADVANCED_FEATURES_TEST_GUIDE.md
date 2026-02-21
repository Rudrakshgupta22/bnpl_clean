# Advanced Features Testing Guide

## Pre-Test Setup

### 1. Database Migration
The database will automatically add the `status` column on first run. No manual migration needed.

### 2. Start Servers
```bash
# Terminal 1 - Backend
python app.py

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 3. Test Account Setup
- Login with Google OAuth
- Complete onboarding with:
  - Full Name: Test User
  - Salary: ₹50,000
  - Rent: ₹10,000
  - Other Expenses: ₹5,000

## Test Scenarios

### Test 1: Affordability Card Display

**Steps:**
1. Go to Dashboard section
2. Look for "Affordability Capacity" card
3. Verify it shows:
   - Available EMI Capacity (₹ value)
   - Financial Status (Healthy/Warning/Overleveraged)
   - Progress bar showing % of safe EMI used

**Expected Results:**
- Card displays with correct styling
- Status is "Healthy" (since no BNPL yet)
- Available capacity = ₹15,000 (30% of ₹50,000)
- Progress bar shows 0%

**Calculation Verification:**
```
Salary: ₹50,000
Max Safe EMI: ₹50,000 × 30% = ₹15,000
Current EMI: ₹0
Available: ₹15,000 - ₹0 = ₹15,000
Status: Healthy (0% < 20%)
```

---

### Test 2: Sync Emails and Get BNPL Records

**Steps:**
1. Click "🔄 Sync Emails" button
2. Wait for sync to complete
3. Check Transactions section
4. Verify records appear with status

**Expected Results:**
- Sync completes successfully
- BNPL records appear in table
- Each record shows status badge (Active)
- Dashboard metrics update

**Verification:**
- Check backend logs for sync details
- Verify records have `status: 'active'`
- Check total_outstanding is calculated

---

### Test 3: Affordability Updates After Sync

**Steps:**
1. After syncing emails, go to Dashboard
2. Check Affordability Card
3. Verify metrics updated

**Expected Results:**
- Available EMI Capacity decreased
- Status may change based on EMI percentage
- Progress bar updated

**Example:**
```
If synced ₹10,000 BNPL (₹1,000/month):
- Current EMI: ₹1,000
- Available: ₹15,000 - ₹1,000 = ₹14,000
- EMI %: 1,000/50,000 = 2% (Healthy)
- Progress: 1,000/15,000 = 6.67%
```

---

### Test 4: Status Filter in Transactions

**Steps:**
1. Go to Transactions section
2. Click status filter dropdown
3. Select "Active Only"
4. Verify only active records show
5. Select "Paid Only"
6. Verify no records show (none paid yet)
7. Select "All"
8. Verify all records show

**Expected Results:**
- Filter works correctly
- Records update based on filter
- Pagination resets when filter changes
- Count updates

---

### Test 5: Mark Single BNPL as Paid

**Steps:**
1. Go to Transactions section
2. Find first active BNPL record
3. Click "✓ Mark Paid" button
4. Watch for loading state (⏳)
5. Wait for update
6. Check success notification

**Expected Results:**
- Button shows loading state
- Record updates to "Paid" status
- Success notification appears
- Dashboard metrics recalculate
- Row shows as completed

**Verification:**
- Check backend logs for update
- Verify record status changed to "paid"
- Check risk score decreased
- Check affordability increased

---

### Test 6: Dashboard Metrics Update After Mark Paid

**Steps:**
1. After marking BNPL as paid
2. Go to Dashboard section
3. Check all metrics

**Expected Results:**
- Total Outstanding decreased
- Monthly EMI decreased
- Risk Score decreased
- Affordability Capacity increased
- Status may improve (Warning → Healthy)

**Example:**
```
Before marking ₹10,000 (₹1,000/month) as paid:
- Total Outstanding: ₹10,000
- Monthly EMI: ₹1,000
- Risk Score: 10
- Available: ₹14,000
- Status: Healthy

After marking as paid:
- Total Outstanding: ₹0
- Monthly EMI: ₹0
- Risk Score: 0
- Available: ₹15,000
- Status: Healthy
```

---

### Test 7: Mark Multiple BNPL as Paid

**Steps:**
1. If you have multiple BNPL records
2. Mark 2-3 as paid one by one
3. Watch dashboard update each time
4. Verify cumulative effect

**Expected Results:**
- Each mark as paid updates dashboard
- Metrics decrease progressively
- No page reloads
- Smooth animations

---

### Test 8: Overleveraged Status

**Steps:**
1. Manually add BNPL records to database (or sync many)
2. Create scenario where EMI > 30% of salary
3. Check Affordability Card

**Expected Results:**
- Status shows "Overleveraged" (Red)
- Red alert banner appears
- Message: "You are exceeding safe borrowing limits"
- Progress bar shows > 100%

**Example Setup:**
```
Salary: ₹50,000
Max Safe EMI: ₹15,000
Create BNPL records totaling > ₹15,000/month
- ₹20,000 BNPL (₹2,000/month) = 4%
- ₹20,000 BNPL (₹2,000/month) = 8%
- ₹20,000 BNPL (₹2,000/month) = 12%
- ₹20,000 BNPL (₹2,000/month) = 16%
- ₹10,000 BNPL (₹1,000/month) = 18%
- ₹10,000 BNPL (₹1,000/month) = 20% (Warning)
- ₹10,000 BNPL (₹1,000/month) = 22% (Warning)
- ₹10,000 BNPL (₹1,000/month) = 24% (Warning)
- ₹10,000 BNPL (₹1,000/month) = 26% (Warning)
- ₹10,000 BNPL (₹1,000/month) = 28% (Warning)
- ₹10,000 BNPL (₹1,000/month) = 30% (Warning)
- ₹5,000 BNPL (₹500/month) = 31% (Overleveraged!)
```

---

### Test 9: Mark All as Paid

**Steps:**
1. If you have multiple BNPL records
2. Mark all as paid
3. Check final state

**Expected Results:**
- All records show "Paid" status
- Total Outstanding: ₹0
- Monthly EMI: ₹0
- Risk Score: 0
- Available Capacity: ₹15,000 (full 30%)
- Status: Healthy
- Green color scheme

---

### Test 10: Animations and UX

**Steps:**
1. Mark BNPL as paid
2. Watch animations
3. Check transitions
4. Verify smoothness

**Expected Results:**
- Button shows loading state smoothly
- Row animates when updating
- Dashboard updates smoothly
- No jank or stuttering
- 60 FPS animations

---

### Test 11: Error Handling

**Steps:**
1. Try marking non-existent record as paid
2. Try marking with invalid ID
3. Check error handling

**Expected Results:**
- Graceful error messages
- No crashes
- User informed of issue
- Can retry

---

### Test 12: Responsive Design

**Steps:**
1. Test on desktop (1920x1080)
2. Test on tablet (768x1024)
3. Test on mobile (375x667)
4. Check all features work

**Expected Results:**
- Layout adapts properly
- Buttons are clickable
- Tables are readable
- Animations work smoothly

---

### Test 13: Data Persistence

**Steps:**
1. Mark BNPL as paid
2. Refresh page
3. Check if status persists

**Expected Results:**
- Record still shows as "Paid"
- Metrics still updated
- No data loss

---

### Test 14: API Response Verification

**Steps:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Mark BNPL as paid
4. Check API response

**Expected Response:**
```json
{
  "success": true,
  "message": "Payment recorded successfully",
  "analysis": {
    "total_outstanding": 0,
    "monthly_obligation": 0,
    "upcoming_dues": 0,
    "debt_ratio": 0,
    "risk_score": 0,
    "risk_level": "Low",
    "transaction_count": 0
  },
  "affordability": {
    "disposable_income": 35000,
    "max_safe_emi": 15000,
    "current_emi": 0,
    "available_emi_capacity": 15000,
    "status": "Healthy",
    "emi_percentage": 0,
    "safe_emi_percentage": 0
  }
}
```

---

## Checklist

### Backend
- [ ] Database migration works
- [ ] Status column added to bnpl_records
- [ ] Existing records default to "active"
- [ ] `/api/affordability` endpoint works
- [ ] `/api/bnpl/<id>/mark-paid` endpoint works
- [ ] `/api/bnpl/records?status=active` works
- [ ] `/api/bnpl/records?status=paid` works
- [ ] Metrics recalculate correctly
- [ ] No SQL errors in logs

### Frontend
- [ ] Affordability card displays
- [ ] Status filter works
- [ ] Mark as Paid button works
- [ ] Loading states show
- [ ] Success notifications appear
- [ ] Dashboard updates without reload
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Responsive on all devices

### Integration
- [ ] Backend and frontend communicate
- [ ] Data flows correctly
- [ ] Metrics sync between components
- [ ] No race conditions
- [ ] Error handling works

### Performance
- [ ] Affordability loads quickly
- [ ] Mark as Paid is responsive
- [ ] Dashboard updates instantly
- [ ] Animations are 60 FPS
- [ ] No memory leaks

---

## Troubleshooting

### Issue: Affordability card not showing
- Check if `/api/affordability` endpoint is working
- Check browser console for errors
- Verify user is authenticated
- Check backend logs

### Issue: Mark as Paid button not working
- Check if `/api/bnpl/<id>/mark-paid` endpoint is working
- Check browser console for errors
- Verify record ID is correct
- Check backend logs

### Issue: Metrics not updating
- Check if `loadData()` is being called
- Verify API responses are correct
- Check state management in React
- Check browser console

### Issue: Database errors
- Check if migration ran successfully
- Verify database file exists
- Check database permissions
- Check backend logs

---

## Success Criteria

✅ All tests pass
✅ No console errors
✅ No backend errors
✅ Smooth animations
✅ Correct calculations
✅ Data persists
✅ Responsive design
✅ Good performance
