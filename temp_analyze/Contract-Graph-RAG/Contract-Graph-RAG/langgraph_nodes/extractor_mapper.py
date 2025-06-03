from langgraph.constants import Send

from agent_state import State


def extractor_mapper(state: State):
    return [
        Send("extract_entities", {"chunk": chunk}) for chunk in state['chunks']
    ]

