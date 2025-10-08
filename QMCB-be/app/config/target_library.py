from typing import Dict, Any
from app.utils.constants import Gate, LEVEL2_QUBITS, TargetLibraryField, Basis
from app.utils.qubit_orders import Q0, Q1, C0_T1, C1_T0


TARGET_LIBRARY: Dict[str, Dict[str, Any]] = {
    # ========================
    # LEVEL 2.1: CNOT FLIPPED
    # ========================
    Gate.CNOT_FLIPPED.value: {
        TargetLibraryField.NUM_QUBITS.value: LEVEL2_QUBITS,
        TargetLibraryField.STEPS.value: [
            {
                TargetLibraryField.GATE.value: Gate.H.value,
                TargetLibraryField.ORDER.value: Q0,
            },
            {
                TargetLibraryField.GATE.value: Gate.H.value,
                TargetLibraryField.ORDER.value: Q1,
            },
            {
                TargetLibraryField.GATE.value: Gate.CNOT.value,
                TargetLibraryField.ORDER.value: C1_T0,
            },
            {
                TargetLibraryField.GATE.value: Gate.H.value,
                TargetLibraryField.ORDER.value: Q0,
            },
            {
                TargetLibraryField.GATE.value: Gate.H.value,
                TargetLibraryField.ORDER.value: Q1,
            },
        ],
        TargetLibraryField.EXPECTED_OUTPUTS.value: [
            Basis.STATE_00.value,
            Basis.STATE_11.value,
            Basis.STATE_10.value,
            Basis.STATE_01.value,
        ],
    },
    # ========================
    # LEVEL 2.2: CONTROLLED-Z
    # ========================
    Gate.CONTROLLED_Z.value: {
        TargetLibraryField.NUM_QUBITS.value: LEVEL2_QUBITS,
        TargetLibraryField.STEPS.value: [
            {
                TargetLibraryField.GATE.value: Gate.H.value,
                TargetLibraryField.ORDER.value: Q1,
            },
            {
                TargetLibraryField.GATE.value: Gate.CNOT.value,
                TargetLibraryField.ORDER.value: C0_T1,
            },
            {
                TargetLibraryField.GATE.value: Gate.H.value,
                TargetLibraryField.ORDER.value: Q1,
            },
        ],
        TargetLibraryField.EXPECTED_OUTPUTS.value: [
            Basis.STATE_00.value,
            Basis.STATE_01.value,
            Basis.STATE_10.value,
            Basis.STATE_11.value,
        ],
    },
    # =================
    # LEVEL 2.3: SWAP
    # =================
    Gate.SWAP.value: {
        TargetLibraryField.NUM_QUBITS.value: LEVEL2_QUBITS,
        TargetLibraryField.STEPS.value: [
            {
                TargetLibraryField.GATE.value: Gate.CNOT.value,
                TargetLibraryField.ORDER.value: C0_T1,
            },
            {
                TargetLibraryField.GATE.value: Gate.CNOT.value,
                TargetLibraryField.ORDER.value: C1_T0,
            },
            {
                TargetLibraryField.GATE.value: Gate.CNOT.value,
                TargetLibraryField.ORDER.value: C0_T1,
            },
        ],
        TargetLibraryField.EXPECTED_OUTPUTS.value: [
            Basis.STATE_00.value,
            Basis.STATE_10.value,
            Basis.STATE_01.value,
            Basis.STATE_11.value,
        ],
    },
}
