import cirq
from app.dto.truth_table import TruthTableDTO
from app.utils.helpers import extract_results, list_to_joint_string
from app.utils.types import Circuit


class SimulateCircuitRepository:

    @staticmethod
    def run_circuit(number_of_qubits: int, circuit: Circuit, repetitions: int):
        """
        Runs a circuit through the cirq simulator and returns
        the extracted measurement results.
        """
        simulator = cirq.Simulator()
        result = simulator.run(circuit, repetitions=repetitions)
        print(f"Result test: {result}")
        output = extract_results(number_of_qubits, result)

        return output

    @staticmethod
    def update_truth_table(
        state: list[int], truth_table: TruthTableDTO, output: list[int]
    ) -> None:
        """
        Updates a circuit's truth table with correct input and output results.
        """
        state_str = list_to_joint_string(state)
        truth_table.input.append(state_str)
        truth_table.output.append(str(output))

        return None

    @staticmethod
    def simulate_and_update(
        number_of_qubits: int,
        circuit: Circuit,
        repetitions: int,
        state: list[int],
        truth_table: TruthTableDTO,
    ) -> None:
        """
        Combines the above methods for clean calling.
        """
        output = SimulateCircuitRepository.run_circuit(
            number_of_qubits, circuit, repetitions
        )
        print("Circuit successully ran...")
        SimulateCircuitRepository.update_truth_table(state, truth_table, output)
        print("Truth table updated...")

        return None
