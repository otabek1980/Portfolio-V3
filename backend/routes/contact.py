from fastapi import APIRouter, HTTPException
from typing import List
from models.contact import ContactMessage, ContactMessageCreate, ContactMessageUpdate
from database.connection import contacts_collection
from datetime import datetime
import uuid

router = APIRouter()

@router.post("/contact", response_model=ContactMessage)
async def submit_contact_form(contact_data: ContactMessageCreate):
    """Submit a contact form"""
    try:
        # Create contact message
        new_message = ContactMessage(
            id=str(uuid.uuid4()),
            **contact_data.dict(),
            is_read=False,
            created_at=datetime.utcnow()
        )
        
        # Insert into database
        result = await contacts_collection.insert_one(new_message.dict())
        
        if not result.inserted_id:
            raise HTTPException(status_code=400, detail="Failed to submit contact form")
        
        return new_message
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (admin only)"""
    try:
        messages = await contacts_collection.find().sort("created_at", -1).to_list(100)
        # Remove MongoDB _id field from each message
        for message in messages:
            message.pop("_id", None)
        return messages
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/contact/{message_id}", response_model=ContactMessage)
async def get_contact_message(message_id: str):
    """Get a specific contact message"""
    try:
        message = await contacts_collection.find_one({"id": message_id})
        if not message:
            raise HTTPException(status_code=404, detail="Message not found")
        
        message.pop("_id", None)
        return message
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/contact/{message_id}")
async def update_contact_message(message_id: str, message_update: ContactMessageUpdate):
    """Update a contact message (e.g., mark as read)"""
    try:
        # Check if message exists
        existing_message = await contacts_collection.find_one({"id": message_id})
        if not existing_message:
            raise HTTPException(status_code=404, detail="Message not found")
        
        # Update only provided fields
        update_data = {}
        for field, value in message_update.dict(exclude_unset=True).items():
            if value is not None:
                update_data[field] = value
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No fields to update")
        
        # Update in database
        result = await contacts_collection.update_one(
            {"id": message_id},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=400, detail="No changes made")
        
        return {"message": "Contact message updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/contact/{message_id}")
async def delete_contact_message(message_id: str):
    """Delete a contact message"""
    try:
        # Check if message exists
        existing_message = await contacts_collection.find_one({"id": message_id})
        if not existing_message:
            raise HTTPException(status_code=404, detail="Message not found")
        
        # Delete from database
        result = await contacts_collection.delete_one({"id": message_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=400, detail="Failed to delete message")
        
        return {"message": "Contact message deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/contact/unread/count")
async def get_unread_count():
    """Get count of unread messages"""
    try:
        count = await contacts_collection.count_documents({"is_read": False})
        return {"unread_count": count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))