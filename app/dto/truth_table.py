from dataclasses import dataclass, asdict


@dataclass
class TruthTableDTO:
    input: list[int]
    output: list[int]

    def to_dict(self):
        return asdict(self)
