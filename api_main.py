from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend_core import ask_gita


app = FastAPI(title="Bhagavad Gita RAG API")

# Allow frontend to call this API (Vite may use 5173, 8080, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173",
        "http://localhost:3000", "http://127.0.0.1:3000",
        "http://localhost:8080", "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AskRequest(BaseModel):
    query: str


class AskResponse(BaseModel):
    answer: str


@app.post("/api/ask-gita", response_model=AskResponse)
async def ask_gita_endpoint(payload: AskRequest) -> AskResponse:
    """
    HTTP endpoint used by the frontend.
    Takes a user query and returns the generated answer text.
    """
    try:
        result = ask_gita(payload.query)
        return AskResponse(**result)
    except Exception as e:
        err_str = str(e).lower()
        if "403" in err_str or "permission_denied" in err_str or "api key was reported as leaked" in err_str:
            raise HTTPException(
                status_code=401,
                detail="Gemini API key is invalid/blocked. Update GOOGLE_API_KEY in .env and restart backend.",
            )
        if "429" in err_str or "resource_exhausted" in err_str or "quota" in err_str:
            raise HTTPException(
                status_code=503,
                detail="Gemini API rate limit reached. Please try again in a few minutes or check your API quota.",
            )
        if "503" in err_str or "unavailable" in err_str or "high demand" in err_str:
            raise HTTPException(
                status_code=503,
                detail="Gemini model is temporarily overloaded. Please retry in a few seconds.",
            )
        raise

