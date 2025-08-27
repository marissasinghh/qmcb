import cirq
from app.repositories.quantum_gates import QuantumGateRepository
from app.utils.types import Qubit, Circuit
from app.utils.constants import Gate


class TargetUnitaryRepository:

    @staticmethod
    def get_unitary(name: str, qubits: list[Qubit]) -> Circuit:
        """Returns a cirq.Circuit for a given unitary name."""

        if name == Gate.SWAP.value:
            return cirq.Circuit(
                QuantumGateRepository.apply(
                    Gate.CNOT.value, [0, 1], qubits[0], qubits[1]
                ),
                QuantumGateRepository.apply(
                    Gate.CNOT.value, [1, 0], qubits[0], qubits[1]
                ),
                QuantumGateRepository.apply(
                    Gate.CNOT.value, [0, 1], qubits[0], qubits[1]
                ),
            )

        elif name == Gate.CNOT.value:
            return cirq.Circuit(
                QuantumGateRepository.apply(
                    Gate.CNOT.value, [0, 1], qubits[0], qubits[1]
                )
            )

        raise ValueError(f"Unknown unitary name: {name}")
