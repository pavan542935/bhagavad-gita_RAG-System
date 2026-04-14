import streamlit as st
from dotenv import load_dotenv
load_dotenv()

from rag_pipeline import load_gita_documents, split_documents, create_or_load_vectorstore
from langchain_google_genai import ChatGoogleGenerativeAI


# ------------------------------
# Page Config
# ------------------------------
st.set_page_config(
    page_title="Bhagavad Gita Intelligence System",
    page_icon="📖",
    layout="wide"
)

st.title("📖 Bhagavad Gita Intelligence System")
st.markdown(
    "Verse-level, citation-enforced philosophical intelligence grounded in scripture."
)


# ------------------------------
# Load System Once (Cached)
# ------------------------------
@st.cache_resource
def load_system():
    docs = load_gita_documents()
    chunks = split_documents(docs)
    vectorstore = create_or_load_vectorstore(chunks)

    retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 3}
    )

    llm = ChatGoogleGenerativeAI(
        model="models/gemini-2.5-flash",
        temperature=0.2
    )

    return retriever, llm


retriever, llm = load_system()


# ------------------------------
# User Input
# ------------------------------
query = st.text_area(
    "Ask about Bhagavad Gita or describe a real-life situation:",
    height=150
)

if st.button("🔎 Get Guidance"):

    if not query.strip():
        st.warning("Please enter a question or situation.")
    else:
        with st.spinner("Retrieving relevant verses and generating response..."):

            relevant_docs = retriever.invoke(query)

            verses = []
            for doc in relevant_docs:
                verses.append(f"""
Chapter {doc.metadata['chapter']}, Verse {doc.metadata['verse']}
Speaker: {doc.metadata.get('speaker', 'Unknown')}

{doc.page_content}

---
""".strip())

            context = "\n\n".join(verses)

            prompt = f"""
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
      or real-life situation. Stay grounded in the verses.

(4) VERY IMPORTANT:
   Even if the verses do not mention modern words, choose the most relevant
   verses from context and apply their meaning.
   Only if context is completely empty may you say:
   "❌ Not found in Bhagavad Gita context."

Context:
{context}

User input:
{query}
"""

            response = llm.invoke(prompt)

        st.markdown("## 🕉 Guidance")
        st.markdown(response.content)

        # Optional: Show Retrieved Context
        with st.expander("🔍 Retrieved Verses (Debug View)"):
            st.text(context)


# ------------------------------
# Footer
# ------------------------------
st.markdown("---")
st.caption("Structured • Citation-Enforced • Grounded in Scripture")