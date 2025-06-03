from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import FAISS, Qdrant
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import PyMuPDFLoader
from langchain_core.documents import Document
import os, shutil
import json
from LangchainGeminiLoader import get_llm
from langchain.prompts import PromptTemplate
import codecs
from langchain.retrievers.document_compressors import CrossEncoderReranker
from langchain.retrievers import ContextualCompressionRetriever
from langchain_community.cross_encoders import HuggingFaceCrossEncoder
from uuid import uuid4
import re 

if __name__ == '__main__':
    folder = 'output/'
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))

    pdfs = list(filter(lambda x: x.endswith('.pdf'), os.listdir('contract_pdfs')))
    # pdfs = ['ArcGroupInc.pdf']
    json_list = []
    # pdfs = [
    #     'BELLICUMPHARMACEUTICALS,INC_05_07_2019-EX-10.1-Supply Agreement.pdf', 
    #     'FUSIONPHARMACEUTICALSINC_06_05_2020-EX-10.17-Supply Agreement - FUSION.pdf',
    #     'MEDIWOUNDLTD_01_15_2014-EX-10.6-SUPPLY AGREEMENT copy.pdf',
    #     'FreezeTagInc.pdf'
    # ]

    def write_to_txt(filename: str, txt: str):
        with open(filename+'.txt', 'w') as f:
            f.write('\n'.join([doc.page_content for doc in transaction_docs]))
    
    def clean_text_with_ftfy(text: str) -> str:
        try:
            # Decode literal escape sequences like \\u00a0 or \\xa0 to actual chars
            text = codecs.decode(text, 'utf-8')
        except Exception:
            pass

        # Replace invisible Unicode whitespace chars with a regular space
        text = text.replace('\u00a0', ' ')  # Non-breaking space
        text = text.replace('\xa0', ' ')    # Also non-breaking space in hex
        text = text.replace('\u200b', '')   # Zero-width space
        text = text.replace('\u202f', ' ')  # Narrow no-break space
        text = text.replace('\u2009', ' ')  # Thin space

        # Optional: Collapse multiple spaces into one
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    
    def write_to_json(filename: str, json_obj: dict):
        with open(f'{filename}.json', 'w') as json_file:
            json.dump(json_obj, json_file, indent=4)
    
    for pdf_name in pdfs:

        loader = PyMuPDFLoader(f'contract_pdfs/{pdf_name}')

        docs = loader.load()

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=2000,
            chunk_overlap=300,
            length_function=len
        )

        docs = splitter.split_documents(docs)
        file_token = 0
        for doc in docs:
            file_token += len(doc.page_content) / 4
        # def add_id(doc: Document):
        #     doc.metadata['_id'] = uuid4()
        #     print(doc.metadata['_id'])
        #     return doc
        
        # docs = list(map(add_id, docs))


        embeddings = SentenceTransformerEmbeddings(
            model_name="all-MiniLM-L6-v2"
        )

        # vectorstore = FAISS.from_documents(
        #     documents=docs,
        #     embedding=embeddings,
        # )
        qdrant = Qdrant.from_documents(
            documents=docs,
            embedding=embeddings,
            url="http://localhost:6333",  # Local Qdrant instance
            prefer_grpc=False,
            # collection_name=pdf_name,
        )
        
        # qdrant.similarity_search(query="Contact Information of Sponsors and Orgnaizations")
        retriever = qdrant.as_retriever(search_type="mmr", search_kwargs={'k': 2})
        # query = "Find - Email Contact By Address Tel Fax Signature Phn Name Sponsors Organization Club"
        contact_info_docs = retriever.get_relevant_documents(query="IN WITNESS WHEREOF both parties have agreed to")

        transaction_docs = retriever.get_relevant_documents(query="The party has agreed to deliver the following amount XXX dollars $ or YY % to the Club for the following quarter/month period")
        
        txt = ''
        for doc in contact_info_docs + transaction_docs:
            txt += doc.page_content
        txt = clean_text_with_ftfy(txt)
        prompt = PromptTemplate.from_template("""
        You are an contract analyzing assistant.
        1. You are required to extract the following data from the given Context.
        - Orgnaizations Involved.
        - Contract Agreement Summary.
        - Compliance and Expectations Summary.
        - Amount Deliverables for shipments in Agreement context.
        - Contract Start & end dates.
        - Termination & Expiry Information Summary.
        2. Do the following corrections
        - If the context has [***] USD or percentage or contact information. You can replace it with some random Amount Value or Percentage or Contact Information.
        - Then you can analyze to extract the information.
        Context: {context}

        **Output Format**
        1. Format the response in the json format in given schema.
        ### JSON Schema
        {{
            "organizations_involved": [
                {{
                "name": "Organization Name",
                "email": "contact@example.com",
                "phone": "+1-555-123-4567"
                }}
            ],
            "contract_agreement_summary": [
                "Summarize the agreement in short bullet points.",
            ],
            "compliance_and_expectations_summary": [
                "Summarize all compliance obligations and expectations in separate statements.",
            ],
            "amount_deliverables_for_shipments": [
                {{
                "amount": "e.g. 1000 units",
                "period": "e.g. Monthly",
                "description": "Describe what is being delivered and under what terms."
                }}
            ],
            "contract_start_date": "YYYY-MM-DD",
            "contract_end_date": "YYYY-MM-DD",
            "termination_and_expiry_summary": [
                "List the key conditions or clauses under which the contract can be terminated.",
                "Include expiry rules or notice periods if stated."
            ]
        }}
        # Note
        - Output only a json object. Never return any code block or any other format.
        - Don't add any marker like ```json, ``` etc
        - Don't output any extra character other than proper json
        - Ensure all variations of duplicate data are preserved with contextual clarity.
        - The merging process must account for nested structures and hierarchy.
        - Further processing includes building knowledge graph from this output json. Hence the node and relationship is important
        """)
        llm = get_llm()
        
        prompt = prompt.invoke({"context": txt})
        
        print("Invoking LLM")
        resp = llm.invoke(prompt)
        token_count = resp.usage_metadata.get('total_tokens')
        
        
        
        
        resp_json = json.loads(resp.content.strip('```').strip('json'))
        json_obj = {
            "total_token": resp.usage_metadata.get('total_tokens'),
            "file_name": pdf_name,
            "context": txt.split('.'),
            "response": resp_json,
            'file_token': file_token
        }
        
        json_list.append(json_obj)
        
        write_to_json(f'output/{pdf_name.split('_')[0]}', json_obj)
    
    total_tokens_sum = sum(item["total_token"] for item in json_list)
    file_tokens = sum(item["file_token"] for item in json_list)
    perc_1 =(total_tokens_sum/file_tokens) * 100
    final_obj = {
        "tokens_consumed": total_tokens_sum,
        "files_tokens": file_tokens,
        "percentage_consumed": perc_1,
        "percentage_saved": 100 - perc_1
    }
    write_to_json(f'output/final',final_obj)
    print(f"Total tokens used: {total_tokens_sum}")

        