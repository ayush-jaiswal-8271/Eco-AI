import datetime
from fastapi import APIRouter, UploadFile, File, Form, Query
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from app.services.analytics import AnalyticsService
from app.services.waste_ai import WasteAIService
from app.services.copilot import EcoBotCopilot
from app.database.db import SEED_INSIGHTS, SEED_RECOMMENDATIONS

router = APIRouter(prefix="/api")

class ChatRequest(BaseModel):
    message: str

@router.get("/dashboard/summary")
def get_dashboard_summary():
    return AnalyticsService.get_dashboard_summary()

@router.get("/resource/trends")
def get_resource_trends(timeframe: str = Query("daily")):
    return AnalyticsService.get_resource_trends(timeframe)

@router.get("/insights")
def get_insights(category: Optional[str] = None):
    insights = SEED_INSIGHTS
    if category and category != "all":
        insights = [i for i in insights if i["category"] == category]
    return insights

@router.post("/insights/run-analysis")
def run_ai_analysis():
    return AnalyticsService.run_ai_analysis()

@router.get("/resource/stats")
def get_resource_stats(resource_type: str = Query("energy")):
    return AnalyticsService.get_resource_stats(resource_type)

@router.post("/waste/classify")
async def classify_waste(file: Optional[UploadFile] = File(None)):
    filename = file.filename if file else None
    content = await file.read() if file else None
    return WasteAIService.classify_image(filename=filename, file_bytes=content)

@router.get("/waste/history")
def get_waste_history():
    return WasteAIService.get_history()

@router.post("/chat")
def chat_with_ecobot(req: ChatRequest):
    return EcoBotCopilot.process_query(req.message)

@router.get("/recommendations")
def get_recommendations():
    return SEED_RECOMMENDATIONS

@router.get("/reports/generate")
def generate_report(timeframe: str = Query("monthly")):
    summary = AnalyticsService.get_dashboard_summary()
    total_energy = summary["energy_kwh"] * (1 if timeframe == "monthly" else 3 if timeframe == "quarterly" else 12)
    total_water = summary["water_liters"] * (1 if timeframe == "monthly" else 3 if timeframe == "quarterly" else 12)
    total_waste = summary["waste_kg"] * (1 if timeframe == "monthly" else 3 if timeframe == "quarterly" else 12)
    carbon = round(total_energy * 0.00075 + total_water * 0.0001, 1)

    return {
        "period": timeframe,
        "generated_at": datetime.datetime.utcnow().isoformat() + "Z",
        "summary": {
            "total_energy_kwh": total_energy,
            "total_water_liters": total_water,
            "total_waste_kg": total_waste,
            "carbon_footprint_tons": carbon,
            "sustainability_score": summary["sustainability_score"]
        },
        "is_demo": False
    }

@router.get("/info")
def get_info():
    return {
        "name": "EcoSense AI",
        "version": "1.0.0-MVP",
        "status": "online",
        "ai_module_status": "active",
        "collaborators": [
            "1M1B (1 Million 1 Billion)",
            "IBM SkillsBuild",
            "AICTE"
        ]
    }
