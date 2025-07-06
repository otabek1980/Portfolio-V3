import os
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
portfolio_collection = db.portfolio
projects_collection = db.projects
contacts_collection = db.contacts

async def init_db():
    """Initialize database with default data if empty"""
    
    # Check if portfolio exists
    existing_portfolio = await portfolio_collection.find_one()
    if not existing_portfolio:
        # Create default portfolio data
        default_portfolio = {
            "id": "default-portfolio",
            "personal": {
                "name": "Xodjayev Otabek",
                "title": "Front-End Developer",
                "bio": "2 yillik tajribaga ega Front-End dasturchi. Informatika olimpiadasida faxrli 3-o'rinni egallagan. Zamonaviy web texnologiyalar bilan ishlash va foydalanuvchi tajribasini yaxshilashga ixtisoslashgan.",
                "birth_date": "2007.09.05",
                "experience": "2 years",
                "achievement": "Maktab informatika olimpiadasida 3-o'rin",
                "phone": "919126611",
                "email": "devuzkhodjayev@gmail.com",
                "github": "https://github.com/otabek1980",
                "instagram": "https://www.instagram.com/webbuilduz/",
                "telegram": "https://t.me/Sentabr052007",
                "telegram_channel": "https://t.me/Webbuild",
                "location": "Uzbekistan"
            },
            "skills": {
                "frontend": ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Bootstrap"],
                "tools": ["Git", "GitHub", "VS Code", "Figma", "Photoshop"],
                "learning": ["Node.js", "TypeScript", "Next.js", "Vue.js"]
            },
            "created_at": "2024-01-01T00:00:00Z",
            "updated_at": "2024-01-01T00:00:00Z"
        }
        await portfolio_collection.insert_one(default_portfolio)
    
    # Check if projects exist
    existing_projects = await projects_collection.count_documents({})
    if existing_projects == 0:
        # Create default projects
        default_projects = [
            {
                "id": "project-1",
                "title": "E-commerce Website",
                "description": "Zamonaviy e-commerce platformasi React va Tailwind CSS bilan yaratilgan",
                "technologies": ["React", "Tailwind CSS", "JavaScript"],
                "github": "https://github.com/otabek1980/ecommerce-project",
                "live": "https://ecommerce-demo.com",
                "status": "Completed",
                "image": None,
                "created_at": "2024-01-01T00:00:00Z",
                "updated_at": "2024-01-01T00:00:00Z"
            },
            {
                "id": "project-2",
                "title": "Portfolio Website",
                "description": "Responsive portfolio website with modern animations",
                "technologies": ["HTML5", "CSS3", "JavaScript"],
                "github": "https://github.com/otabek1980/portfolio-v1",
                "live": "https://portfolio-demo.com",
                "status": "Completed",
                "image": None,
                "created_at": "2024-01-01T00:00:00Z",
                "updated_at": "2024-01-01T00:00:00Z"
            },
            {
                "id": "project-3",
                "title": "Task Management App",
                "description": "React asosida yaratilgan vazifalarni boshqarish ilovasi",
                "technologies": ["React", "Context API", "CSS3"],
                "github": "https://github.com/otabek1980/task-manager",
                "live": "https://task-manager-demo.com",
                "status": "In Progress",
                "image": None,
                "created_at": "2024-01-01T00:00:00Z",
                "updated_at": "2024-01-01T00:00:00Z"
            }
        ]
        await projects_collection.insert_many(default_projects)

async def close_db():
    """Close database connection"""
    client.close()