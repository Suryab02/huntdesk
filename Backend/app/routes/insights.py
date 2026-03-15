from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.job import Job
from app.utils.auth import get_current_user

router = APIRouter(prefix="/insights", tags=["insights"])

@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    jobs = db.query(Job).filter(Job.user_id == current_user.id).all()
    total = len(jobs)
    applied = 0
    screening = 0
    interview = 0
    offer = 0
    rejected = 0

    for job in jobs:
        if job.status == "applied":
            applied += 1
        elif job.status == "screening":
            screening += 1
        elif job.status == "interview":
            interview += 1
        elif job.status == "offer":
            offer += 1
        elif job.status == "rejected":
            rejected += 1

    response_rate = round((screening + interview + offer) / applied * 100) if applied > 0 else 0

    return {
        "total": total,
        "applied": applied,
        "screening": screening,
        "interview": interview,
        "offer": offer,
        "rejected": rejected,
        "response_rate": response_rate
    }


@router.get("/platforms")
def get_platform_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    jobs = db.query(Job).filter(Job.user_id == current_user.id).all()
    
    platform_counts = {}
    for job in jobs:
        if job.platform:
            platform_counts[job.platform] = platform_counts.get(job.platform, 0) + 1

    return platform_counts


@router.get("/keywords")
def get_keyword_gaps(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    jobs = db.query(Job).filter(Job.user_id == current_user.id).all()

    skill_counts = {}
    for job in jobs:
        if job.missing_skills:
            for skill in job.missing_skills.split(","):
                skill = skill.strip()
                if skill:
                    skill_counts[skill] = skill_counts.get(skill, 0) + 1

    top_gaps = sorted(skill_counts.items(), key=lambda x: x[1], reverse=True)[:10]

    return {"keyword_gaps": [{"skill": s, "count": c} for s, c in top_gaps]}