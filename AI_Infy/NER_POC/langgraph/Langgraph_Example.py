

from LangchainGeminiLoader import getLLM
from langgraph.graph import StateGraph, START, END

from typing import TypedDict, List, Dict, Any
from pymupdf import Document
from langchain.prompts import PromptTemplate
from langchain.vectorstores.base import VectorStore
from langchain.schema.retriever import BaseRetriever
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.document_loaders import PyMuPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.callbacks import StdOutCallbackHandler
from langchain_core.messages.utils import count_tokens_approximately
from langchain.vectorstores import Chroma
from langchain_core.messages import AIMessage, SystemMessage, HumanMessage
import os, json
from enum import StrEnum
import spacy
import random
from pydantic import BaseModel, Field

from typing import TypedDict, List



os.environ["LANGCHAIN_API_KEY"] = "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"
os.environ["LANGCHAIN_PROJECT"] = "default"
os.environ["LANGCHAIN_TRACING_V2"] = "true"




class ContractSummary(TypedDict, total=False):
    parties_involved: List[str]
    date: str
    contract_type: str
    summary: str
    missing_fields: List[str]
    file_name: str
    named_entities: Dict

class ResponseFormatter(BaseModel):
    """Always use this tool to structure your response to the user."""
    parties_involved: List[str] = Field(default=[], description="The list of parties involved from response")
    date: str = Field(default=None, description="The date from the response")
    contract_type: str = Field(default=None, description="The contract type from the response")
    summary: str =  Field(default=None, description="Summary of the contract")
    missing_fields: List[str] = Field(default=[], description="If any of the fields aren't found, mention it in here.")

class MyState(TypedDict, total=False):
    doc_count: int
    file_names: List[str]
    file_name: str
    docs: List[Document]
    token_count: int
    error: Any
    resp_obj: ContractSummary
    fields: List[str]
    vectorstore: VectorStore
    rel_docs: List[Document]
    response: Any
    resp_list: List[ContractSummary]
    max_retries: int
    error: bool
    named_entities: Dict
    
graph = StateGraph(state_schema=MyState)


class Doc_Loader:
    def __init__(self):
        self.files = self.get_file_names()
        
    def get_file_names(self):
        cwd = os.getcwd()
        pdfs_folder = os.path.join(cwd, '..', 'contract_pdfs')
        file_names = [file for file in os.listdir(pdfs_folder) if file.endswith('.pdf')]
        max_select = 4
        selected = 0
        selected_list = []
        while selected < max_select:
            sel = random.randint(0, len(file_names) - 1)
            if file_names[sel] not in selected_list:
                selected_list.append(file_names[sel])
                selected += 1

        # print(selected_list)
        return selected_list
        
    
    def __call__(self, state: MyState) -> Dict[str, Any]:
        try:
            fileName = self.files.pop()
            doc_count = state.get("doc_count")
            # print("\n ======================================================================= \n\n")
            # print("Processing File: ", doc_count)
            # print("Name: ", fileName)
            # print("\n ======================================================================= ")
            loader = PyMuPDFLoader(f'../contract_pdfs/{fileName}')
            docs = loader.load()
            for doc in docs:
                cleaned_content = doc.page_content.replace('\xa0', ' ').strip()
                # Create a new Document with cleaned content but same metadata
                doc.page_content = cleaned_content
            
            return {"resp_obj": {}, "max_retries": 3, "file_names": self.files, "file_name":  fileName.split('_')[0], "fields": ['parties_involved, contract_date, contract_type, contract_summary'], "docs": docs, "doc_count": doc_count + 1}
        except Exception as e:
            print(e)
            return {"error": e}

class Doc_Splitter:
    def __init__(self):
        self.splitter = CharacterTextSplitter(
            separator='\n\n',
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
            is_separator_regex=False,
        )
    
    def __call__(self, state):
        # print(state.keys())
        docs = self.splitter.split_documents(documents=state.get("docs"))
        return {"docs": docs}

class Doc_Embedding:
    def __init__(self):        
        self.embeddings = SentenceTransformerEmbeddings(
            model_name="all-MiniLM-L6-v2",
            model_kwargs={"device": "cuda"}
        )
    
    def __call__(self, state):
        vectorstore = Chroma.from_documents(
            state.get("docs"),
            embedding=self.embeddings,
            collection_name=state.get("file_name"),
            # persist_directory=f"db/{state.get("file_name")}",
        )
        vectorstore.persist()
        return {"vectorstore": vectorstore}

