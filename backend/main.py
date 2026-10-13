from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Shyam Meghval Portfolio",
    description="My personal portfolio backend API",
    version="1.0.0"
)

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Shyam Meghval's Portfolio!",
        "status": "Backend is running"
    }


@app.get("/api/profile")
def get_profile():
    return {
        "name": "Shyam Meghval",
        "role": "Python Developer",
        "skills": [
            "Python",
            "FastAPI",
            "PostgreSQL",
            "HTML",
            "CSS",
            "JavaScript",
            "Git",
            "GitHub"
        ],
        "projects": [
            "Project Management App",
            "Smart Monitoring Attendance System"
        ]
    }