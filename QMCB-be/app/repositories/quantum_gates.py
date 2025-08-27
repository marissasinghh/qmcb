import cirq
from app.utils.types import Operation, Qubit
from app.utils.constants import Gate
from typing import Optional


class QuantumGateRepository:

    @staticmethod
    def apply(
        gate: str, qubit_order: Optional[list[int]] = None, *qubits: Qubit
    ) -> Operation:
        """
        Apply the desired quantum gate to the provided qubit(s).
        """

        # To handle cases where qubit order is not necessary
        # (ex. gates that act on a single qubit):
        if qubit_order is None:
            qubit_order = list(range(len(qubits)))

        selected_qubits = [qubits[i] for i in qubit_order]

        print(
            f"[DEBUG] Gate: {gate}, Qubit Order: {qubit_order}, "
            f"Selected Qubits: {[str(q) for q in selected_qubits]}"
        )

        if gate == Gate.X.value:
            return cirq.X(selected_qubits[0])

        elif gate == Gate.H.value:
            return cirq.H(selected_qubits[0])

        elif gate == Gate.S.value:
            return cirq.S(selected_qubits[0])

        elif gate == Gate.T.value:
            return cirq.T(selected_qubits[0])

        elif gate == Gate.CNOT.value:
            return cirq.CNOT(selected_qubits[0], selected_qubits[1])

        elif gate == Gate.CZ.value:
            return cirq.CZ(selected_qubits[0], selected_qubits[1])

        elif gate == Gate.SWAP.value:
            return cirq.SWAP(selected_qubits[0], selected_qubits[1])

        else:
            raise ValueError(f"Unsupported gate: {gate}")
