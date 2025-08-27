from dataclasses import dataclass, asdict


@dataclass
class TruthTableDTO:
    input: list[str]
    output: list[str]

    def to_dict(self):
        return asdict(self)
