from fastapi import APIRouter
from pydantic import BaseModel
from services.predictor import predict
from services.shipment_service import get_shipments

router = APIRouter()


class PredictionRequest(BaseModel):
    data: dict


@router.post("/predict")
def predict_route(request: PredictionRequest):
    return predict(request.data)

@router.get("/shipments")
def shipments():
    return get_shipments()