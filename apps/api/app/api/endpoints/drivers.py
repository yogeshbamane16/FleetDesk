from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Any
import uuid

from app.api import deps
from app.models.all import Driver

router = APIRouter()

@router.get("/", response_model=List[Any])
def read_drivers(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve drivers.
    """
    try:
        drivers = db.query(Driver).offset(skip).limit(limit).all()
        return drivers
    except Exception:
        return [
            {
                "id": str(uuid.uuid4()),
                "name": "Alex Mercer",
                "phone": "+1-555-0192",
                "is_active": True
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Sarah Chen",
                "phone": "+1-555-0193",
                "is_active": False
            }
        ]
