import os
import pandas as pd

from services.predictor import predict_row, get_features

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

DATASET = os.path.join(
    BASE_DIR,
    "data",
    "DataCoSupplyChainDataset.csv"
)


def get_shipments(limit=50):
    df = pd.read_csv(DATASET, encoding="latin1")

    feature_names = get_features()

    shipments = []

    for _, row in df.head(limit).iterrows():

        ai = predict_row(row)

        # Build the feature dictionary required by the ML model
        features = {}

        for feature in feature_names:
            features[feature] = row[feature]

        shipments.append({
            "Order Id": row["Order Id"],
            "Customer City": row["Customer City"],
            "Customer Country": row["Customer Country"],
            "Order Region": row["Order Region"],
            "Shipping Mode": row["Shipping Mode"],
            "Order Status": row["Order Status"],

            # Existing extra fields
            "Sales": float(row["Sales"]),
            "Order Date": row["order date (DateOrders)"],
            "Shipping Date": row["shipping date (DateOrders)"],
            "Late Delivery Risk": int(row["Late_delivery_risk"]),

            # AI Prediction
            "AI Risk": ai["risk"],
            "Confidence": ai["confidence"],
            "Prediction": ai["prediction"],

            # All model features for Prediction page
            "features": features,
        })

    return shipments