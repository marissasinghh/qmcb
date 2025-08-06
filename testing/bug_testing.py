import cirq
from app.utils.constants import Gate
from app.repositories.construct_circuit import ConstructCircuitRepository
from app.repositories.simulate_circuit import SimulateCircuitRepository
from app.repositories.quantum_gates import QuantumGateRepository
from app.utils.helpers import initialize_qubit_sequence
from app.dto.unitary import UnitaryDTO

# Simulating frontend JSON input
json_gate = Gate.SWAP.value
json_num_qubits = 2
json_gates = [Gate.CNOT.value, Gate.CNOT.value, Gate.CNOT.value]
json_qubit_order = [[0, 1], [1, 0], [0, 1]]

trial_dto = UnitaryDTO(
    number_of_qubits=json_num_qubits, gates=json_gates, qubit_order=json_qubit_order
)

# Example basis state
state00 = [1, 0]

# Get qubits
qubits = initialize_qubit_sequence(trial_dto.number_of_qubits)

# Run basis test
basis_test_circuit = ConstructCircuitRepository.prepare_basis_state(state00, qubits)
measure = ConstructCircuitRepository.measure_qubits(qubits)
basis_test_circuit.append(measure)

basis_results = SimulateCircuitRepository.run_circuit(
    trial_dto.number_of_qubits, basis_test_circuit, 1
)
print(f"Basis Results: {basis_results}")

# First CNOT
basis_circuit = ConstructCircuitRepository.prepare_basis_state(state00, qubits)
print(f"For qubit order: {trial_dto.qubit_order[0]}")
operations = [
    QuantumGateRepository.apply(json_gates[0], trial_dto.qubit_order[0], *qubits)
]
basis_circuit.append(cirq.Circuit(operations))
basis_circuit.append(measure)

base_results = SimulateCircuitRepository.run_circuit(
    trial_dto.number_of_qubits, basis_circuit, 1
)
print(f"First CNOT Results: {base_results}")

# Second CNOT
basis_circuit = ConstructCircuitRepository.prepare_basis_state(state00, qubits)
print(f"For qubit order: {trial_dto.qubit_order[1]}")
operations = [
    QuantumGateRepository.apply(json_gates[0], trial_dto.qubit_order[0], *qubits),
    QuantumGateRepository.apply(json_gates[1], trial_dto.qubit_order[1], *qubits),
]
basis_circuit.append(cirq.Circuit(operations))
basis_circuit.append(measure)

base_results = SimulateCircuitRepository.run_circuit(
    trial_dto.number_of_qubits, basis_circuit, 1
)
print(f"Second CNOT Results: {base_results}")

# Third CNOT
basis_circuit = ConstructCircuitRepository.prepare_basis_state(state00, qubits)
print(f"For qubit order: {trial_dto.qubit_order[2]}")
operations = [
    QuantumGateRepository.apply(json_gates[0], trial_dto.qubit_order[0], *qubits),
    QuantumGateRepository.apply(json_gates[1], trial_dto.qubit_order[1], *qubits),
    QuantumGateRepository.apply(json_gates[2], trial_dto.qubit_order[2], *qubits),
]
basis_circuit.append(cirq.Circuit(operations))
basis_circuit.append(measure)

base_results = SimulateCircuitRepository.run_circuit(
    trial_dto.number_of_qubits, basis_circuit, 1
)
print(f"Third CNOT Results: {base_results}")
