from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    technologies: List[str]
    github: str
    live: str
    status: str  # "Completed", "In Progress", "Planning"
    image: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    technologies: List[str]
    github: str
    live: str
    status: str = "In Progress"
    image: Optional[str] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[List[str]] = None
    github: Optional[str] = None
    live: Optional[str] = None
    status: Optional[str] = None
    image: Optional[str] = None

class ProjectInDB(Project):
    pass