

from LangchainGeminiLoader import getLLM
from langgraph.graph import StateGraph, START, END

from typing import TypedDict, List, Dict, Any, Annotated
import operator

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

from typing import List, Dict, TypedDict, Annotated, Any
from pydantic import Field, BaseModel
from pymupdf import Document

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
    not_related: bool = Field(default=[], description="If context is not related to contractual information set this to True.")


class LoopState(TypedDict,total=False):
    max_retries: int
    doc_count: int

class MyState(TypedDict, total=False):
    file_names: List[str]
    current_file_name: str
    docs: List[Document]
    vectorstore: VectorStore
    search_fields: List[str]
    rel_docs: List[Document]
    resp_list: List[ContractSummary]
    llm_obj: ContractSummary
    max_retries: Annotated[int,operator.add]
    error: bool
    named_entities: Dict
    not_contract_files: List[str]
    flags: Dict


class Doc_Loader:
    def __init__(self):
        self.files = self.get_file_names()
        
    def get_file_names(self):
        cwd = os.getcwd()
        pdfs_folder = os.path.join(cwd, '..', 'contract_pdfs')
        file_names = [file for file in os.listdir(pdfs_folder) if file.endswith('.pdf')]
        
        return file_names
        
    
    def __call__(self, state: MyState) -> Dict[str, Any]:
        try:
            fileName = self.files.pop()
            loader = PyMuPDFLoader(f'../contract_pdfs/{fileName}')
            docs = loader.load()
            for doc in docs:
                cleaned_content = doc.page_content.replace('\xa0', ' ').strip()
                # Create a new Document with cleaned content but same metadata
                doc.page_content = cleaned_content
            
            return {
                "max_retries": 3, 
                "file_names": self.files, 
                "current_file_name":  fileName.split('_')[0], 
                "search_fields": ['Parties Involved', 'Buyer', 'Seller', 'Contract Date', 'Contract Type', 'Summary'],
                "docs": docs
            }
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
            collection_name=state.get("current_file_name"),
            # persist_directory=f"db/{state.get("file_name")}",
        )
        vectorstore.persist()
        return {"vectorstore": vectorstore}


class Doc_Retriever:
    def __init__(self):
        self.llm = getLLM()
    
    def getMessages(self, fields):
        messages=[
            SystemMessage(content="""
                          You are contract assistant, you will generate the relevant search terms. 
                          Which will be used to query vector store for relevant documents. 
                          Your output should be only good search terms depending on given input. 
                          Generate 5-15 terms depending on the given Human Input, 
                          if the input has less words create less words, 
                          if it has more generate more,keep the generated values separated by whitespace"""),
            HumanMessage(content=','.join(fields)),
        ]
        return messages
        
    
    def __call__(self, state: MyState):
        messages = self.getMessages(state.get("search_fields"))
        query = self.llm(messages=messages).content
        vc = state.get('vectorstore')
        # print(f"Query Generated :  {query}")
        
        retriever = vc.as_retriever(search_kwargs={"k": 3})
        rel_docs = retriever.get_relevant_documents(query)
        
        return { "rel_docs": rel_docs }


class LLM_Extraction:
    def __init__(self):
        self.llm = getLLM()
    def construct_prompt(self):
        return PromptTemplate.from_template("""
            1. You are contract agent, you will be generating summary from the given context.
            2. If the given context is not related to contractual or business or financial data,
                then set not_related to True and stop at this step.
            3. If given context is related set not_related to False, You are required to extract the following information given from the context.
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
            4. If you are unable to find any one of the required information, you add the key in the missing_fields.
            5. If Final Answer is found, format the information
            
            Here's the context:
            {context}
        """)
    def __call__(self, state: MyState) -> MyState:
        rel_docs = state.get('rel_docs')
        retries = int(state.get("max_retries")) - 1
        prompt = self.construct_prompt()
        txt = '\n'.join([doc.page_content for doc in rel_docs])
        # tokens = count_tokens_approximately(messages=prompt.invoke({'context': txt}).to_string(), chars_per_token=4)
        
        try:
            resp_format = self.llm.with_structured_output(ResponseFormatter).invoke(prompt.invoke({'context': txt}))
            resp_format = resp_format.dict()
        except Exception as e:
            print("Resource Exhaused")
            return {"error": True, 'max_retries': 0}
      
        missing_fields = resp_format.get('missing_fields', [])
        if(resp_format.get('not_related')):
            not_contract_files = []
            if('not_contract_files' in state):
                not_contract_files = state.get('not_contract_files')
            not_contract_files.append(state.get('current_file_name'))
            return {"resp_obj": resp_format, 'not_contract_files': not_contract_files , 'flags': { 'not_related': True, 'repeat_retrieval': False }}
        elif len(missing_fields) != 0:
            return { 
                    "search_fields": missing_fields,
                    "max_retries": retries - 1, 
                    "flags" : { "repeat_retrieval": True, 'not_related': False }
            }
        else:
            resp: ContractSummary = resp_format
            resp['file_name'] = state.get('current_file_name')
            
            return { 
                    "search_fields": ['Parties Involved', 'Buyer', 'Seller', 'Contract Date', 'Contract Type', 'Summary'], 
                    "max_retries": 3, 
                    "rel_docs": [],
                    "llm_obj": resp,
                    "flags": {}
                    
            }


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
        
        return { 'named_entities': entities }

