from fastapi import FastAPI
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from pathlib import Path
import logging

# Import routes
from routes.portfolio import router as portfolio_router
from routes.projects import router as projects_router
from routes.contact import router as contact_router

# Import database connection
from database.connection import init_db, close_db

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(title="Portfolio API", description="API for Otabek's Portfolio Website")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with /api prefix
app.include_router(portfolio_router, prefix="/api")
app.include_router(projects_router, prefix="/api")
app.include_router(contact_router, prefix="/api")

# Root endpoint
@app.get("/api/")
async def root():
    return {"message": "Portfolio API is running!"}

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Portfolio API is running successfully"}

# Startup event
@app.on_event("startup")
async def startup_event():
    await init_db()
    logging.info("Database initialized")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    await close_db()
    logging.info("Database connection closed")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)