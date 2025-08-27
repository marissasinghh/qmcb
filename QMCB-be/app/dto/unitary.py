from dataclasses import dataclass


@dataclass
class UnitaryDTO:
    number_of_qubits: int
    gates: list[str]
    qubit_order: list[list[int]]
