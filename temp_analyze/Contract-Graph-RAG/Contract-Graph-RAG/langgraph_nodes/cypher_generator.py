from langchain_core.prompts import PromptTemplate

from agent_state import State
from utils import get_llm


def cypher_generator(state: State):
    llm = get_llm()
    prompt = PromptTemplate.from_template(
        """
        **Generate Neo4j Cypher queries to represent entities, relationships, and relevant information extracted from the provided JSON document. Aim to create a graph schema that allows easy ingestion of the data into Neo4j.**
    
        ---
        **Instructions:**
    
        Cypher queries should be formatted as a series of statements, specifically:
        - Do not include any explanations or apologies in your responses.
        - Don't add any marker like ```cypher or ```json etc.
        - Do not include any text except the generated Cypher statement.
        - `MERGE` statements for nodes (avoids duplication).
        - Relationship creation linking between entities (`MERGE` or `CREATE`).
        - Placeholder Nodes: For missing data or specified fields, include default properties (if description is vague).

        ---
        
        **Examples:**
        ##Example 1:
        
        **Input JSON:**

        {{
          "parties_involved": {{
            "client": "Acme Corp",
            "service_provider": "Tech Solutions Ltd."
          }},
          "effective_dates": {{
            "start_date": "2025-01-01",
            "end_date": "2025-12-31"
          }}
        }}
        
        **Output cypher queries**
        
        MERGE (client:Company {{name: "Acme Corp"}})
        MERGE (provider:Company {{name: "Tech Solutions Ltd."}})
        MERGE (agreement:Agreement {{startDate: date("2025-01-01"), endDate: date("2025-12-31")}})
        MERGE (client)-[:ENGAGED_WITH]->(provider)
        MERGE (client)-[:SIGNED]->(agreement)
        MERGE (provider)-[:SIGNED]->(agreement)

        ---
        ##Example 2:
        
        **Input JSON:**

        {{
          "terms": {{
            "project_timeline": "2025-01-01 to 2025-06-30",
            "milestones": [
              {{"name": "MVP Launch", "due_date": "2025-04-30"}},
              {{"name": "Final Delivery", "due_date": "2025-06-30"}}
            ]
          }}
        }}

        **Output cypher queries**
        
        MERGE (agreement:Agreement {{id: "AG123"}})  // ID can be generated or passed
        MERGE (timeline:Term {{description: "2025-01-01 to 2025-06-30"}})
        MERGE (agreement)-[:HAS_TERM]->(timeline)
        
        MERGE (milestone1:Milestone {{name: "MVP Launch", dueDate: date("2025-04-30")}})
        MERGE (milestone2:Milestone {{name: "Final Delivery", dueDate: date("2025-06-30")}})
        MERGE (timeline)-[:HAS_MILESTONE]->(milestone1)
        MERGE (timeline)-[:HAS_MILESTONE]->(milestone2)

        Now its your turn to generate the cypher queries for the given JSON document.
        {input_json} 
    
        """
    )
    formatted_prompt = prompt.format_prompt(input_json=state['compressed_json'])
    response = llm.invoke(formatted_prompt)
    return {"cypher_queries": response.content}