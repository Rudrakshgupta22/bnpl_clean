# BNPL Guardian

## Setup Instructions

1. Clone the repository
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Copy `.env.example` to `.env` and fill in your secret key
6. Copy `client_secret.json.example` to `client_secret.json` and add your Google OAuth credentials
7. Run the app: `python app.py`

## Important Security Notes

- Never commit `.env` or `client_secret.json` files
- Keep your secrets secure and rotate them if exposed
