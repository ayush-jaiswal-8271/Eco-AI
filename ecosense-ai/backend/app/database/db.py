import datetime
from typing import List, Dict, Any

# Initial seed data for EcoSense AI

SEED_DASHBOARD = {
    "sustainability_score": 78.4,
    "score_change": 4.2,
    "energy_kwh": 14850,
    "energy_change": -3.5,
    "water_liters": 42100,
    "water_change": 2.1,
    "waste_kg": 1280,
    "waste_change": -8.4,
    "is_demo": False
}

SEED_TRENDS = {
    "hourly": [
        {"timestamp": "00:00", "energy": 420, "water": 1100, "waste": 30},
        {"timestamp": "04:00", "energy": 380, "water": 950, "waste": 20},
        {"timestamp": "08:00", "energy": 850, "water": 2800, "waste": 150},
        {"timestamp": "12:00", "energy": 1250, "water": 4100, "waste": 310},
        {"timestamp": "16:00", "energy": 1100, "water": 3600, "waste": 250},
        {"timestamp": "20:00", "energy": 650, "water": 1800, "waste": 90}
    ],
    "daily": [
        {"timestamp": "Mon", "energy": 2100, "water": 5800, "waste": 180},
        {"timestamp": "Tue", "energy": 2250, "water": 6100, "waste": 195},
        {"timestamp": "Wed", "energy": 2180, "water": 5950, "waste": 175},
        {"timestamp": "Thu", "energy": 2400, "water": 6400, "waste": 210},
        {"timestamp": "Fri", "energy": 2320, "water": 6200, "waste": 200},
        {"timestamp": "Sat", "energy": 1600, "water": 4200, "waste": 130},
        {"timestamp": "Sun", "energy": 1400, "water": 3800, "waste": 110}
    ],
    "monthly": [
        {"timestamp": "Week 1", "energy": 14200, "water": 41000, "waste": 1250},
        {"timestamp": "Week 2", "energy": 14850, "water": 42100, "waste": 1280},
        {"timestamp": "Week 3", "energy": 13900, "water": 39800, "waste": 1190},
        {"timestamp": "Week 4", "energy": 14100, "water": 40500, "waste": 1210}
    ]
}

SEED_INSIGHTS = [
    {
        "id": "ins-01",
        "title": "HVAC Over-Cooling Anomaly in Science Block B",
        "category": "energy",
        "severity": "critical",
        "building": "Science Block B",
        "detected_at": "2026-09-21T08:30:00Z",
        "anomaly_score": 3.4,
        "description": "Baseline energy consumption spiked by 42% above 7-day moving average between 02:00 AM and 06:00 AM.",
        "evidence": "Chiller unit #3 running continuously at 100% capacity overnight despite 0% occupancy.",
        "recommendation": "Calibrate night setback schedules and inspect thermostat relay switches in Block B.",
        "potential_savings": "$450/month (1,800 kWh)"
    },
    {
        "id": "ins-02",
        "title": "Continuous Flow Water Leakage at Student Hostel C",
        "category": "water",
        "severity": "high",
        "building": "Student Hostel C",
        "detected_at": "2026-09-21T05:15:00Z",
        "anomaly_score": 2.8,
        "description": "Constant baseline flow of 8.5 L/min detected during non-peak hours (01:00 AM - 04:00 AM).",
        "evidence": "Flow sensor #HS-04 registered zero zero-flow intervals over 6 consecutive hours.",
        "recommendation": "Dispatch plumbing team to inspect ground floor flush valves and main line couplings.",
        "potential_savings": "3,600 Liters/day ($280/month)"
    },
    {
        "id": "ins-03",
        "title": "High Organic Waste Contamination in Cafeteria Bin #2",
        "category": "waste",
        "severity": "medium",
        "building": "Central Cafeteria",
        "detected_at": "2026-09-20T14:20:00Z",
        "anomaly_score": 2.1,
        "description": "Recyclable plastic bins contain >35% food waste contamination based on smart scanner audits.",
        "evidence": "Optical scan audit flagged non-conforming items in blue recycling stream.",
        "recommendation": "Deploy clear dual-segregation signage and conduct lunch-hour volunteer awareness.",
        "potential_savings": "150 kg diverted from landfill/week"
    },
    {
        "id": "ins-04",
        "title": "Library Roof Solar PV Sub-Optimal Generation",
        "category": "energy",
        "severity": "low",
        "building": "Central Library",
        "detected_at": "2026-09-19T11:00:00Z",
        "anomaly_score": 1.6,
        "description": "Solar output is 12% below clear-sky theoretical output model.",
        "evidence": "Dust accumulation index on array String 4 reached cleaning threshold.",
        "recommendation": "Schedule bi-monthly robotic solar panel cleaning routine.",
        "potential_savings": "+350 kWh clean generation/month"
    }
]

SEED_RECOMMENDATIONS = [
    {
        "id": "rec-01",
        "title": "Campus-Wide Smart Motion-Sensor LED Retrofit",
        "category": "energy",
        "description": "Replace remaining fluorescent lighting in hallways and classrooms with smart dimmable LED fixtures.",
        "estimated_cost_usd": 12500,
        "payback_months": 14,
        "co2_reduction_tons": 28.5,
        "roi_percentage": 85.0,
        "impact_level": "high",
        "status": "proposed"
    },
    {
        "id": "rec-02",
        "title": "Rainwater Harvesting & Filtration Grid for Hostel C & D",
        "category": "water",
        "description": "Install rooftop catchment channels and secondary filtration for non-potable toilet flushing and gardening.",
        "estimated_cost_usd": 18000,
        "payback_months": 22,
        "co2_reduction_tons": 12.0,
        "roi_percentage": 54.0,
        "impact_level": "high",
        "status": "in-review"
    },
    {
        "id": "rec-03",
        "title": "On-Campus Organic Waste Biodigester Unit",
        "category": "waste",
        "description": "Convert food waste from cafeteria into biogas and organic fertilizer, eliminating off-site transport fees.",
        "estimated_cost_usd": 9500,
        "payback_months": 18,
        "co2_reduction_tons": 19.4,
        "roi_percentage": 66.0,
        "impact_level": "medium",
        "status": "approved"
    }
]

SEED_WASTE_HISTORY = [
    {
        "id": "wlog-101",
        "item_name": "PET Beverage Bottle",
        "category": "plastic",
        "confidence": 0.94,
        "disposal_instructions": "Rinse remaining liquid, crush bottle, and place in Blue Recycling Bin.",
        "co2_saved_kg": 0.08,
        "timestamp": "2026-09-21T11:30:00Z"
    },
    {
        "id": "wlog-102",
        "item_name": "Cardboard Shipping Box",
        "category": "paper",
        "confidence": 0.98,
        "disposal_instructions": "Flatten box completely and deposit in Yellow Paper & Cardboard Container.",
        "co2_saved_kg": 0.25,
        "timestamp": "2026-09-21T10:15:00Z"
    },
    {
        "id": "wlog-103",
        "item_name": "Banana Peel & Apple Core",
        "category": "organic",
        "confidence": 0.96,
        "disposal_instructions": "Dispose in Green Compost / Biodegradable Bin for campus composting.",
        "co2_saved_kg": 0.12,
        "timestamp": "2026-09-21T09:40:00Z"
    }
]
