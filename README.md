# HuntDesk 🎯

AI-powered job application tracker. Upload your resume, track applications, 
and get AI match scores for every job you apply to.

**Live:** https://huntdesk.vercel.app

## What it does

- Upload resume → AI extracts your skills automatically
- Add job applications with AI match scoring
- Kanban board to track application status
- Analytics dashboard with response rates and skill gaps

## Tech Stack

- **Backend:** FastAPI, PostgreSQL, Google Gemini AI
- **Frontend:** React, Tailwind CSS
- **Deployed:** Railway (backend) + Vercel (frontend)

## Run locally

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Fill in .env values
python -m uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

## Environment Variables
```env
DATABASE_URL=your-postgresql-url
SECRET_KEY=your-secret-key
GEMINI_API_KEY=your-gemini-key
```

## Author

Surya Prabhas Bandaru — [LinkedIn](https://www.linkedin.com/in/bsuryaprabhas/) • [Portfolio](https://surya-portfolio-mu.vercel.app/)