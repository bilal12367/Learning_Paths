from langchain_core.prompts import PromptTemplate

from agent_state import State
from utils import get_llm


def json_compressor(state: State):
    llm = get_llm()
    prompt = PromptTemplate.from_template(
        """
        Merge multiple JSONs into a single comprehensive JSON without losing any information.
    
        Details:
        - Combine the input JSON objects while preserving all keys, values, and contextual details.
        - Handle potential overlaps in keys and values:
          - For keys with identical names, merge their contents into a single collection (like arrays or merged objects) without duplicates.
          - Ensure all contextual and contractual details are retained, even if they appear similar across JSONs.
        - The resulting JSON must preserve clarity and structure, with no loss of critical data.
        - The resulting json will be used to extract nodes and relationships to build knowledge graphs. Keeping this in mind format the json
    
        # Steps
        1. **Input Validation**:
           - Ensure the input contains valid JSON structures.
           - Identify the number of JSON objects provided for merging.
    
        2. **Iterative Merging**:
           - For each key in the JSON objects:
             - If the value is an array: Combine arrays and remove duplicates while keeping the order.
             - If the value is a dictionary (nested JSON): Recursively merge nested dictionaries, applying the same rules.
             - If the value is missing or empty in some JSONs, fill in from others where data is present.
             - If multiple scalar values exist for the same key, combine them into an array or pick the most contextually relevant value if specified.
    
        3. **Conflict Resolution**:
           - If discrepancies exist in data values or formats, preserve all variations to ensure no information is lost. For example:
             - Different spellings: Include both versions (e.g., "InfyMillenial" vs. "InfyMillenial Limited").
             - Overlapping legal clauses or obligations: Include all variations with clear context.
    
        4. **Output Format**:
           - Generate a single JSON object combining all the merged data, retaining any hierarchies and structures.
           - Ensure the output JSON is well-formatted and human-readable.
    
        # Output Format
        The final output should be a cohesive JSON object that integrates all input JSON data with the necessary adjustments mentioned above.
    
        # Example
    
        ### Input
        [
          {{
            "Parties": ["BigBankA", "InfyMillenial"],
            "EffectiveDates": {{}},
            "Terms": ["SOW for handling Special SCIs"],
            "Obligations": ["BigBankA", "InfyMillenial"],
            "Financials": {{}},
            "LegalClauses": ["Confidentiality clause", "Strictly prohibited to disclose information"],
            "ServiceLevels": {{}},
            "TerminationDetails": [],
            "KeyDefinitions": ["SOW: Statement of Work"],
            "Signatories": []
          }},
          {{
            "Parties": [
              "BigBankA",
              "InfyMillenial Limited"
            ],
            "EffectiveDates": {{
              "StartDate": "2023-01-01",
              "EndDate": ""
            }},
            "Terms": ["Duration: 12 months", "Automatic renewal: 12 months"],
            "Obligations": [
              "BigBankA: Provide managed cloud services",
              "InfyMillenial Limited: Ensure timely payment"
            ],
            "Financials": [],
            "LegalClauses": ["Governing law: California", "Governing law: GMSA signed between BigBankA and InfyMillenial Ltd on 27th April 2017"],
            "ServiceLevels": [],
            "TerminationDetails": [],
            "KeyDefinitions": ["SLA: Service Level Agreement"],
            "Signatories": []
          }}
        ]

    
        ### Output
        {{
          "Parties": ["BigBankA", "InfyMillenial", "InfyMillenial Limited"],
          "EffectiveDates": {{
            "StartDate": "2023-01-01",
            "EndDate": ["Not specified", ""]
          }},
          "Terms": [
            "SOW for handling Special SCIs",
            "Duration: Not specified",
            "Automatic renewal: Not specified",
            "Duration: 12 months",
            "Automatic renewal: 12 months"
          ],
          "Obligations": [
            "BigBankA",
            "InfyMillenial",
            "InfyMillenial: Provide services for Special SCIs",
            "BigBankA: Accept services for Special SCIs",
            "BigBankA: Provide managed cloud services",
            "InfyMillenial Limited: Ensure timely payment"
          ],
          "Financials": ["Payment Details: Not specified"],
          "LegalClauses": [
            "Confidentiality clause",
            "Strictly prohibited to disclose information",
            "Governing law: Not specified",
            "Governing law: California",
            "Governing law: GMSA signed between BigBankA and InfyMillenial Ltd on 27th April 2017"
          ],
          "ServiceLevels": ["Service Level Agreement: Not specified"],
          "TerminationDetails": [
            "Termination notice: Not specified",
            "Early termination fee: Not specified"
          ],
          "KeyDefinitions": [
            "SOW: Statement of Work",
            "SLA: Service Level Agreement"
          ],
          "Signatories": ["Name of Representative A", "Name of Representative B"]
        }}
    
        # Notes
        - Output only a json object. Never return any code block or any other format.
        - Don't add any marker like ```json etc
        - Don't output any extra character other than proper json
        - Ensure all variations of duplicate data are preserved with contextual clarity.
        - The merging process must account for nested structures and hierarchy.
        - Further processing includes building knowledge graph from this output json. Hence the node and relationship is important
    
        Below is the input json. Convert it as per the above instructions\n
        {input_json} 
        """
    )

    formatted_prompt = prompt.format_prompt(input_json="\nNext Json:\n".join(state['entities']))
    response = llm.invoke(formatted_prompt)
    return {"compressed_json": response.content}
