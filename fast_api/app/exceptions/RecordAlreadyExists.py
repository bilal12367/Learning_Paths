

class RecordAlreadyExists:
    def __init__(self, key: str = "No key"):
        self.key = key
        self.message = f"The value already exists in {self.key} column."