class Doc_Retriever:
    def __init__(self):
        self.llm = getLLM()
    
    def getMessages(self, fields):
        messages=[
            SystemMessage(content='You are contract assistant, you will generate the relevant search terms. Which will be used to query vector store for relevant documents. Your output should be only good search terms depending on given input. Generate 5-15 terms depending on the given Human Input, if the input has less words create less words, if it has more generate more,keep the generated values separated by whitespace'),
            HumanMessage(content=','.join(fields)),
        ]
        return messages
        
    
    def __call__(self, state: MyState):
        messages = self.getMessages(state.get("fields"))
        query = self.llm(messages=messages).content
        vc = state.get('vectorstore')
        # print(f"Query Generated :  {query}")
        
        retriever = vc.as_retriever(search_kwargs={"k": 3})
        rel_docs = retriever.get_relevant_documents(query)
        
        return { "rel_docs": rel_docs}

class LLM_Retreiver:
    def __init__(self):
        self.llm = getLLM()
    def construct_prompt(self):
        return PromptTemplate.from_template("""
            1. You are contract agent, you will be generating summary from the given context.
            2. You are also required to extract the following information given from the context.
                a. Parties Involved 
                    - Organizations Names List
                    - Try to find full name of the organizations
                    - Include suffixes ex. LTD, INC, CORP
                b. Contract Type
                    - Type of the contract
                c. Contract Date 
                    - Date of the contract started
                    - Do a proper formatting in dd/mm/yyyy
                    - If unable to find date, add contract date in missing_fields
                d. Summary
                    - Summary of the contract
            3. If you are unable to find any one of the required information, you add the key in the missing_fields.
            4. If Final Answer is found, format the information
            
            Here's the context:
            {context}
        """)
    def __call__(self, state: MyState):
        rel_docs = state.get('rel_docs')
        retries = int(state.get("max_retries")) - 1
        prompt = self.construct_prompt()
        txt = '\n'.join([doc.page_content for doc in rel_docs])
        tokens = count_tokens_approximately(messages=prompt.invoke({'context': txt}).to_string(), chars_per_token=4)
        
        # resp = self.llm.invoke(prompt.invoke({'context': txt}))
        try:
            resp_format = self.llm.with_structured_output(ResponseFormatter).invoke(prompt.invoke({'context': txt}))
        except Exception as e:
            print("Resource Exhaused")
            return {"error": True, 'max_retries': 0}
      
        # print('\n ===========================')
        # print("Tokens:" +str(tokens))
        # print(resp_format.dict())
        # print('\n ===========================')
        missing_fields = resp_format.dict().get('missing_fields', [])
        if len(missing_fields) == 0:
            resp: ContractSummary = resp_format.dict()
            
            resp['file_name'] = state.get('file_name')
            
            # print("\n ======================================================================= \n\n")
            # print("Processing Finished: ", state.get("doc_count"))
            # print("Name: ", state.get('file_name'))
            # print(resp)
            # print("\n ======================================================================= ")
            
            tokens = state.get('token_count') + tokens
            print("State From LLM 154")
            state['docs'] = []
            print(state)
            return {"token_count": tokens, "fields": [],"input_query": "Parties Involved, Contract Type, Contract Date, Summary", "max_retries": 3, "vectorstore": None, 'file_name': None, "rel_docs": [],"resp_obj": resp}
        else:
            return {"fields": missing_fields, "max_retries": retries}

class NER_Extractor:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_lg")
        
    def __call__(self, state: MyState):
        docs = state.get('docs')
        # Process spacy to get names, nouns, dates, and organizations
        entities = {
            "names": [],
            "dates": [],
            "organizations": [],
            "amount": []
        }
        for doc in docs:
            doc_analysis = self.nlp(doc.page_content)
            entities["names"] += [ent.text for ent in doc_analysis.ents if ent.label_ == "PERSON" and ent.text not in entities["names"]]
            entities["dates"] += [ent.text for ent in doc_analysis.ents if ent.label_ == "DATE" and ent.text not in entities["dates"]]
            entities["organizations"] += [ent.text for ent in doc_analysis.ents if ent.label_ == "ORG" and ent.text not in entities["organizations"]]
            entities["amount"] += [ent.text for ent in doc_analysis.ents if ent.label_ == "MONEY" and ent.text not in entities["amount"]]
        print("State From NER 154")
        print(state)
        return { 'named_entities': entities, 'docs': [] }

