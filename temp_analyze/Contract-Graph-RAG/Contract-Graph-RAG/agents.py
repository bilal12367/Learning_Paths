from dotenv import load_dotenv
from langgraph.constants import START
from langgraph.graph import StateGraph, END

from agent_state import State
from langgraph_nodes.cypher_generator import cypher_generator
from langgraph_nodes.doc_loader_splitter import doc_loader_splitter
from langgraph_nodes.extract_entities import extract_entities
from langgraph_nodes.extractor_mapper import extractor_mapper
from langgraph_nodes.json_compressor import json_compressor

if __name__ == '__main__':
    load_dotenv()
    # parser = argparse.ArgumentParser(description='Process a PDF document to extract entities and relations.')
    # parser.add_argument('pdf_path', type=str, help='Path to the PDF file to process')
    # parser.add_argument('--visualize', action='store_true', help='Generate and save graph visualization')
    # args = parser.parse_args()

    # Initialize the graph
    graph = StateGraph(State)
    
    # Add nodes
    graph.add_node("doc_loader_splitter", doc_loader_splitter)
    graph.add_node("extract_entities", extract_entities)
    graph.add_node("json_compressor", json_compressor)
    graph.add_node("cypher_generator", cypher_generator)

    # Configure the graph edges
    graph.add_edge(START, "doc_loader_splitter")
    graph.add_conditional_edges("doc_loader_splitter", extractor_mapper, ["extract_entities"])
    graph.add_edge("extract_entities", "json_compressor")
    graph.add_edge("json_compressor", "cypher_generator")
    graph.add_edge("cypher_generator", END)
    
    # Compile the graph with map-reduce configuration
    sla_analyser_graph = graph.compile()

    # Visualize the graph if requested
    # if args.visualize:
    with open("graph_visualization.png", "wb") as file:
        file.write(sla_analyser_graph.get_graph().draw_mermaid_png())
    print("Graph visualization saved as 'graph_visualization.png'")

    # Run the graph with the provided PDF path
    # result = compiled_graph.invoke({"pdf_path": args.pdf_path})
    result = sla_analyser_graph.invoke({"pdf_path": "/Users/sitabja.pal/Desktop/test-1/SOW-7_OrgFive_Vendor4.pdf"})
    print("Processing completed. Results:", result)
