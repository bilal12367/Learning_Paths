import tiktoken
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

from agent_state import State


def doc_loader_splitter(state: State):
    documents = load_pdf(state["pdf_path"])
    chunks = split_documents(documents)
    return {"chunks": chunks}


def load_pdf(file_path):
    """
    Load a PDF file and extract its text content.
    """
    loader = PyMuPDFLoader(file_path)
    documents = loader.load()
    return documents


# def load_pdf_as_single_doc(file_path):
#     """
#     Load a PDF file and extract its text content.
#     """
#     loader = PyMuPDFLoader(file_path)
#     documents = loader.load()
#     merged_document = Document(
#         page_content="\n\n".join([doc.page_content for doc in documents]),
#         metadata=documents[0].metadata if documents else {}
#     )
#     return [merged_document]

def split_documents(documents):
    def len_fx(text: str) -> int:
        enc = tiktoken.get_encoding("cl100k_base")
        return len(enc.encode(text))
    """
    Split the loaded documents into smaller chunks for processing.
    """
    all_text = "\n\n".join([doc.page_content for doc in documents])
    metadata = documents[0].metadata if documents else {}

    text_splitter = RecursiveCharacterTextSplitter(
        separators=["\n\n", "\n", " ", ""],
        chunk_size=25000,
        chunk_overlap=50,
        length_function=len_fx,
    )
    texts = text_splitter.split_text(all_text)
    chunks = [Document(page_content=text, metadata=metadata) for text in texts]

    return chunks
