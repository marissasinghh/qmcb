# Simulating the info we'd get from frontend via JSON
import cirq
from app.utils.constants import Gate
from app.repositories.construct_circuit import ConstructCircuitRepository
from app.repositories.simulate_circuit import SimulateCircuitRepository
from app.repositories.quantum_gates import QuantumGateRepository
from app.utils.helpers import initialize_qubit_sequence
from app.dto.unitary import UnitaryDTO


# Manually putting in given info
json = [Gate.SWAP, 2, [Gate.CNOT, Gate.CNOT, Gate.CNOT], [[0, 1], [1, 0], [0, 1]]]
trial_dto = UnitaryDTO(json[1], json[2], json[3])

# Doing one state at a time EXPLICITLY 
state00 = [1, 0]

# Qubits
qubits = initialize_qubit_sequence(trial_dto.number_of_qubits)

# Running through circuit building
# BASIS CIRCUIT
basis_test_circuit = ConstructCircuitRepository.prepare_basis_state(qubits, state00)
measure = ConstructCircuitRepository.measure_qubits(qubits)
basis_test_circuit.append(measure)

# Doing measurement check at each location...
basis_results = SimulateCircuitRepository.run_circuit(trial_dto.number_of_qubits, basis_test_circuit, 1)
print(f"Basis Results: {basis_results}")

# BASE CIRCUIT 1st CNOT
basis_circuit = ConstructCircuitRepository.prepare_basis_state(qubits, state00)
print(f"For qubit order: {trial_dto.qubit_order[0]}")
operations = [QuantumGateRepository.apply(Gate.CNOT, qubit_order=trial_dto.qubit_order[0], *qubits)]
basis_circuit.append(cirq.Circuit(operations))
basis_circuit.append(measure)
base_results = SimulateCircuitRepository.run_circuit(trial_dto.number_of_qubits, basis_circuit, 1)
print(f"First CNOT Results: {base_results}")

# BASE CIRCUIT 2nd CNOT
basis_circuit = ConstructCircuitRepository.prepare_basis_state(qubits, state00)
print(f"For qubit order: {trial_dto.qubit_order[1]}")
operations = [QuantumGateRepository.apply(Gate.CNOT, *qubits, qubit_order=trial_dto.qubit_order[0]),
              QuantumGateRepository.apply(Gate.CNOT, *qubits, qubit_order=trial_dto.qubit_order[1])]
basis_circuit.append(cirq.Circuit(operations))
basis_circuit.append(measure)
base_results = SimulateCircuitRepository.run_circuit(trial_dto.number_of_qubits, basis_circuit, 1)
print(base_results)
print(f"Second CNOT Results: {base_results}")

# BASE CIRCUIT 3rd CNOT
basis_circuit = ConstructCircuitRepository.prepare_basis_state(qubits, state00)
print(f"For qubit order: {trial_dto.qubit_order[2]}")
operations = [QuantumGateRepository.apply(Gate.CNOT, *qubits, qubit_order=trial_dto.qubit_order[0]),
              QuantumGateRepository.apply(Gate.CNOT, *qubits, qubit_order=trial_dto.qubit_order[1]),
              QuantumGateRepository.apply(Gate.CNOT, *qubits, qubit_order=trial_dto.qubit_order[2])]
basis_circuit.append(cirq.Circuit(operations))
basis_circuit.append(measure)
base_results = SimulateCircuitRepository.run_circuit(trial_dto.number_of_qubits, basis_circuit, 1)
print(f"Third CNOT Results: {base_results}")


