import cirq
from typing import Union
from typing import TypedDict

Qubit = Union[cirq.Qid, cirq.LineQubit, cirq.GridQubit]
Circuit = cirq.Circuit
Operation = cirq.Operation
Result = cirq.Result


class TargetLibraryEntry(TypedDict):
    num_qubits: int
    gates: list[str]
    qubit_order: list[list[int]]
