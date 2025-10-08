import cirq
from typing import TypedDict, List, Union

Qubit = Union[cirq.Qid, cirq.LineQubit, cirq.GridQubit]
Circuit = cirq.Circuit
Operation = cirq.Operation
Result = cirq.Result
WavefunctionResult = cirq.StateVectorTrialResult


class TargetLibraryEntry(TypedDict):
    num_qubits: int
    gates: list[str]
    qubit_order: list[list[int]]


class GateStep(TypedDict):
    """
    A single step in a quantum circuit: gate + qubit placement.
    """

    gate: str
    order: List[int]


class LevelDefinition(dict):
    """Level configuration with canonical solution"""

    num_qubits: int
    steps: List[GateStep]
    expected_outputs: List[str]
