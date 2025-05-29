from sqlalchemy.orm import Session
from  app.db.db_connection import get_session
from fastapi import Depends
from app.schemas.create_user import Create_User
from app.models.user_model import UserModel
from pymysql.err import IntegrityError
from app.exceptions import RecordAlreadyExists

class UserService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session: Session = session
        
    def create_user(self, user: Create_User):
        user_model = UserModel(name=user.name, email=user.email, dob=user.dob)       
        self.session.add(user_model)
        self.session.commit()
        self.session.refresh(user_model)
        return user_model
        
    