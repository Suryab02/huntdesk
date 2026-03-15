# HuntDesk Backend

AI powered job application tracker API.

## Setup

```bash
# Make sure Python 3.11 is active
python --version  # Should show 3.11.x

# Run setup script
chmod +x setup.sh
./setup.sh

# Copy env file
cp .env.example .env
# Fill in your values in .env

# Run the app
source venv/bin/activate
python -m uvicorn app.main:app --reload
```

## Test it works

Open: http://127.0.0.1:8000
Swagger docs: http://127.0.0.1:8000/docs

## Project Structure

```
app/
├── main.py          ← FastAPI app entry point
├── database.py      ← DB connection
├── models/          ← SQLAlchemy table models
├── routes/          ← API endpoints
├── services/        ← Business logic (AI parsing etc)
└── utils/           ← Helpers (JWT auth etc)
```

## Stack

- FastAPI
- PostgreSQL + SQLAlchemy
- Google Gemini AI
- JWT Auth
