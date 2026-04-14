import os
from dotenv import load_dotenv
load_dotenv()

import glob
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

import json
import glob
from langchain_core.documents import Document


def load_gita_documents():
    documents = []

    # Load all chapter files
    for file in glob.glob("data/gita/dataset/chapter_*.json"):
        with open(file, "r", encoding="utf-8") as f:
            chapter_data = json.load(f)

        chapter_num = chapter_data["chapter_number"]

        for verse in chapter_data["verses"]:
            verse_num = verse["verse_number"]

            sanskrit_text = verse.get("sanskrit", {}).get("devanagari", "")
            english_translation = verse.get("english", {}).get("translation", "")
            english_explanation = verse.get("english", {}).get("explanation", "")
            speaker = verse.get("speaker", "Unknown")

            content = f"""
Chapter {chapter_num}, Verse {verse_num}
Speaker: {speaker}

Sanskrit:
{sanskrit_text}
Translation:
{english_translation}

Explanation:
{english_explanation}
"""

            metadata = {
                "chapter": chapter_num,
                "verse": verse_num,
                "speaker": speaker,
                "source": "bhagavad_gita"
            }

            documents.append(
                Document(page_content=content.strip(), metadata=metadata)
            )

    print(f"Loaded {len(documents)} verses from Bhagavad Gita")
    return documents

# 2. Split text into chunks
def split_documents(docs):
    return docs

# 3. Create embeddings + vector DB

def create_or_load_vectorstore(docs):
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    if os.path.exists("vector_db"):
        print("Loading existing vector database...")
        return FAISS.load_local(
            "vector_db",
            embeddings,
            allow_dangerous_deserialization=True
        )

    print("Creating new vector database...")
    vectorstore = FAISS.from_documents(docs, embeddings)
    vectorstore.save_local("vector_db")
    return vectorstore
