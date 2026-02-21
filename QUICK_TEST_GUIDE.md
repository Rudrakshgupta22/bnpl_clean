# Quick Test Guide - Dashboard Upgrade

## Prerequisites
- Backend running on port 5000
- Frontend running on port 3000
- Gmail OAuth configured

## Step-by-Step Testing

### 1. **Start the Servers**

**Terminal 1 - Backend:**
```bash
python app.py
```
Expected: Backend starts on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Expected: Frontend starts on http://localhost:3000

### 2. **Login & Onboarding**
1. Open http://localhost:3000
2. Click "Login with Google"
3. Complete onboarding:
   - Enter Full Name
   - Enter Monthly Salary (e.g., 50000)
   - Enter Monthly Rent (e.g., 10000)
   - Enter Other Expenses (e.g., 5000)
   - Click "Complete Onboarding"

### 3. **Test Dashboard Section**
1. You should see the main dashboard with:
   - ✅ 4 KPI cards (Total Outstanding, Monthly EMI, Debt Ratio, Risk Score)
   - ✅ Pie chart (Income Distribution)
   - ✅ Bar chart (Financial Breakdown)
   - ✅ Transactions table (empty initially)

2. Click "🔄 Sync Emails" button
   - Should show "Syncing..." state
   - After sync, transactions should appear in the table

### 4. **Test Financial Health Section**
1. Click "💰 Financial Health" in sidebar
2. You should see:
   - ✅ Current financial profile cards
   - ✅ Interactive sliders for:
     - Monthly Salary
     - Monthly Rent
     - Other Expenses
   - ✅ Real-time impact analysis showing:
     - Debt-to-Income Ratio
     - Disposable Income
     - Savings Potential
   - ✅ Smart recommendations

3. **Test Simulator:**
   - Drag salary slider to 100000
   - Watch disposable income increase
   - Watch debt ratio decrease
   - Check recommendations update

### 5. **Test Transactions Section**
1. Click "📋 Transactions" in sidebar
2. You should see:
   - ✅ Search box (search by vendor or subject)
   - ✅ Sort dropdown (date, amount, installments)
   - ✅ Transactions table with pagination
   - ✅ Total outstanding summary at bottom

3. **Test Search:**
   - Type a vendor name
   - Results should filter in real-time

4. **Test Sort:**
   - Change sort option
   - Table should re-sort

### 6. **Test Settings Section**
1. Click "⚙️ Settings" in sidebar
2. You should see:
   - ✅ Email display
   - ✅ Full Name with Edit button
   - ✅ Monthly Salary with Edit button
   - ✅ Logout button

### 7. **Test Edit Profile Modal**
1. From Settings or Financial Health, click "✏️ Edit Profile"
2. Modal should appear with:
   - ✅ Full Name field
   - ✅ Monthly Salary field
   - ✅ Monthly Rent field
   - ✅ Other Expenses field
   - ✅ Cancel and Save buttons

3. **Test Update:**
   - Change salary to 75000
   - Click "Save Changes"
   - Should show success message
   - Dashboard should refresh with new data

### 8. **Test Animations**
- ✅ Sidebar slides in on load
- ✅ Cards fade in with stagger effect
- ✅ Section switching has smooth transitions
- ✅ Hover effects on buttons and cards
- ✅ Loading spinner rotates smoothly

### 9. **Test Responsive Design**
1. Open DevTools (F12)
2. Toggle device toolbar
3. Test on:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

Expected: Layout adapts properly

## Expected Results

✅ All sections load without errors
✅ Sidebar navigation works smoothly
✅ Animations are smooth and responsive
✅ Profile updates save to backend
✅ Financial simulator updates in real-time
✅ Email sync fetches BNPL transactions
✅ All forms validate properly
✅ Error messages display correctly

## Troubleshooting

### Issue: Blank page on localhost:3000
- Check browser console for errors (F12)
- Verify backend is running on port 5000
- Clear browser cache and reload

### Issue: "Not authenticated" error
- Make sure you completed onboarding
- Check session in browser DevTools
- Try logging out and logging back in

### Issue: Transactions not showing after sync
- Check backend logs for email sync errors
- Verify Gmail API is configured
- Check if emails match the strict filtering criteria

### Issue: Profile update fails
- Check backend logs for database errors
- Verify all required fields are filled
- Try refreshing the page

## Performance Notes

- Dashboard should load in < 2 seconds
- Section switching should be instant
- Animations should be smooth (60 FPS)
- No console errors should appear

## Success Criteria

✅ Dashboard loads with all sections
✅ Sidebar navigation works
✅ Profile can be edited
✅ Financial simulator works
✅ Transactions display correctly
✅ All animations are smooth
✅ No console errors
✅ Responsive on all devices
