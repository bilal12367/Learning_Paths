

from langchain_google_genai import ChatGoogleGenerativeAI
import os
import google.generativeai as genai


os.environ["GOOGLE_API_KEY"] = "AIzaSyA4KYLregUG3eMvlWsAdFkZeCjiRCh9saA"

def getLLM():
    return ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        temperature=0.6,
        max_output_tokens=5000
    )
