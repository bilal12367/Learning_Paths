from langchain_google_genai import GoogleGenerativeAI


specs = {}
specs['GOOGLE_API_KEY'] = 'AIzaSyDL-tX2tA6vK1AfQ60N1WFpGgQx3yKyOmc'
# specs['MODEL_NAME'] = "gemini-1.5-pro-001"
specs['MODEL_NAME'] = "gemini-2.0-flash"
specs['TOKENS'] = 2000
specs['EMBED_MODEL_NAME'] = "models/text-embedding-004"

def getLLM():
    return GoogleGenerativeAI(model=specs['MODEL_NAME'],max_tokens=specs['TOKENS'],api_key=specs['GOOGLE_API_KEY'])

llm = GoogleGenerativeAI(model=specs['MODEL_NAME'],max_tokens=specs['TOKENS'],api_key=specs['GOOGLE_API_KEY'])
