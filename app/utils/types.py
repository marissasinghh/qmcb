import cirq
from typing import Union

Qubit = Union[cirq.Qid, cirq.LineQubit, cirq.GridQubit]
Circuit = cirq.Circuit
Operation = cirq.Operation
Result = cirq.Result
