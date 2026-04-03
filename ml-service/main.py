from fastapi import FastAPI
import random

app = FastAPI()

@app.get("/")
def health_check():
    return {"status": "ML Service Active"}

@app.get("/calculate-premium")
def calculate_premium(zone: str, rain_probability: int, traffic_index: int):
    # Generative Interpretable Logic (Mocked for MVP)
    base_premium = 150 # Base weekly premium in INR
    
    # Dynamic Risk Profiling
    risk_multiplier = 1.0
    if rain_probability > 70:
        risk_multiplier += 0.3
    if traffic_index > 80:
        risk_multiplier += 0.2
        
    final_premium = round(base_premium * risk_multiplier, 2)
    
    return {
        "zone": zone,
        "base_premium": base_premium,
        "risk_multiplier": risk_multiplier,
        "final_weekly_premium": final_premium,
        "interpretation": f"High risk due to {rain_probability}% rain chance and traffic index {traffic_index}" if risk_multiplier > 1.0 else "Normal risk parameters."
    }