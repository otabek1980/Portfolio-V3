from fastapi import APIRouter, HTTPException
from typing import List
from models.project import Project, ProjectCreate, ProjectUpdate
from database.connection import projects_collection
from datetime import datetime
import uuid

router = APIRouter()

@router.get("/projects", response_model=List[Project])
async def get_projects():
    """Get all projects"""
    try:
        projects = await projects_collection.find().to_list(100)
        # Remove MongoDB _id field from each project
        for project in projects:
            project.pop("_id", None)
        return projects
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get a specific project by ID"""
    try:
        project = await projects_collection.find_one({"id": project_id})
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        project.pop("_id", None)
        return project
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate):
    """Create a new project"""
    try:
        # Create project with generated ID
        new_project = Project(
            id=str(uuid.uuid4()),
            **project.dict(),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        # Insert into database
        result = await projects_collection.insert_one(new_project.dict())
        
        if not result.inserted_id:
            raise HTTPException(status_code=400, detail="Failed to create project")
        
        return new_project
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project_update: ProjectUpdate):
    """Update a project"""
    try:
        # Check if project exists
        existing_project = await projects_collection.find_one({"id": project_id})
        if not existing_project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        # Update only provided fields
        update_data = {}
        for field, value in project_update.dict(exclude_unset=True).items():
            if value is not None:
                update_data[field] = value
        
        update_data["updated_at"] = datetime.utcnow()
        
        # Update in database
        result = await projects_collection.update_one(
            {"id": project_id},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=400, detail="No changes made")
        
        # Get updated project
        updated_project = await projects_collection.find_one({"id": project_id})
        updated_project.pop("_id", None)
        return updated_project
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    """Delete a project"""
    try:
        # Check if project exists
        existing_project = await projects_collection.find_one({"id": project_id})
        if not existing_project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        # Delete from database
        result = await projects_collection.delete_one({"id": project_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=400, detail="Failed to delete project")
        
        return {"message": "Project deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/projects/filter/{status}", response_model=List[Project])
async def get_projects_by_status(status: str):
    """Get projects filtered by status"""
    try:
        projects = await projects_collection.find({"status": status}).to_list(100)
        # Remove MongoDB _id field from each project
        for project in projects:
            project.pop("_id", None)
        return projects
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))