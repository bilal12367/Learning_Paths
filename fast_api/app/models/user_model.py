from app.db.db_connection import Base
from sqlalchemy import Column, String, Integer


class UserModel(Base):
    __tablename__='users'
    
    id: int = Column(Integer, autoincrement=True, primary_key=True)
    name: str = Column(String(40))
    email: str = Column(String(30), unique=True)
    dob: str = Column(String(20))