from typing import Dict
from app.utils.types import TargetLibraryEntry
from app.utils.constants import Gate, TargetLibraryField

TARGET_LIBRARY: Dict[str, TargetLibraryEntry] = {
    Gate.SWAP.value: {
        TargetLibraryField.NUM_QUBITS.value: 2,
        TargetLibraryField.GATES.value: [
            Gate.CNOT.value,
            Gate.CNOT.value,
            Gate.CNOT.value,
        ],
        TargetLibraryField.QUBIT_ORDER.value: [[0, 1], [1, 0], [0, 1]],
    }
}
