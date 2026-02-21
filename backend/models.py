import sqlite3

DB_PATH = "database/bnpl.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS bnpl_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_email TEXT,
            gmail_message_id TEXT,
            vendor TEXT,
            amount REAL,
            installments INTEGER,
            due_date TEXT,
            email_subject TEXT,
            status TEXT DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_email, gmail_message_id)
        )
    """)
    
    # Add columns if they don't exist (for existing databases)
    cursor.execute("PRAGMA table_info(bnpl_records)")
    columns = [column[1] for column in cursor.fetchall()]
    
    if 'status' not in columns:
        cursor.execute("ALTER TABLE bnpl_records ADD COLUMN status TEXT DEFAULT 'active'")
    
    if 'gmail_message_id' not in columns:
        cursor.execute("ALTER TABLE bnpl_records ADD COLUMN gmail_message_id TEXT")
        # Create unique constraint after adding column
        cursor.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_user_gmail_msg ON bnpl_records(user_email, gmail_message_id)")
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            full_name TEXT,
            salary REAL DEFAULT 0,
            monthly_rent REAL DEFAULT 0,
            other_expenses REAL DEFAULT 0,
            city TEXT,
            existing_loans REAL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()   
    conn.close()
    
def get_bnpl_records(user_email=None, status_filter=None):
    """
    Get BNPL records. 
    status_filter: None (all), 'active', 'paid'
    """
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    if user_email:
        if status_filter:
            cursor.execute("""
                SELECT id, gmail_message_id, vendor, amount, installments, due_date, email_subject, status, created_at 
                FROM bnpl_records 
                WHERE user_email = ? AND status = ?
                ORDER BY created_at DESC
            """, (user_email, status_filter))
        else:
            cursor.execute("""
                SELECT id, gmail_message_id, vendor, amount, installments, due_date, email_subject, status, created_at 
                FROM bnpl_records 
                WHERE user_email = ?
                ORDER BY created_at DESC
            """, (user_email,))
    else:
        cursor.execute("""
            SELECT id, gmail_message_id, vendor, amount, installments, due_date, email_subject, status, created_at 
            FROM bnpl_records 
            ORDER BY created_at DESC
        """)
    
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "id": row[0],
            "gmail_message_id": row[1],
            "vendor": row[2],
            "amount": row[3],
            "installments": row[4],
            "due_date": row[5],
            "email_subject": row[6],
            "status": row[7],
            "created_at": row[8]
        }
        for row in rows
    ]

def insert_bnpl_record(user_email, gmail_message_id, vendor, amount, installments, due_date, email_subject):
    """Insert BNPL record with Gmail message ID for idempotent sync"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            INSERT INTO bnpl_records (user_email, gmail_message_id, vendor, amount, installments, due_date, email_subject)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (user_email, gmail_message_id, vendor, amount, installments, due_date, email_subject))
        
        conn.commit()
        return True
    except sqlite3.IntegrityError as e:
        # Duplicate gmail_message_id for this user - skip
        print(f"[DB] Skipping duplicate Gmail message {gmail_message_id} for user {user_email}")
        return False
    finally:
        conn.close()

def clear_bnpl_records(user_email):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM bnpl_records WHERE user_email = ?", (user_email,))
    conn.commit()
    conn.close()

def get_user_salary(user_email):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT salary FROM users WHERE email = ?", (user_email,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else 30000  # Default salary

def get_user_profile(user_email):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT email, salary, full_name, monthly_rent, other_expenses, city, existing_loans 
        FROM users WHERE email = ?
    """, (user_email,))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return {
            "email": row[0],
            "salary": row[1] or 30000,
            "full_name": row[2],
            "monthly_rent": row[3] or 0,
            "other_expenses": row[4] or 0,
            "city": row[5],
            "existing_loans": row[6] or 0
        }
    return None

def update_user_salary(user_email, salary):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        INSERT INTO users (email, salary) VALUES (?, ?)
        ON CONFLICT(email) DO UPDATE SET salary = ?
    """, (user_email, salary, salary))
    
    conn.commit()
    conn.close()

def update_user_profile(user_email, profile_data):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        INSERT INTO users (
            email, full_name, salary, monthly_rent, other_expenses, city, existing_loans
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(email) DO UPDATE SET 
            full_name = ?,
            salary = ?,
            monthly_rent = ?,
            other_expenses = ?,
            city = ?,
            existing_loans = ?
    """, (
        user_email,
        profile_data.get("full_name"),
        profile_data.get("salary", 30000),
        profile_data.get("monthly_rent", 0),
        profile_data.get("other_expenses", 0),
        profile_data.get("city"),
        profile_data.get("existing_loans", 0),
        # For UPDATE clause
        profile_data.get("full_name"),
        profile_data.get("salary", 30000),
        profile_data.get("monthly_rent", 0),
        profile_data.get("other_expenses", 0),
        profile_data.get("city"),
        profile_data.get("existing_loans", 0)
    ))
    
    conn.commit()
    conn.close()

def update_bnpl_status(record_id, status):
    """Update BNPL record status (active/paid)"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        UPDATE bnpl_records 
        SET status = ? 
        WHERE id = ?
    """, (status, record_id))
    
    conn.commit()
    conn.close()

def get_bnpl_record_by_id(record_id):
    """Get a specific BNPL record by ID"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT id, user_email, gmail_message_id, vendor, amount, installments, due_date, email_subject, status, created_at 
        FROM bnpl_records 
        WHERE id = ?
    """, (record_id,))
    
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return {
            "id": row[0],
            "user_email": row[1],
            "gmail_message_id": row[2],
            "vendor": row[3],
            "amount": row[4],
            "installments": row[5],
            "due_date": row[6],
            "email_subject": row[7],
            "status": row[8],
            "created_at": row[9]
        }
    return None

def is_gmail_message_processed(user_email, gmail_message_id):
    """Check if a Gmail message has already been processed for this user"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT id FROM bnpl_records 
        WHERE user_email = ? AND gmail_message_id = ?
    """, (user_email, gmail_message_id))
    
    row = cursor.fetchone()
    conn.close()
    
    return row is not None