import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'app'))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_all_endpoints():
    print("--- Testing EcoSense AI Backend Endpoints ---")
    
    # 1. Root
    res = client.get("/")
    assert res.status_code == 200, f"Root failed: {res.text}"
    print("[PASS] GET / ->", res.json()["app"])

    # 2. Info
    res = client.get("/api/info")
    assert res.status_code == 200, f"Info failed: {res.text}"
    print("[PASS] GET /api/info ->", res.json()["name"])

    # 3. Dashboard summary
    res = client.get("/api/dashboard/summary")
    assert res.status_code == 200, f"Dashboard summary failed: {res.text}"
    data = res.json()
    assert "sustainability_score" in data, "Missing sustainability_score"
    print("[PASS] GET /api/dashboard/summary -> Score:", data["sustainability_score"])

    # 4. Resource trends
    res = client.get("/api/resource/trends?timeframe=daily")
    assert res.status_code == 200, f"Resource trends failed: {res.text}"
    print("[PASS] GET /api/resource/trends -> Trends count:", len(res.json()))

    # 5. Resource stats
    res = client.get("/api/resource/stats?resource_type=energy")
    assert res.status_code == 200, f"Resource stats failed: {res.text}"
    print("[PASS] GET /api/resource/stats -> Energy stats present")

    # 6. Insights
    res = client.get("/api/insights")
    assert res.status_code == 200, f"Insights failed: {res.text}"
    print("[PASS] GET /api/insights -> Insights count:", len(res.json()))

    # 7. AI Analysis run
    res = client.post("/api/insights/run-analysis")
    assert res.status_code == 200, f"Run analysis failed: {res.text}"
    print("[PASS] POST /api/insights/run-analysis -> Returned new insights:", len(res.json()))

    # 8. Waste scan
    res = client.post("/api/waste/classify")
    assert res.status_code == 200, f"Waste classify failed: {res.text}"
    print("[PASS] POST /api/waste/classify -> Item detected:", res.json()["item_name"])

    # 9. Waste scan history
    res = client.get("/api/waste/history")
    assert res.status_code == 200, f"Waste history failed: {res.text}"
    print("[PASS] GET /api/waste/history -> Count:", len(res.json()))

    # 10. Chat copilot
    res = client.post("/api/chat", json={"message": "How can we reduce energy consumption?"})
    assert res.status_code == 200, f"Chat failed: {res.text}"
    print("[PASS] POST /api/chat -> Response length:", len(res.json()["reply"]))

    # 11. Recommendations
    res = client.get("/api/recommendations")
    assert res.status_code == 200, f"Recommendations failed: {res.text}"
    print("[PASS] GET /api/recommendations -> Count:", len(res.json()))

    # 12. Report generation
    res = client.get("/api/reports/generate?timeframe=monthly")
    assert res.status_code == 200, f"Report generation failed: {res.text}"
    print("[PASS] GET /api/reports/generate -> Footprint:", res.json()["summary"]["carbon_footprint_tons"])

    print("\nALL BACKEND ENDPOINTS PASSED INTERACTION TEST SUCCESSFULLY!")

if __name__ == "__main__":
    test_all_endpoints()
