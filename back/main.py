from typing import Union
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from training.summarization import summarization_model

app = FastAPI()

# Configurer CORS
origins = [
    "http://localhost:3000",  # URL de ton frontend Next.js en développement
    "http://127.0.0.1:3000",  # Alternative
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Autoriser uniquement ces origines
    allow_credentials=True,
    allow_methods=["*"],  # Permettre toutes les méthodes HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permettre tous les en-têtes
)

class TextRequest(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post('/api/summarization')
def summarization(request: TextRequest):
    try:
        text = request.text
        
        # Générer le résumé
        summary = summarization_model(text)

        # Retourner le résumé en tant que réponse JSON
        return {"summary": summary}

    except Exception as e:
        print(f"Erreur: {e}")
        raise HTTPException(status_code=500, detail=f"Une erreur est survenue : {str(e)}")
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)