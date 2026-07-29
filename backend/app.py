from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.predictor import get_features
from routes.prediction import router
from routes.shipments import router as shipment_router

app = FastAPI(
    title="ChainShield AI API",
    description="AI-powered Supply Chain Risk Prediction API",
    version="1.0.0"
)

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://chainshield-frontend.onrender.com",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to ChainShield AI Backend 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "Loaded",
        "features": len(get_features())
    }


app.include_router(router)
app.include_router(shipment_router)


@app.get("/features")
def features():
    return {
        "features": get_features()
    }