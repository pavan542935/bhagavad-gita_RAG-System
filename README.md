# Dharma Insight — Bhagavad Gita RAG Assistant

A production-style Retrieval-Augmented Generation (RAG) project that answers user questions and real-life situations using Bhagavad Gita verses only, with structured guidance and verse citations.

---

## Features

- Bhagavad Gita-only answers (context-grounded)
- Verse-aware retrieval with chapter + verse metadata
- Structured response format:
  - Direct Answer
  - Relevant Bhagavad Gita Verses
  - Sanskrit
  - English Translation
  - Explanation
  - Life Application
- FAISS vector store for semantic retrieval
- Gemini model integration (primary + fallback model support)
- FastAPI backend with CORS enabled for frontend integration
- React/Vite frontend for user-friendly chat experience

---

## Tech Stack

### Backend
- Python
- FastAPI
- LangChain
- FAISS
- sentence-transformers
- Google Gemini (langchain-google-genai)

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS

---

## Project Structure

```
rag_project/
│
├── api_main.py
├── backend_core.py
├── rag_pipeline.py
├── main.py
├── .env
├── requirements.txt
│
├── vector_db/
├── data/
│   └── gita/
│       └── dataset/
│           └── chapter_*.json
│
└── fentend/
    └── dharma-insight-tool-main/
        ├── src/
        └── index.html
```

---

## Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd rag_project
```

### 2. Create Virtual Environment
```bash
python -m venv .venv
.venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create `.env` file:

```env
GOOGLE_API_KEY=your_gemini_api_key
GEMINI_PRIMARY_MODEL=models/gemini-2.5-flash
GEMINI_FALLBACK_MODEL=models/gemini-1.5-flash
```

---

## Running the Project

### Backend

```bash
uvicorn api_main:app --reload --port 8000
```

API Docs:  
http://127.0.0.1:8000/docs  

Endpoint:
`POST /api/ask-gita`

Example:
```json
{
  "query": "I failed my exam and feel hopeless. What does Gita teach?"
}
```

---

### Frontend

```bash
cd fentend/dharma-insight-tool-main
npm install
npm run dev
```

Open:
http://localhost:8080

---

## How It Works

1. Load Gita chapter JSON files
2. Convert verses to LangChain Documents with metadata
3. Build/load FAISS vector DB
4. Retrieve top-k relevant verses
5. Send prompt + context to Gemini
6. Return structured answer

---

## Output Format

- Direct Answer
- Relevant Bhagavad Gita Verses
- Chapter, Verse, Speaker
- Sanskrit
- English Translation
- Explanation
- Life Application

---

## Error Handling

- 401 → Invalid API key
- 503 → Rate limit / high demand

Fallback model is used automatically.

---

## Notes

- Grounded strictly in Bhagavad Gita context
- For educational/spiritual guidance only
- Do not commit `.env` file

---

## Roadmap

- Verse citation cards
- Multi-commentary mode
- Life-situation classifier
- User authentication
- Deployment

---

## Author

Pavan  
Dharma Insight Project