class Nodes(StrEnum):
    LOAD_DOCS = "load_docs"
    SPLIT_DOCS = "split_docs"
    EMBED_DOCS = "embed_docs"
    RETREIVER_DOCS = "retreiver_docs"
    LLM_Retreival = "llm_retreival"
    NER_Extraction = 'ner_extraction'
    COMBINATOR = 'combinator'

def combinator(state: MyState):
    
    contract_summary: ContractSummary = state.get('resp_obj')
    
    ners = state.get('named_entities')
    contract_summary['named_entities'] = ners
    # new_obj: ContractSummary = ContractSummary(
    #     contract_type= contract_summary.get('contract_type'),
    #     date= contract_summary.get('date'),
    #     file_name= contract_summary.get('file_name'),
    #     missing_fields= contract_summary.get('missing_fields'),
    #     named_entities= ners,
    #     parties_involved= contract_summary.get('parties_involved'),
    #     summary= contract_summary.get('summary'),
    # )
    # resp_list.append(new_obj)
    resp_list = state.get('resp_list')
    resp_list.append(contract_summary)
    return { 'resp_list': resp_list, "docs": []}
# Defining Nodes
graph.add_node(Nodes.LOAD_DOCS.value, Doc_Loader())
graph.add_node(Nodes.SPLIT_DOCS.value, Doc_Splitter())
graph.add_node(Nodes.NER_Extraction.value, NER_Extractor())
graph.add_node(Nodes.EMBED_DOCS.value, Doc_Embedding())
graph.add_node(Nodes.RETREIVER_DOCS.value, Doc_Retriever())
graph.add_node(Nodes.LLM_Retreival.value, LLM_Retreiver())
graph.add_node(Nodes.COMBINATOR.value, combinator)

    


def file_looper(state: MyState):
    return "end" if state.get('error') else "repeat_retrieval" if len(state.get('fields')) != 0 and state.get("max_retries") > 0 else "combinator" if len(state.get('file_names')) > 0 else "end"

def should_exit(state: MyState):
    return "end" if len(state.get('file_names')) == 0 else 'next_file'

# Define Edges
graph.add_edge(START, Nodes.LOAD_DOCS.value)
graph.add_edge(Nodes.LOAD_DOCS.value, Nodes.SPLIT_DOCS.value)
graph.add_edge(Nodes.SPLIT_DOCS.value, Nodes.EMBED_DOCS.value)

graph.add_edge(Nodes.EMBED_DOCS.value, Nodes.RETREIVER_DOCS.value)
graph.add_edge(Nodes.RETREIVER_DOCS.value, Nodes.LLM_Retreival.value)
graph.add_edge( Nodes.LLM_Retreival.value, Nodes.NER_Extraction.value)
graph.add_edge(Nodes.NER_Extraction.value, Nodes.COMBINATOR.value)

graph.add_conditional_edges(Nodes.LLM_Retreival.value, 
    file_looper,
    {
        "repeat_retrieval": Nodes.RETREIVER_DOCS.value,
        "end": END,
        "combinator": Nodes.NER_Extraction.value
    }
)
graph.add_conditional_edges(Nodes.COMBINATOR.value,
    should_exit,
    {
        "end":END,
        "next_file": Nodes.LOAD_DOCS.value
    }
)


app = graph.compile()


resp = app.invoke({
    "doc_count": 0,
    "resp_list": [], 
    "max_retries": 3,
    "resp_obj": {},
    "token_count": 0,
    "named_entities": {},
    "error": False,
    "input_query": "Parties Involved, Contract Type, Contract Date, Summary", 
    "fields": ['parties_involved, contract_date, contract_type, summary']}, 
    config={  'callbacks': [StdOutCallbackHandler()], 
    'recursion_limit': 1000})
# resp = app.invoke({"input_query": "Parties Involved, Contract Type, Contract Date, Summary", "fields": ['parties_involved, contract_date, contract_type, contract_summary']})
# print(resp.keys())
# list_info = resp.get("resp_list")
# print("Response List: ")
# print(list_info)
# print(resp)
with open('output.json', 'w', encoding='utf-8') as f:
    json.dump(resp, f, indent=4)

# Visualize your graph
# print("Drawing Img")
# import grandalf
# from IPython.display import Image, display
# png = app.get_graph().draw_mermaid_png()
# display(Image(png))