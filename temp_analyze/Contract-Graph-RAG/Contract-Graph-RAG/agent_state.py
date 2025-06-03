import operator
from typing import TypedDict, List, Annotated

from langchain_core.documents import Document


class State(TypedDict):
    pdf_path: str
    chunks: List[Document]
    entities: Annotated[list, operator.add]
    collect_entities: Annotated[list, operator.add]
    compressed_json: str
    relations: Annotated[list, operator.add]
    entities_and_relations: Annotated[list, operator.add]
    combined_output: str
    cypher_queries: str

class EntityExtractorState(TypedDict):
    chunk: Document
    entities: Annotated[list, operator.add]

