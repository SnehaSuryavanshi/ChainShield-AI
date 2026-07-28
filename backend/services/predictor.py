import os
import joblib
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "model", "chainshield_model.pkl")
FEATURE_PATH = os.path.join(BASE_DIR, "model", "feature_names.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "model", "label_encoders.pkl")

model = joblib.load(MODEL_PATH)
feature_names = joblib.load(FEATURE_PATH)
label_encoders = joblib.load(ENCODER_PATH)


def get_features():
    return feature_names


def encode_input(df):
    """
    Encode categorical columns using the same encoders
    used while training the model.
    """
    for column, encoder in label_encoders.items():

        if column not in df.columns:
            continue

        value = str(df.at[0, column])

        if value in encoder.classes_:
            df[column] = encoder.transform([value])

        else:
            # Unknown category
            df[column] = -1

    return df


def predict(data: dict):

    df = pd.DataFrame([data])

    df = encode_input(df)

    df = df[feature_names]

    prediction = int(model.predict(df)[0])

    probability = float(max(model.predict_proba(df)[0]))

    confidence = round(probability * 100, 2)

    if prediction == 1:
        if confidence >= 85:
            risk = "High"
        else:
            risk = "Medium"
    else:
        if confidence >= 85:
            risk = "Low"
        else:
            risk = "Medium"

    return {
        "prediction": prediction,
        "probability": probability,
        "confidence": confidence,
        "risk": risk,
    }


def predict_row(row):
    """
    Predict directly from one shipment row.
    """

    data = {}

    for feature in feature_names:
        data[feature] = row[feature]

    result = predict(data)

    return {
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "risk": result["risk"],
    }