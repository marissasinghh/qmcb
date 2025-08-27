import cirq
from app.repositories.quantum_gates import QuantumGateRepository
from app.repositories.target_library import TARGET_LIBRARY
from app.utils.types import Qubit, Operation, Result
from app.utils.constants import Gate, TargetLibraryField


def initialize_qubit_sequence(number_of_qubits: int) -> list[Qubit]:
    """
    Creates a linear sequence of n qubits and returns list of callable
    qubits in sequential order.
    """
    qubit_sequence: list[Qubit] = []

    for n in range(number_of_qubits):
        qubit_sequence.append(cirq.LineQubit(n))

    return qubit_sequence


def set_qubit_to_1(qubit: Qubit) -> Operation:
    """
    Prepares the |1> basis state for a qubit.
    """
    return QuantumGateRepository.apply(Gate.X.value, None, qubit)


def get_target_gates(target_name: str) -> list[str]:
    """
    Retrieves list of quantum gates needed to construct a target unitary.
    """
    if target_name not in TARGET_LIBRARY:
        raise ValueError(f"Target gate {target_name} not found in library.")

    target_key = TARGET_LIBRARY[target_name]
    gate_list = target_key[TargetLibraryField.GATES.value]

    return gate_list


def get_qubit_order(target_name: str) -> list[list[int]]:
    """
    Retrieves list of qubit order needed to properly apply quantum gates.
    """
    if target_name not in TARGET_LIBRARY:
        raise ValueError(f"Target gate {target_name} not found in library.")

    info = TARGET_LIBRARY[target_name]
    qubit_order = info[TargetLibraryField.QUBIT_ORDER.value]

    return qubit_order


def index_to_letter(index: int) -> str:
    """
    Returns the corresponding letter for a given number. Ex. 1 --> a.
    """
    if 0 <= index < 26:
        return chr(ord("a") + index)
    raise ValueError("Index must be between 0 and 25.")


def list_to_joint_string(arbitrary_list: list[int]) -> str:
    """
    Turns arbitrary list of ints into a joint string.
    """
    return "".join(str(i) for i in arbitrary_list)


def extract_results(number_of_qubits: int, result: Result) -> str:
    """
    Extracts the measurement results for each qubit and returns them
    in a joint string format.
    """
    output_bits = []

    for i in range(number_of_qubits):
        key = chr(ord("a") + i)  # Assumes keys are 'a', 'b', ...
        bit = result.measurements[key][0][0]
        output_bits.append(str(bit))

    return "".join(output_bits)
