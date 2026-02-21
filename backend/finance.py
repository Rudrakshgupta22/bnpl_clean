from datetime import datetime, timedelta

def calculate_analysis(salary, bnpl_records):
    """
    Calculate comprehensive financial analysis.
    Returns: total_outstanding, monthly_obligation, upcoming_dues, debt_ratio, risk_score
    """
    if not bnpl_records:
        return {
            "total_outstanding": 0,
            "monthly_obligation": 0,
            "upcoming_dues": 0,
            "debt_ratio": 0,
            "risk_score": 0,
            "risk_level": "None",
            "transaction_count": 0
        }
    
    # Calculate total outstanding (only active records)
    total_outstanding = sum([r["amount"] for r in bnpl_records if r["amount"] and r.get("status") == "active"])
    
    # Calculate monthly obligation (amount / installments for each active record)
    monthly_obligation = 0
    for record in bnpl_records:
        if record.get("status") == "active" and record["amount"] and record["installments"] and record["installments"] > 0:
            monthly_obligation += record["amount"] / record["installments"]
    
    # Calculate upcoming dues (within next 30 days, only active)
    upcoming_dues = calculate_upcoming_dues(bnpl_records)
    
    # Calculate debt-to-income ratio
    debt_ratio = (monthly_obligation / salary) if salary > 0 else 0
    
    # Calculate risk score (0-100)
    if debt_ratio < 0.2:
        risk_score = int(debt_ratio * 100)  # 0-20
        risk_level = "Low"
    elif debt_ratio < 0.4:
        risk_score = 20 + int((debt_ratio - 0.2) * 150)  # 20-50
        risk_level = "Medium"
    else:
        risk_score = min(50 + int((debt_ratio - 0.4) * 100), 100)  # 50-100
        risk_level = "High"
    
    return {
        "total_outstanding": round(total_outstanding, 2),
        "monthly_obligation": round(monthly_obligation, 2),
        "upcoming_dues": round(upcoming_dues, 2),
        "debt_ratio": round(debt_ratio, 4),
        "risk_score": risk_score,
        "risk_level": risk_level,
        "transaction_count": len([r for r in bnpl_records if r.get("status") == "active"]),
        "salary": salary
    }

def calculate_upcoming_dues(bnpl_records):
    """
    Calculate total amount due within next 30 days (only active records).
    """
    today = datetime.now()
    thirty_days_later = today + timedelta(days=30)
    
    upcoming = 0
    
    for record in bnpl_records:
        if record.get("status") != "active" or not record.get("due_date") or not record.get("amount"):
            continue
        
        try:
            # Parse due date (DD/MM/YYYY format)
            due_date_str = record["due_date"]
            due_date = datetime.strptime(due_date_str, '%d/%m/%Y')
            
            # Check if due date is within next 30 days
            if today <= due_date <= thirty_days_later:
                # Add monthly installment amount
                installments = record.get("installments", 1)
                if installments > 0:
                    upcoming += record["amount"] / installments
        except:
            continue
    
    return upcoming

def calculate_affordability(salary, monthly_bnpl_obligation, rent, other_expenses):
    """
    Calculate affordability capacity.
    Returns: disposable_income, max_safe_emi, current_emi, available_emi_capacity, status
    """
    # Calculate fixed expenses
    fixed_expenses = rent + other_expenses + monthly_bnpl_obligation
    
    # Calculate disposable income
    disposable_income = salary - fixed_expenses
    
    # Define safe EMI limit (30% of salary)
    max_safe_emi = salary * 0.3
    
    # Calculate available EMI capacity
    available_emi_capacity = max_safe_emi - monthly_bnpl_obligation
    
    # Determine status
    emi_percentage = (monthly_bnpl_obligation / salary * 100) if salary > 0 else 0
    
    if emi_percentage < 20:
        status = "Healthy"
    elif emi_percentage <= 30:
        status = "Warning"
    else:
        status = "Overleveraged"
    
    # Calculate safe EMI percentage
    safe_emi_percentage = (monthly_bnpl_obligation / max_safe_emi * 100) if max_safe_emi > 0 else 0
    
    return {
        "disposable_income": round(disposable_income, 2),
        "max_safe_emi": round(max_safe_emi, 2),
        "current_emi": round(monthly_bnpl_obligation, 2),
        "available_emi_capacity": round(max(0, available_emi_capacity), 2),
        "status": status,
        "emi_percentage": round(emi_percentage, 2),
        "safe_emi_percentage": round(min(100, safe_emi_percentage), 2)
    }
