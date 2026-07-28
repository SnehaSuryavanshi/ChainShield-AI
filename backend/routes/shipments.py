from fastapi import APIRouter
from services.shipment_service import get_shipments

router = APIRouter()


@router.get("/shipments")
def shipments():
    return get_shipments()