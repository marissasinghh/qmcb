import cirq
from app.repositories.quantum_gates import QuantumGateRepository
from app.utils.helpers import index_to_letter
from app.utils.types import Qubit, Circuit
from app.utils.constants import Gate


class ConstructCircuitRepository:

    @staticmethod
    def prepare_basis_state(basis_state: list[int], qubits: list[Qubit]) -> Circuit:
        """
        Creates a circuit that prepares the qubits in a specified basis state.

        Args:
            basis_state: List of desired basis state (i.e.[0, 1], [1, 0], etc.)
            qubits: List of Cirq qubits.

        Returns:
            A Cirq Circuit that sets the qubits to the given state.
        """
        operations = []

        if len(basis_state) != len(qubits):
            raise ValueError(
                "Length of desired basis state must match number of qubits."
            )

        for state, qubit in zip(basis_state, qubits):
            if state == 1:
                operations.append(
                    QuantumGateRepository.apply(Gate.X.value, None, qubit)
                )

        return cirq.Circuit(operations)

    @staticmethod
    def build_circuit_base(
        gates: list[str], qubit_order: list[list[int]], qubits: list[Qubit]
    ) -> Circuit:
        """
        Creates a circuit based on the order of gate operations for a specified
        number of qubits.
        """
        operations = []

        print("Qubit Order Check")  # DEBUG

        for i in range(len(gates)):

            print(f"Applying {gates[i]} for order {qubit_order[i]}")
            operations.append(
                QuantumGateRepository.apply(gates[i], qubit_order[i], *qubits)
            )

        return cirq.Circuit(operations)

    @staticmethod
    def measure_qubits(qubits: list[Qubit]) -> Circuit:
        """
        Creates a circuit to measures each qubit at the end
        of a circuit sequence.
        """
        operations = []

        # Measurement Note:
        #   qubit0  is being assigned key 'a'
        #   qubit1 is being assigned key 'b'

        for i in range(0, len(qubits)):
            key_letter = index_to_letter(i)
            operations.append(cirq.measure(qubits[i], key=key_letter))

        return cirq.Circuit(operations)

    @staticmethod
    def construct_unitary_circuit(
        basis_state: list[int],
        gates: list[str],
        qubit_order: list[list[int]],
        qubits: list[Qubit],
    ) -> Circuit:
        """
        Combines the above methods for clean calling.
        """
        circuit = ConstructCircuitRepository.prepare_basis_state(basis_state, qubits)
        print("Prepared basis state...")
        circuit.append(
            ConstructCircuitRepository.build_circuit_base(gates, qubit_order, qubits)
        )
        print("Built circuit base...")
        circuit.append(ConstructCircuitRepository.measure_qubits(qubits))
        print("Ready for measurement...")

        return circuit
