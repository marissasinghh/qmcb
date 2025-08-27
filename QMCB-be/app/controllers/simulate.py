from app.repositories.construct_circuit import ConstructCircuitRepository
from app.repositories.simulate_circuit import SimulateCircuitRepository
from app.utils.helpers import initialize_qubit_sequence
from app.dto.unitary import UnitaryDTO
from app.dto.truth_table import TruthTableDTO
from typing import Any
import logging


def simulate_unitaries(
    trial_dto: UnitaryDTO, target_dto: UnitaryDTO
) -> tuple[dict[str, Any], int]:

    # Initializing qubits and starting basis states
    qubits = initialize_qubit_sequence(trial_dto.number_of_qubits)
    basis_states = [[0, 0], [0, 1], [1, 0], [1, 1]]

    # Preparing truth tables
    trial_truth_table_dto = TruthTableDTO([], [])
    target_truth_table_dto = TruthTableDTO([], [])

    # Running simulations for each basis state
    for state in basis_states:

        logging.info(f"Constructing circuit for state: {state}")

        # Constructing Circuits for specified starting basis state
        trial_circuit = ConstructCircuitRepository.construct_unitary_circuit(
            state, trial_dto.gates, trial_dto.qubit_order, qubits
        )
        target_circuit = ConstructCircuitRepository.construct_unitary_circuit(
            state, target_dto.gates, target_dto.qubit_order, qubits
        )

        # Printing circuits
        logging.info("Passed circuit construction successfully.")
        print("Trial Circuit:")
        print(trial_circuit)
        print("Target Circuit:")
        print(target_circuit)

        # Simulating the circuit and updating the truth table
        repetitions = 1  # How many times we want to run the circuit
        SimulateCircuitRepository.simulate_and_update(
            trial_dto.number_of_qubits,
            trial_circuit,
            repetitions,
            state,
            trial_truth_table_dto,
        )
        SimulateCircuitRepository.simulate_and_update(
            target_dto.number_of_qubits,
            target_circuit,
            repetitions,
            state,
            target_truth_table_dto,
        )
        logging.info("Passed simulation and results of circuit successfully!")

    # Printing results
    print("Results:")
    print(trial_truth_table_dto)
    print(target_truth_table_dto)

    return {
        "message": "Successfully simulated trial and target unitaries.",
        "trial_truth_table": trial_truth_table_dto.to_dict(),
        "target_truth_table": target_truth_table_dto.to_dict(),
    }, 200
