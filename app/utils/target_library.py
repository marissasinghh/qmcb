from app.utils.constants import Gate, TargetLibraryField

TARGET_LIBRARY = {
    Gate.SWAP.value: {
        TargetLibraryField.NUM_QUBITS: 2,
        TargetLibraryField.GATES: [Gate.CNOT.value, Gate.CNOT.value, Gate.CNOT.value],
        TargetLibraryField.QUBIT_ORDER: [[0, 1], [1, 0], [0, 1]],
    }
}
