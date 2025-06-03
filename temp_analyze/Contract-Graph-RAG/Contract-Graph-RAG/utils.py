from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq


def get_llm():
    """
    Initialize and return the LLM (Language Model) instance.
    """
    # llm = AzureChatOpenAI(
    #     azure_deployment="gpt-4o-mini",
    #     api_version="2024-12-01-preview",  # or your api version
    #     temperature=0,
    #     max_tokens=None,
    #     timeout=None,
    #     max_retries=2,
    # )

    # endpoint = HuggingFaceEndpoint(
    #     repo_id="google/gemma-3-4b-it",
    #     task="text-generation",
    #     max_new_tokens=512,
    #     do_sample=False,
    #     repetition_penalty=1.03,
    # )

    # llm = ChatGroq(
    #         model="llama-3.1-8b-instant",
    #         temperature=0.3,
    #         max_tokens=None,
    #         timeout=None,
    #         max_retries=2,
    #
    #     )
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-001",
        temperature=0.3,
        max_tokens=None,
        timeout=None,
        max_retries=2,
        # other params...
    )
    return llm
