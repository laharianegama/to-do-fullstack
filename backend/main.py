from fastapi import FastAPI
from  backend.database import engine, Base
from backend.routes.todo import router as todos
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Allow all headers
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include Routes
app.include_router(todos)

@app.get("/")
def home():
    return {"message": "Welcome to the To-Do API"}
