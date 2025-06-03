from typing import List, Optional

from pydantic import BaseModel


class EffectiveDates(BaseModel):
    StartDate: Optional[str]
    EndDate: Optional[str]

class EntitySchema(BaseModel):
    Parties: List[str]
    EffectiveDates: EffectiveDates
    Terms: List[str]
    Obligations: List[str]
    Financials: List[str]
    LegalClauses: List[str]
    ServiceLevels: List[str]
    TerminationDetails: List[str]
    KeyDefinitions: List[str]
    Signatories: List[str]

# # Example usage
# example_data = {
#     "Parties": ["Entity A", "Entity B"],
#     "EffectiveDates": {
#         "StartDate": "YYYY-MM-DD",
#         "EndDate": "YYYY-MM-DD"
#     },
#     "Terms": ["Duration: X months", "Renewal period: Y months"],
#     "Obligations": ["Party A must provide X services", "Party B delivers Y deliverables monthly"],
#     "Financials": ["Total cost: $XXX", "Penalty for breach: $YYY"],
#     "LegalClauses": ["Governing law: State Z", "Arbitration clause applied"],
#     "ServiceLevels": ["Uptime requirement: 99.9%", "Support response time: 4 hours"],
#     "TerminationDetails": ["Termination notice: 30 days", "Early termination fee: $ZZZ"],
#     "KeyDefinitions": ["SLA: Service Level Agreement", "SOW: Statement of Work"],
#     "Signatories": ["Name of Representative A", "Name of Representative B"]
# }
#
# schema_instance = Schema(**example_data)
# print(schema_instance)