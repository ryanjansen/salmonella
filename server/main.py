from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import sys 
import os
sys.path.append(os.path.abspath("./scenes"))
from scene import SquareToCircle

app = FastAPI()

app.mount("/static",  StaticFiles(directory="static"), name="static")

@app.get("/circle/{color}")
async def create_circle(color):
  SquareToCircle().render()
  return { "src": "http://localhost:8000/static/videos/scene/480p15/CreateCircle.mp4"}