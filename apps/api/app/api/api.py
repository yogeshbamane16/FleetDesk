from fastapi import APIRouter
from app.api.endpoints import shipments, drivers, dashboard

api_router = APIRouter()
api_router.include_router(shipments.router, prefix="/shipments", tags=["shipments"])
api_router.include_router(drivers.router, prefix="/drivers", tags=["drivers"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
