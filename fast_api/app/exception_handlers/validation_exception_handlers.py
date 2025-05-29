from fastapi import FastAPI, Request
from sqlalchemy.exc import IntegrityError
from fastapi.responses import JSONResponse

def record_already_exists(req: Request, exc: IntegrityError):
    return JSONResponse(
        status_code=403,
        content=exc._message
    )

def setup_validation_exception_handlers(app: FastAPI):
    app.add_exception_handler(IntegrityError, record_already_exists)