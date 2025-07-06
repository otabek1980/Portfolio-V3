from fastapi import APIRouter, HTTPException
from typing import List
from models.portfolio import Portfolio, PersonalInfoUpdate, SkillsUpdate
from database.connection import portfolio_collection
from datetime import datetime

router = APIRouter()

@router.get("/portfolio", response_model=Portfolio)
async def get_portfolio():
    """Get portfolio data"""
    try:
        portfolio = await portfolio_collection.find_one({"id": "default-portfolio"})
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        
        # Remove MongoDB _id field
        portfolio.pop("_id", None)
        return portfolio
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/portfolio/personal")
async def update_personal_info(personal_info: PersonalInfoUpdate):
    """Update personal information"""
    try:
        # Get current portfolio
        portfolio = await portfolio_collection.find_one({"id": "default-portfolio"})
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        
        # Update only provided fields
        update_data = {}
        for field, value in personal_info.dict(exclude_unset=True).items():
            if value is not None:
                update_data[f"personal.{field}"] = value
        
        update_data["updated_at"] = datetime.utcnow()
        
        # Update in database
        result = await portfolio_collection.update_one(
            {"id": "default-portfolio"},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=400, detail="No changes made")
        
        return {"message": "Personal information updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/portfolio/skills")
async def update_skills(skills: SkillsUpdate):
    """Update skills information"""
    try:
        # Get current portfolio
        portfolio = await portfolio_collection.find_one({"id": "default-portfolio"})
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        
        # Update only provided fields
        update_data = {}
        for field, value in skills.dict(exclude_unset=True).items():
            if value is not None:
                update_data[f"skills.{field}"] = value
        
        update_data["updated_at"] = datetime.utcnow()
        
        # Update in database
        result = await portfolio_collection.update_one(
            {"id": "default-portfolio"},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=400, detail="No changes made")
        
        return {"message": "Skills updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))