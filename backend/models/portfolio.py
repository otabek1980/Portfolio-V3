from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class PersonalInfo(BaseModel):
    name: str
    title: str
    bio: str
    birth_date: str
    experience: str
    achievement: str
    phone: str
    email: str
    github: str
    instagram: str
    telegram: str
    telegram_channel: str
    location: str

class PersonalInfoUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    bio: Optional[str] = None
    birth_date: Optional[str] = None
    experience: Optional[str] = None
    achievement: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    github: Optional[str] = None
    instagram: Optional[str] = None
    telegram: Optional[str] = None
    telegram_channel: Optional[str] = None
    location: Optional[str] = None

class Skills(BaseModel):
    frontend: List[str]
    tools: List[str]
    learning: List[str]

class SkillsUpdate(BaseModel):
    frontend: Optional[List[str]] = None
    tools: Optional[List[str]] = None
    learning: Optional[List[str]] = None

class Portfolio(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    personal: PersonalInfo
    skills: Skills
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PortfolioInDB(Portfolio):
    pass