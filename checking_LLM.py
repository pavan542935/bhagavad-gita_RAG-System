import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Set API key
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

# Import Gemini LLM
from langchain_google_genai import ChatGoogleGenerativeAI

# Initialize model
llm = ChatGoogleGenerativeAI(
    model="models/gemini-2.5-flash",
    temperature=0.7
)

# Send query
response = llm.invoke("How are you?")

# Print result
print(response.content)
