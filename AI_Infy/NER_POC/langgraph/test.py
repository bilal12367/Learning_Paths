from langgraph.graph import StateGraph, START, END
from typing import TypedDict, List, Dict, Any

class MyState(TypedDict, total=False):
    key1: int
    key2: int
    key3: int
    fin: bool
    

graph = StateGraph(state_schema=MyState)

def incKey1(state: MyState):
    return {"key1": state.get("key1") + 1, "key3": 4, "fin": True}

def incKey2(state: MyState):
    return {"key2": state.get("key2") + 1}
def incKey3(state: MyState):
    return {"key3": state.get("key2") + 1, "key1": state.get("key1") - 1}
def comb(state: MyState):
    print(state)
    return { "fin": True}

graph.add_node("a", incKey1)
graph.add_node("b", incKey2)
graph.add_node("d", incKey3)
graph.add_node("c", comb)

graph.add_edge(START,"a")
graph.add_edge(START,"b")
graph.add_edge("a", "c")
graph.add_edge("a","d")
graph.add_edge("d","c")
graph.add_edge("b", "c")
graph.add_edge("c", END)

app = graph.compile()

resp = app.invoke({
    "key1": 1,
    "key2": 1,
    "key3": 2,
    "fin": False
})

print(resp)

