import os
from dotenv import load_dotenv

load_dotenv()

from rag_pipeline import (
    load_gita_documents,
    split_documents,
    create_or_load_vectorstore,
)
from langchain_google_genai import ChatGoogleGenerativeAI


# Load verses and build vector store once at startup
docs = load_gita_documents()
chunks = split_documents(docs)
vectorstore = create_or_load_vectorstore(chunks)

retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 3},
)

primary_model = os.getenv("GEMINI_PRIMARY_MODEL", "models/gemini-2.5-flash")
fallback_model = os.getenv("GEMINI_FALLBACK_MODEL", "models/gemini-1.5-flash")

llm = ChatGoogleGenerativeAI(
    model=primary_model,
    temperature=0.2,
)
fallback_llm = ChatGoogleGenerativeAI(
    model=fallback_model,
    temperature=0.2,
)


def _build_context(relevant_docs):
    verses = []
    for doc in relevant_docs:
        verses.append(
            f"""
Chapter {doc.metadata['chapter']}, Verse {doc.metadata['verse']}
Speaker: {doc.metadata.get('speaker', 'Unknown')}

{doc.page_content}

---
""".strip()
        )

    context = "\n\n".join(verses)
    return context


def _build_prompt(query: str, context: str) -> str:
    return f"""
You are a Bhagavad Gita assistant.

The user may ask:
- a direct question about the Gita, OR
- describe a real-life situation (career, stress, relationships, duty conflict, etc.).

You are given relevant Bhagavad Gita verses in the context below.

STRICT RULES:
1. Use ONLY the verses in the provided context. Do NOT invent verses.
2. Always include Chapter and Verse numbers for every verse you use.
3. ALWAYS follow this output structure:

(1) Direct Answer (2–4 sentences)
    - Answer the user's question or summarize the main teaching that applies.

(2) Relevant Bhagavad Gita Verses
    For each key verse, show:
    - Chapter <number>, Verse <number>
      Speaker: <speaker>

      Sanskrit:
      <sanskrit text>

      English Translation:
      <translation>

      Explanation:
      <explanation>

(3) Life Application / Guidance
    - In 3–6 sentences, explain how these verses apply to the user's question
      or real-life situation. Be practical but stay strictly within the meaning
      of the verses. Do NOT give generic advice without tying it to the text.

(4). VERY IMPORTANT:
   Even if the verses do not mention modern words (like 'exam', 'job', 'startup'),
   you MUST still choose the 1–3 most relevant verses from the context and
   explain how their teaching applies to the user's situation.
   Do NOT answer with "Not found in Bhagavad Gita context" when context is non‑empty.
   Only if the Context section is completely empty may you say:
   "❌ Not found in Bhagavad Gita context."

Context (Bhagavad Gita verses):
{context}

User input:
{query}
"""


def ask_gita(query: str) -> dict:
    """
    Core RAG call used by both CLI and API layers.
    Returns a simple dict so web frameworks can JSON-encode it directly.
    """
    relevant_docs = retriever.invoke(query)
    context = _build_context(relevant_docs)
    prompt = _build_prompt(query, context)

    try:
        response = llm.invoke(prompt)
    except Exception as e:
        err_str = str(e).lower()
        # Temporary model overload is common on free tier; retry with a lighter fallback model.
        if "503" in err_str or "unavailable" in err_str or "high demand" in err_str:
            response = fallback_llm.invoke(prompt)
        else:
            raise

    return {
        "answer": response.content,
        "verses": [],
        "life_application": "",

    }

