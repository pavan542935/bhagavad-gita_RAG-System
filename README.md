🕉️ Dharma Insight — Bhagavad Gita RAG Assistant

A production-style Retrieval-Augmented Generation (RAG) project that answers user questions and real-life situations using Bhagavad Gita verses only, with structured guidance and verse citations.

✨ Features
📖 Bhagavad Gita-only answers (context-grounded)
🔍 Verse-aware retrieval with chapter + verse metadata
🧠 Structured response format:
Direct Answer
Relevant Bhagavad Gita Verses
Sanskrit
English Translation
Explanation
Life Application
⚡ FAISS vector store for semantic retrieval
🤖 Gemini model integration (primary + fallback model support)
🚀 FastAPI backend with CORS enabled for frontend integration
💻 React/Vite frontend for user-friendly chat experience
🛠️ Tech Stack
🔹 Backend
Python
FastAPI
LangChain
FAISS
sentence-transformers
Google Gemini (langchain-google-genai)
🔹 Frontend
React + TypeScript
Vite
Tailwind CSS (UI styling)
📁 Project Structure
rag_project/
│
├── api_main.py                  # FastAPI API endpoints
├── backend_core.py              # Core RAG logic (retrieve + prompt + LLM call)
├── rag_pipeline.py              # Data loading + vectorstore creation/loading
├── main.py                      # CLI mode
├── .env                         # API keys and model config
├── requirements.txt
│
├── vector_db/                   # Persisted FAISS index
├── data/
│   └── gita/
│       └── dataset/
│           └── chapter_*.json   # Bhagavad Gita dataset
│
└── fentend/
    └── dharma-insight-tool-main/
        ├── src/
        └── index.html
⚙️ Setup Instructions
1️⃣ Clone Repository
git clone <your-repo-url>
cd rag_project
2️⃣ Create Virtual Environment
python -m venv .venv
.venv\Scripts\activate   # Windows
3️⃣ Install Dependencies
pip install -r requirements.txt
4️⃣ Configure Environment Variables

Create/update .env in project root:

GOOGLE_API_KEY=your_gemini_api_key
GEMINI_PRIMARY_MODEL=models/gemini-2.5-flash
GEMINI_FALLBACK_MODEL=models/gemini-1.5-flash

⚠️ If your key is blocked/leaked, generate a new key and restart backend.

▶️ Running the Project
🔹 Backend (FastAPI)

From project root:

uvicorn api_main:app --reload --port 8000
API Docs:
👉 http://127.0.0.1:8000/docs
Main Endpoint:
POST /api/ask-gita
Example Request:
{
  "query": "I failed my exam and feel hopeless. What does Gita teach?"
}
🔹 Frontend (React)
cd fentend/dharma-insight-tool-main
npm install
npm run dev

Open in browser:

👉 http://localhost:8080
 (or Vite URL shown in terminal)

⚡ How It Works
Load Gita chapter JSON files (chapter_*.json)
Convert verses to LangChain Documents with metadata (chapter, verse, speaker)
Build/load FAISS vector DB with sentence-transformer embeddings
Retrieve top-k relevant verses for user query
Send formatted prompt + context to Gemini
Return structured answer to API/frontend
📌 Output Format

The assistant responds in clean sections:

Direct Answer
Relevant Bhagavad Gita Verses
Chapter, Verse, Speaker
Sanskrit
English Translation
Explanation
Life Application
⚠️ Error Handling
401 → Invalid/blocked API key
503 (quota/rate limit) → Gemini free-tier limits reached
503 (high demand) → Primary model overloaded

➡️ Automatic fallback to configured fallback model

📝 Notes
This assistant is designed to stay grounded in provided Bhagavad Gita context
Responses should be treated as educational/spiritual guidance, not medical or legal advice
Keep your API key private; do not commit .env to GitHub
🚀 Roadmap
Verse-exact citation cards in structured API response
Multi-commentary comparison mode
Theme/life-situation classifier
Authentication and user history
Deployment (Render/Railway + Vercel)
👨‍💻 Author

Pavan
Dharma Insight Project
