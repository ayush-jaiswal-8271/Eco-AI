import random
from typing import Dict, Any, List
from app.database.db import SEED_DASHBOARD, SEED_TRENDS, SEED_INSIGHTS

class AnalyticsService:
    @staticmethod
    def get_dashboard_summary() -> Dict[str, Any]:
        # Slight variation for live dynamic feel
        summary = dict(SEED_DASHBOARD)
        return summary

    @staticmethod
    def get_resource_trends(timeframe: str = "daily") -> List[Dict[str, Any]]:
        if timeframe in SEED_TRENDS:
            return SEED_TRENDS[timeframe]
        return SEED_TRENDS["daily"]

    @staticmethod
    def get_resource_stats(resource_type: str = "energy") -> Dict[str, Any]:
        stats_map = {
            "energy": {
                "total": 14850,
                "unit": "kWh",
                "change": -3.5,
                "average_daily": 2120,
                "peak_building": "Science Block B (38%)",
                "buildings": [
                    {"name": "Science Block B", "value": 5640, "percentage": 38.0},
                    {"name": "Central Library", "value": 3710, "percentage": 25.0},
                    {"name": "Admin Building", "value": 2970, "percentage": 20.0},
                    {"name": "Student Hostels", "value": 2530, "percentage": 17.0},
                ],
                "trends": [
                    {"label": "Mon", "value": 2100, "baseline": 2000},
                    {"label": "Tue", "value": 2250, "baseline": 2000},
                    {"label": "Wed", "value": 2180, "baseline": 2000},
                    {"label": "Thu", "value": 2400, "baseline": 2000},
                    {"label": "Fri", "value": 2320, "baseline": 2000},
                    {"label": "Sat", "value": 1600, "baseline": 1500},
                    {"label": "Sun", "value": 1400, "baseline": 1400},
                ]
            },
            "water": {
                "total": 42100,
                "unit": "Liters",
                "change": 2.1,
                "average_daily": 6014,
                "peak_building": "Student Hostels (44%)",
                "buildings": [
                    {"name": "Student Hostels", "value": 18524, "percentage": 44.0},
                    {"name": "Central Cafeteria", "value": 11788, "percentage": 28.0},
                    {"name": "Sports Complex", "value": 7578, "percentage": 18.0},
                    {"name": "Academic Blocks", "value": 4210, "percentage": 10.0},
                ],
                "trends": [
                    {"label": "Mon", "value": 5800, "baseline": 5500},
                    {"label": "Tue", "value": 6100, "baseline": 5500},
                    {"label": "Wed", "value": 5950, "baseline": 5500},
                    {"label": "Thu", "value": 6400, "baseline": 5500},
                    {"label": "Fri", "value": 6200, "baseline": 5500},
                    {"label": "Sat", "value": 4200, "baseline": 4000},
                    {"label": "Sun", "value": 3800, "baseline": 3800},
                ]
            },
            "waste": {
                "total": 1280,
                "unit": "kg",
                "change": -8.4,
                "average_daily": 182,
                "peak_building": "Central Cafeteria (52%)",
                "buildings": [
                    {"name": "Central Cafeteria", "value": 665, "percentage": 52.0},
                    {"name": "Student Hostels", "value": 320, "percentage": 25.0},
                    {"name": "Academic Blocks", "value": 192, "percentage": 15.0},
                    {"name": "Admin Building", "value": 103, "percentage": 8.0},
                ],
                "trends": [
                    {"label": "Mon", "value": 180, "baseline": 190},
                    {"label": "Tue", "value": 195, "baseline": 190},
                    {"label": "Wed", "value": 175, "baseline": 190},
                    {"label": "Thu", "value": 210, "baseline": 190},
                    {"label": "Fri", "value": 200, "baseline": 190},
                    {"label": "Sat", "value": 130, "baseline": 140},
                    {"label": "Sun", "value": 110, "baseline": 120},
                ]
            }
        }
        return stats_map.get(resource_type, stats_map["energy"])

    @staticmethod
    def run_ai_analysis() -> List[Dict[str, Any]]:
        # Simulate ML anomaly scan trigger
        return SEED_INSIGHTS
