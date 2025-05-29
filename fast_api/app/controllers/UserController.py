from fastapi import APIRouter, Depends
from app.schemas.create_user import Create_User
from app.service.user_service import UserService

user_controller = APIRouter(prefix='/users')

@user_controller.post('/add')
def save_user(user: Create_User, user_service: UserService = Depends()):
    user = user_service.create_user(user)
    
    return user