from dataclasses import dataclass
from app.utils.constants import Gate


@dataclass
class UnitaryDTO:
    number_of_qubits: int
    gates: list[Gate]
    qubit_order: list[list[int]]
