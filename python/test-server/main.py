from fastapi import FastAPI

app = FastAPI()

# app.include_router()


@app.get('/')
async def test_app():
    return {"message": "Hello, World!"}