graph = StateGraph(state_schema=MyState)

from enum import Enum


def should_repeat_retrieval(state: MyState):
    if 'not_related' in state.get('flags') and state.get('flags').get('not_related'):
        return 'skip_file'
    elif 'repeat_retrieval' in state.get('flags') and state.get('flags').get('repeat_retrieval'):
        return 'repeat_retrieval'
    else:
        return 'continue'

def merge_results(state: MyState):
    print("MERGE RESULTS")
    llm_obj = state.get('llm_obj')
    llm_obj['named_entities'] = state.get('named_entities')
    resp_list = []
    if 'resp_list' in state:
        resp_list = state.get('resp_list')
    resp_list.append(llm_obj)
    return { 'resp_list': resp_list }

def should_continue(state: MyState):
    return "next_file" if len(state.get('file_names')) != 0 else 'end'


class NodeName(str, Enum):
    DOCS_LOADER = "docs_loader"
    DOCS_SPLITTER = "docs_splitter"
    DOCS_EMBEDDING = "docs_embedding"
    DOCS_RETRIEVER = "docs_retrieval"
    LLM_EXTRACTION = "llm_extraction"
    NER_EXTRACTION = 'ner_extraction'
    MERGE_RESULTS='merge_results'

graph.add_node(NodeName.DOCS_LOADER.value, Doc_Loader())
graph.add_node(NodeName.DOCS_SPLITTER.value, Doc_Splitter())
graph.add_node(NodeName.DOCS_EMBEDDING.value, Doc_Embedding())
graph.add_node(NodeName.DOCS_RETRIEVER.value, Doc_Retriever())
graph.add_node(NodeName.LLM_EXTRACTION.value, LLM_Extraction())
graph.add_node(NodeName.NER_EXTRACTION.value, NER_Extractor())
graph.add_node(NodeName.MERGE_RESULTS.value, merge_results, defer=True)

graph.set_entry_point(NodeName.DOCS_LOADER.value)
graph.add_edge(NodeName.DOCS_LOADER.value, NodeName.DOCS_SPLITTER.value)

# Branch 1 - LLM_Extraction
graph.add_edge(NodeName.DOCS_SPLITTER.value, NodeName.DOCS_EMBEDDING.value)
graph.add_edge(NodeName.DOCS_EMBEDDING.value, NodeName.DOCS_RETRIEVER.value)
graph.add_edge(NodeName.DOCS_RETRIEVER.value, NodeName.LLM_EXTRACTION.value)

# Branch 2 - NER_Extraction
graph.add_edge(NodeName.DOCS_SPLITTER.value, NodeName.NER_EXTRACTION.value)

# Merge Branches - FAN-IN
graph.add_edge(NodeName.NER_EXTRACTION.value, NodeName.MERGE_RESULTS.value)


graph.add_conditional_edges(
    NodeName.LLM_EXTRACTION.value,
    should_repeat_retrieval,
    {
        'skip_file': NodeName.DOCS_LOADER.value,
        'repeat_retrieval': NodeName.DOCS_RETRIEVER.value,
        'continue': NodeName.MERGE_RESULTS.value
    }
)

graph.add_conditional_edges(
    NodeName.MERGE_RESULTS.value,
    should_continue,
    {
        'next_file': NodeName.DOCS_LOADER.value,
        'end': END
    }
)

# graph.set_finish_point(NodeName.LLM_EXTRACTION.value)

app = graph.compile()


resp: MyState = app.invoke(
    {},
    config={ 'callbacks': [StdOutCallbackHandler()], 'recursion_limit': 1000}
    )

print(resp.keys())

resp_list = resp.get("resp_list")

with open('output.json', 'w', encoding='utf-8') as f:
    json.dump(resp_list, f, indent=4)
