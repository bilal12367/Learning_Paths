from fastapi import FastAPI
import uvicorn
from app.controllers.UserController import user_controller
from app.db.db_connection import Base, engine

app = FastAPI()

@app.get("/test")
def test():
    return "Hello World!!"

app.include_router(user_controller)

Base.metadata.create_all(engine)

if __name__ == '__main__':
    uvicorn.run(app, port=5000)