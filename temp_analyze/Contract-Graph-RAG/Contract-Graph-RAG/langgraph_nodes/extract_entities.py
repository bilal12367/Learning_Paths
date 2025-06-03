from langchain_core.prompts import PromptTemplate

from agent_state import EntityExtractorState
from utils import get_llm


def extract_entities(state: EntityExtractorState):
    """
    Map function to extract entities from a single chunk.
    """
    llm = get_llm()
    prompt = PromptTemplate.from_template(
        """
        Extract all distinct, useful entities from the given document, which is a software agreement, SLA, SLO, or SOW type contract document between different parties.

        Entities to be extracted include, but are not limited to:  
        - **Parties involved**: The client and the service provider (e.g., Company A and Tech Solutions Ltd.), including any subcontractors or third parties.
        
        - **Effective dates**: Start and end dates of the agreement (e.g., Effective from Jan 1, 2025 to Dec 31, 2025), along with any renewal or extension provisions.
        
        - **Terms**: Project timelines, delivery milestones, response/resolution timeframes (from SLA), and duration of support or maintenance services.
        
        - **Obligations and responsibilities**:
          Defined in the Statement of Work (SOW):
          - Who delivers what
          - Responsibilities for each party
          - Project management duties
          - Also includes response times, availability targets (from SLA), and agreed service commitments (from SLOs).
        
        - **Financials**:
          Detailed in the SOW or MSA:
          - Total project cost or recurring service fees
          - Payment terms (e.g., 50% upfront, 50% on delivery)
          - Penalties for SLA violations (e.g., service credits or deductions)
          - Budget constraints or change order costs
        
        - **Legal clauses**:
          Master Services Agreement (MSA) typically includes:
          - Governing law and jurisdiction
          - Limitation of liability
          - Indemnity clauses
          - Confidentiality terms (NDA)
          - Intellectual property rights
          - Data protection/privacy compliance
        
        - **Service levels and expectations**:
          Defined in the Service Level Agreement (SLA):
          - Availability targets (e.g., 99.9% uptime)
          - Performance metrics (e.g., API response time < 500ms)
          - Incident response times
          - KPIs (e.g., customer satisfaction score, MTTR)
          - SLOs (e.g., 95% of issues resolved in 2 business days)
          - Support tiers (L1, L2, L3), coverage hours (e.g., 24/7 or business hours)
        
        - **Termination details**:
          - Termination for convenience or cause
          - Exit procedures and data handover
          - Penalties or liabilities for early termination
          - Post-termination support or transition services
        
        - **Key definitions**:
          - **SOW** – Statement of Work: Scope, deliverables, timeline
          - **SLA** – Service Level Agreement: Quality and availability standards
          - **SLO** – Service Level Objective: Measurable goals within the SLA
          - **KPI** – Key Performance Indicator: Metrics to monitor performance
          - **MSA** – Master Services Agreement: Legal backbone of the relationship
          - **NDA** – Non-Disclosure Agreement: Confidentiality terms
          - **Change Request** – Formal scope/terms modification post-signing
        
        - **Signatories**: Authorized representatives from each party (e.g., CTO, Legal Head, or Procurement Manager), with full name, title, and date of signing.

        Include any other context-specific entities relevant to understanding the document fully.

        # Steps

        1. **Initial Parsing**:
           - Read the document and identify different sections or headings to locate relevant entities.
           - Focus on structured components often found in such contracts (e.g., terms, definitions, financials).

        2. **Entity Extraction**:
           - Identify and extract the relevant entities (as detailed above) from their respective sections.
           - Account for terms with legal or industry-specific language that may signal important information.
           - Use contextual understanding to ensure entities are extracted even when phrased indirectly.

        3. **Validation**:
           - Ensure that the extracted entities are distinct (de-duplicate if needed).
           - Match entities to their corresponding sections for clarity and completeness.

        # Output Format

        Provide the extracted data in JSON format, where each category represents the entity type, and extracted entities are listed as arrays. The structure is as follows:
        # Examples
        **Input Example**:  
        *Software Services Agreement between Acme Corp and Tech Solutions Ltd. is effective from January 1, 2025 to December 31, 2025, with annual auto-renewal and a 30-day termination notice. The contract outlines a project timeline running from January to June 2025, including key milestones like the Design Phase (due February 15), MVP Launch (April 30), and Final Delivery (June 30). The service provider is responsible for developing the software per the Statement of Work (SOW), offering ongoing support aligned with the Service Level Agreement (SLA), and maintaining strict confidentiality. The client must grant system access and review deliverables on time.
        The total project cost is $120,000, payable in three phases: $60,000 at contract signing, $30,000 at MVP launch, and $30,000 at final delivery. For any critical SLA violations, a 5% credit on the monthly invoice will be applied. This agreement is governed by the laws of California, USA, with a liability cap equal to the contract value. Disputes will be resolved through arbitration in San Francisco, CA, and all intellectual property developed will be owned by the client.
        The SLA defines a 99.9% monthly uptime, 1-hour response time for P1 issues, and resolution times of 4 hours (P1) and 8 business hours (P2). Service Level Objectives (SLOs) include resolving 95% of P2 issues within 8 business hours and maintaining 99.95% uptime for core services. Key Performance Indicators (KPIs) include a CSAT score of 90% or higher and a Mean Time to Recovery (MTTR) under 2 hours. Support is available 24/7 via email, phone, and ticketing systems.
        Termination may occur for convenience with 30 days’ notice or immediately for cause. Upon termination, a 30-day support handover and data export process will be followed. Key terms are defined, including the SOW, SLA, SLO, KPIs, MSA, NDA, and Change Requests. The contract is signed by Jane Smith, CTO of Acme Corp, on December 20, 2024, and John Doe, Director of Client Services at Tech Solutions Ltd., on December 21, 2024.*

        **Output Example**:  

        {{
          "parties_involved": {{
            "client": "Acme Corp",
            "service_provider": "Tech Solutions Ltd."
          }},
          "effective_dates": {{
            "start_date": "2025-01-01",
            "end_date": "2025-12-31",
            "renewal_terms": "Annual auto-renewal with 30-day notice for termination"
          }},
          "terms": {{
            "project_timeline": "2025-01-01 to 2025-06-30",
            "support_duration": "Ongoing until contract termination",
            "milestones": [
              {{"name": "Design Phase Complete", "due_date": "2025-02-15"}},
              {{"name": "MVP Launch", "due_date": "2025-04-30"}},
              {{"name": "Final Delivery", "due_date": "2025-06-30"}}
            ]
          }},
          "obligations_and_responsibilities": {{
            "client": [
              "Provide access to internal systems",
              "Review and approve deliverables on time"
            ],
            "service_provider": [
              "Develop software as per SOW",
              "Provide ongoing support as per SLA",
              "Maintain data confidentiality"
            ]
          }},
          "financials": {{
            "total_cost": 120000,
            "payment_schedule": [
              {{"milestone": "Contract Signing", "amount": 60000}},
              {{"milestone": "MVP Launch", "amount": 30000}},
              {{"milestone": "Final Delivery", "amount": 30000}}
            ],
            "penalties": {{
              "sla_breach": "5% credit on monthly invoice for each critical SLA violation"
            }}
          }},
          "legal_clauses": {{
            "governing_law": "California, USA",
            "liability_limit": "Limited to total contract value",
            "confidentiality": "Mutual NDA signed",
            "intellectual_property": "Client retains ownership of all deliverables",
            "dispute_resolution": "Arbitration in San Francisco, CA"
          }},
          "service_levels_and_expectations": {{
            "sla": {{
              "uptime": "99.9% monthly",
              "response_time": "Within 1 hour for P1 issues",
              "resolution_time": "P1 within 4 hours, P2 within 8 business hours"
            }},
            "slos": [
              {{"description": "95% of P2 issues resolved within 8 business hours"}},
              {{"description": "99.95% uptime for core services"}}
            ],
            "kpis": [
              {{"metric": "CSAT", "target": "≥ 90%"}},
              {{"metric": "Mean Time to Recovery", "target": "< 2 hours"}}
            ],
            "support_coverage": {{
              "hours": "24x7",
              "channels": ["Email", "Phone", "Ticketing System"]
            }}
          }},
          "termination_details": {{
            "termination_for_convenience": "Either party may terminate with 30 days' written notice",
            "termination_for_cause": "Immediate termination on breach or insolvency",
            "post_termination": "30-day support handover and data export"
          }},
          "key_definitions": {{
            "SOW": "Document outlining work scope, deliverables, and timeline",
            "SLA": "Agreement specifying service expectations and penalties",
            "SLO": "Targeted service goals within SLA",
            "KPI": "Performance metric to track service quality",
            "MSA": "Master Services Agreement outlining legal framework",
            "NDA": "Agreement to protect confidential information",
            "Change Request": "Formal request for modifying contract scope or terms"
          }},
          "signatories": {{
            "client": {{
              "name": "Jane Smith",
              "title": "CTO",
              "signed_on": "2024-12-20"
            }},
            "service_provider": {{
              "name": "John Doe",
              "title": "Director of Client Services",
              "signed_on": "2024-12-21"
            }}
          }}
        }}

        # Notes
        - Output directly parsable json queries
        - Don't add any marker like ```json etc. otherwise it will break the parsing code
        - Don't output any extra character other than proper json
        - Pay special attention to the specific phrasing in SLA, SLO, or SOW contracts, which often embed terms in dense language.
        - If the specific document is missing certain sections/categories, leave the corresponding key in the JSON empty (e.g., `"financials": {{}}`).

        Start with the following document:\n
        {document}
    """
    )

    # Process a single chunk
    chunk = state["chunk"]  # Get the first chunk from the state
    formatted_prompt = prompt.format_prompt(document=chunk.page_content)
    response = llm.invoke(formatted_prompt)

    return {"entities": [response.content]}