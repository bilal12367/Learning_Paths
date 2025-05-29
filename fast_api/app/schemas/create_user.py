
from pydantic import BaseModel, Field, EmailStr
from typing import Optional

class Create_User(BaseModel):
    id: Optional[str] = Field(type=Optional[str], default=None)
    name: str = Field(max_length=30)
    email: str = Field(type=EmailStr, description="Must Be Valid Email")
    dob: str

    