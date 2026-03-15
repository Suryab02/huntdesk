from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.utils.auth import hash_password, verify_password, create_access_token,get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])

class RegisterRequest(BaseModel):
    email: str
    password: str
    full_name: str

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    # TODO: check if email exists

    user = db.query(User).filter(User.email == request.email).first()

    if user:
        alert("use login as emial is alredy regster");

    hashed = hash_password(request.password)

    new_user = User(
        email=request.email,
        password_hash=hashed,
        full_name=request.full_name
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token(data={
        "user_id": new_user.id,
        "email": new_user.email
    })
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == request.email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not verify_password(request.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect password")
    
    token = create_access_token(data={
        "user_id": user.id,
        "email": user.email
    })
    
    # Step 5 - return token
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name
    }