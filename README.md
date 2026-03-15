HuntDesk 🎯
HuntDesk is an AI-powered job application tracker. It helps you manage your job search, score job matches, and analyze your performance.
Features
Smart Onboarding: Upload your resume. Gemini AI extracts your skills and experience.
AI Match Scoring: See how well you match a job description.
Kanban Board: Track applications through stages like "Applied" and "Interview".
Hunt Analytics: Track response rates and skill gaps.
Secure Authentication: Secure login with protected routes.
Tech Stack
Backend: FastAPI (Python), PostgreSQL, Google Gemini AI, JWT Authentication.
Frontend: React, Vite, Tailwind CSS, Recharts, drag-and-drop.
Deployment: Backend on Railway, Frontend on Vercel, Database on Railway PostgreSQL.
Getting Started
Prerequisites
Python 3.11
Node.js 18+
PostgreSQL
Google Gemini API key
Backend Setup
bash
cd backend
/path/to/python3.11 -m venv venv
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
cp .env.example .env
python -m uvicorn app.main:app --reload
Use code with caution.

Frontend Setup
bash
cd frontend
npm install --legacy-peer-deps
npm run dev
Use code with caution.

Project Structure
huntdesk/
├── backend/
│   └── app/
│       ├── main.py
│       ├── database.py
│       ├── models/
│       │   ├── user.py
│       │   └── job.py
│       ├── routes/
│       │   ├── auth.py
│       │   ├── onboarding.py
│       │   ├── jobs.py
│       │   └── insights.py
│       ├── services/
│       │   ├── resume_parser.py
│       │   ├── job_parser.py
│       │   └── match_score.py
│       └── utils/
│           └── auth.py
└── frontend/
    └── src/
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Onboarding.jsx
        │   ├── Dashboard.jsx
        │   ├── Kanban.jsx
        │   └── Insights.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   ├── JobCard.jsx
        │   └── StatCard.jsx
        └── services/
            └── api.js
API Endpoints
Auth
POST /auth/register — Create account
POST /auth/login — Login and get JWT token
GET /auth/me — Get current user
Onboarding
POST /onboarding/upload-resume — Upload PDF, AI extracts profile
POST /onboarding/preferences — Save job hunt preferences
Jobs
POST /jobs — Add application (auto AI match scoring)
GET /jobs — Get all applications
GET /jobs/{id} — Get single application
PUT /jobs/{id}/status — Update kanban status
DELETE /jobs/{id} — Delete application
Insights
GET /insights/stats — Hunt stats (applied, interviews, offers, response rate)
GET /insights/platforms — Applications grouped by platform
GET /insights/keywords — Top missing skills across all applications
Environment Variables
env
# Backend .env
DATABASE_URL=postgresql://user:password@host:5432/huntdesk
SECRET_KEY=your-secret-key-here
GEMINI_API_KEY=your-gemini-api-key-here
Use code with caution.