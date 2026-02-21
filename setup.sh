#!/bin/bash

echo "========================================"
echo "BNPL Guardian - Setup Script"
echo "========================================"
echo ""

echo "[1/5] Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.8+ from https://www.python.org/"
    exit 1
fi
python3 --version
echo ""

echo "[2/5] Creating virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "Virtual environment created."
else
    echo "Virtual environment already exists."
fi
echo ""

echo "[3/5] Activating virtual environment and installing dependencies..."
source venv/bin/activate
pip install -r requirements.txt
echo ""

echo "[4/5] Setting up environment files..."
if [ ! -f ".env" ]; then
    echo 'SECRET_KEY="change-this-to-a-random-secret-key"' > .env
    echo "Created .env file. Please update SECRET_KEY!"
else
    echo ".env file already exists."
fi
echo ""

if [ ! -f "client_secret.json" ]; then
    echo "WARNING: client_secret.json not found!"
    echo "Please download OAuth credentials from Google Cloud Console."
    echo "See README.md for instructions."
else
    echo "client_secret.json found."
fi
echo ""

echo "[5/5] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "WARNING: Node.js is not installed"
    echo "Frontend setup will be skipped."
    echo "Please install Node.js from https://nodejs.org/"
else
    node --version
    echo "Node.js found. Setting up frontend..."
    cd frontend
    if [ ! -d "node_modules" ]; then
        npm install
    else
        echo "Frontend dependencies already installed."
    fi
    cd ..
fi
echo ""

echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Update SECRET_KEY in .env file"
echo "2. Add client_secret.json from Google Cloud Console"
echo "3. Run backend: python app.py"
echo "4. Run frontend: cd frontend && npm run dev"
echo ""
echo "See QUICKSTART.md for detailed instructions."
echo ""
