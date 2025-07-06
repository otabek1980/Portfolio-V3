from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ContactMessageUpdate(BaseModel):
    is_read: Optional[bool] = None

class ContactMessageInDB(ContactMessage):
    pass