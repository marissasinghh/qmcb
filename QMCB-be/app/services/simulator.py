import cirq
import numpy as np
from app.dto.truth_table import TruthTableDTO
from app.utils.helpers import extract_results, format_ket, list_to_joint_string
from app.utils.types import Circuit, Qubit


class CircuitSimulator:

    # ---------- wavefunction path (no measurement) ----------
    @staticmethod
    def simulate_wavefunction(
        circuit: Circuit, qubits: list[Qubit], *, decimals: int = 3
    ) -> str:
        """
        Deterministically simulate and return the final state as a Dirac-notation string.
        """
        sim = cirq.Simulator()
        # Pass qubit_order to fix basis ordering in the pretty string:
        result = sim.simulate(circuit, qubit_order=qubits)
        formatted_psi = cirq.dirac_notation(
            result.final_state_vector, decimals=decimals
        )
        return formatted_psi

    @staticmethod
    def wavefunction_truth_table(
        state: list[int],
        truth_table: TruthTableDTO,
        output: str,
        *,
        input_as_ket: bool = True,
    ) -> None:
        """
        Append a single row to the truth table.
        - Input column stored as '|01>' when input_as_ket=True (default), else '01'.
        - Output column stored as the Dirac-notation string produced by Cirq.
        """
        inp = format_ket(state) if input_as_ket else list_to_joint_string(state)
        truth_table.input.append(inp)
        truth_table.output.append(output)

        return None

    # ---------- sampling path (with measurement) ----------
    @staticmethod
    def run_and_measure(number_of_qubits: int, circuit: Circuit):
        """
        Runs a circuit through the cirq simulator, executes a measurement
        at the end of the circuit, and returns the extracted results.
        """
        simulator = cirq.Simulator()
        result = simulator.run(circuit, repetitions=1)  
        print(f"Result test: {result}")
        output = extract_results(number_of_qubits, result)

        return output

    @staticmethod
    def measurement_truth_table(
        state: list[int], truth_table: TruthTableDTO, output: list[int]
    ) -> None:
        """
        Updates a circuit's truth table with correct input and output results.
        """
        state_str = list_to_joint_string(state)
        truth_table.input.append(state_str)
        truth_table.output.append(str(output))

        return

    #  ---------- full wrapper ----------
    @staticmethod
    def simulate_and_update(
        circuit: Circuit,
        qubits: list[Qubit],
        state: list[int],
        truth_table: TruthTableDTO,
        *,
        decimals: int = 3,
        input_as_ket: bool = True,
    ) -> None:
        """
        Single-call wrapper: simulate the wavefunction and record a truth-table row.
        """
        output = CircuitSimulator.simulate_wavefunction(
            circuit, qubits, decimals=decimals
        )
        print("Circuit successully ran...")
        CircuitSimulator.wavefunction_truth_table(
            state, truth_table, output, input_as_ket=input_as_ket
        )
        print("Truth table updated...")

        return None
