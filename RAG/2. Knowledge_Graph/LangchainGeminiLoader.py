

from langchain_google_genai import ChatGoogleGenerativeAI
import os


os.environ["GOOGLE_API_KEY"] = "AIzaSyA4KYLregUG3eMvlWsAdFkZeCjiRCh9saA"


def get_llm():
    return ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        temperature=0.5,
        max_output_tokens=8000
    )
