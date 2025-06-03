# from dotenv import load_dotenv
# from langchain_core.prompts import ChatPromptTemplate
# from langchain_experimental.graph_transformers import LLMGraphTransformer
#
#
#
#
# def graph_transformer():
#     """
#     process it with the LLM.
#     """
#
#     allowed_relationships = [
#         ("Person", "SPOUSE", "Person"),
#         ("Person", "NATIONALITY", "Country"),
#         ("Person", "WORKED_AT", "Organization"),
#     ]
#
#     llm_graph_transformer = LLMGraphTransformer(
#         llm = get_llm(),
#         prompt = ChatPromptTemplate.from_template(
#             """
#             You are trained to extract different nodes and relationships from the given SLA/SLO/SOW documents.
#             providing few examples for different type of nodes and relationships you need to extract.
#             1. Company/Org - PARTIES_INVOLVED - Company/Org/User
#             2. Company/Org - SLO - Services
#             3. Company/Org - CONTRACT_VALID - DATE
#             4. Company/Org - SLA - Services
#             And many more as per your knowledge
#             """,
#         )
#         # allowed_nodes=["Person", "Country", "Organization"],
#         # allowed_relationships=allowed_relationships,
#     )
#     return llm_graph_transformer
#
# if __name__ == '__main__':
#     load_dotenv()
#     documents = load_pdf("/Users/sitabja.pal/Desktop/test-1/sow_9_BigBankA_InfyMillenial.pdf")
#     chunks = split_documents(documents)
#     graph_documents = graph_transformer().convert_to_graph_documents(chunks)
#     print(graph_documents)
