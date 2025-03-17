from fastapi import FastAPI
from  backend.database import engine, Base
from backend.routes.todo import router as todos

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Include Routes
app.include_router(todos)

@app.get("/")
def home():
    return {"message": "Welcome to the To-Do API"}
