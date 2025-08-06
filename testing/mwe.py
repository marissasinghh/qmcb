from app.controllers.simulate import simulate_unitaries
from app.utils.helpers import get_target_gates, get_qubit_order
from app.dto.unitary import UnitaryDTO

# Simulating the info we'd get from frontend via JSON
json_gate: str = "SWAP"
json_num_qubits: int = 2
json_gates: list[str] = ["CNOT", "CNOT", "CNOT"]
json_qubit_order: list[list[int]] = [[0, 1], [1, 0], [0, 1]]

# Construct DTOs
trial_dto = UnitaryDTO(json_num_qubits, json_gates, json_qubit_order)
target_dto = UnitaryDTO(
    json_num_qubits, get_target_gates(json_gate), get_qubit_order(json_gate)
)

# Debugging output
print("Verifying Qubit Order...")
print(f"Trial Qubit Order: {trial_dto.qubit_order}")
print(f"Target Qubit Order: {target_dto.qubit_order}")

# Run simulation
trial_truth_table, target_truth_table = simulate_unitaries(trial_dto, target_dto)
