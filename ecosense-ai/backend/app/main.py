from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router

app = FastAPI(
    title="EcoSense AI Backend API",
    description="Campus Sustainability Telemetry & AI Intelligence Engine",
    version="1.0.0"
)

# CORS Middleware to allow React frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows Vite dev server & production origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/")
def root():
    return {
        "app": "EcoSense AI Backend API",
        "docs": "/docs",
        "status": "running"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
