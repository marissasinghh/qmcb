from app.controllers.simulate import simulate_unitaries
from app.utils.helpers import get_target_gates, get_qubit_order
from app.utils.constants import Gate
from app.dto.unitary import UnitaryDTO

# Simulating the info we'd get from frontend via JSON
json = ["SWAP", 2, ["CNOT", "CNOT", "CNOT"], [[0, 1], [1, 0], [0, 1]]]
trial_dto = UnitaryDTO(json[1], json[2], json[3])
target_dto = UnitaryDTO(json[1], get_target_gates(json[0]), get_qubit_order(json[0]))

print("Verifying Qubit Order...") #DEBUG
print(f"Trial Qubit Order: {trial_dto.qubit_order}")
print(f"Target Qubit Order: {target_dto.qubit_order}")

trial_truth_table, target_truth_table = simulate_unitaries (trial_dto, target_dto)