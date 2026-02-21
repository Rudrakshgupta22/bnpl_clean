@echo off
echo ========================================
echo BNPL Guardian - Setup Script
echo ========================================
echo.

echo [1/5] Checking Python installation...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)
echo.

echo [2/5] Creating virtual environment...
if not exist venv (
    python -m venv venv
    echo Virtual environment created.
) else (
    echo Virtual environment already exists.
)
echo.

echo [3/5] Activating virtual environment and installing dependencies...
call venv\Scripts\activate.bat
pip install -r requirements.txt
echo.

echo [4/5] Setting up environment files...
if not exist .env (
    echo SECRET_KEY="change-this-to-a-random-secret-key" > .env
    echo Created .env file. Please update SECRET_KEY!
) else (
    echo .env file already exists.
)
echo.

if not exist client_secret.json (
    echo WARNING: client_secret.json not found!
    echo Please download OAuth credentials from Google Cloud Console.
    echo See README.md for instructions.
) else (
    echo client_secret.json found.
)
echo.

echo [5/5] Checking Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo WARNING: Node.js is not installed or not in PATH
    echo Frontend setup will be skipped.
    echo Please install Node.js from https://nodejs.org/
) else (
    echo Node.js found. Setting up frontend...
    cd frontend
    if not exist node_modules (
        call npm install
    ) else (
        echo Frontend dependencies already installed.
    )
    cd ..
)
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Update SECRET_KEY in .env file
echo 2. Add client_secret.json from Google Cloud Console
echo 3. Run backend: python app.py
echo 4. Run frontend: cd frontend ^&^& npm run dev
echo.
echo See QUICKSTART.md for detailed instructions.
echo.
pause
