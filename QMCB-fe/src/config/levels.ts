/**
 * LEVEL DEFINITIONS:
 * Frontend level registry for copy/UX.
 * We keep canonical solutions here for hints/docs only; FE does not enforce them.
 */

import { Gate } from "../types/global";
import {
  MAX_GATES,
  LEVEL2_QUBITS,
  SINGLE_QUBIT_GATES,
  Q0,
  Q1,
  C0_T1,
  C1_T0,
  TWO_QUBIT_INPUTS,
  BASIS_00,
  BASIS_01,
  BASIS_10,
  BASIS_11,
} from "../utils/constants";
import type { LevelDefinition } from "../interfaces/levelDefinition";

// ========================
// LEVEL 2.1: CNOT FLIPPED
// ========================
export const CNOT_FLIPPED_LEVEL: LevelDefinition = {
  target_unitary: Gate.CNOT_FLIPPED,
  number_of_qubits: LEVEL2_QUBITS,
  toolbox: [...SINGLE_QUBIT_GATES] as const,

  canonical: [
    { gate: Gate.H, order: Q0 },
    { gate: Gate.H, order: Q1 },
    { gate: Gate.CNOT, order: C1_T0 },
    { gate: Gate.H, order: Q0 },
    { gate: Gate.H, order: Q1 },
  ],

  expectedTruth: {
    input: TWO_QUBIT_INPUTS,
    output: [BASIS_00, BASIS_11, BASIS_10, BASIS_01],
  },

  uiMaxGates: MAX_GATES,

  description: "Build a CNOT gate with flipped control and target qubits.",
} as const;

// ========================
// LEVEL 2.2: CONTROLLED Z
// ========================
export const CONTROLLED_Z_LEVEL: LevelDefinition = {
  target_unitary: Gate.CONTROLLED_Z,
  number_of_qubits: LEVEL2_QUBITS,
  toolbox: [...SINGLE_QUBIT_GATES, Gate.CNOT] as const,

  canonical: [
    { gate: Gate.H, order: Q1 },
    { gate: Gate.CNOT, order: C0_T1 },
    { gate: Gate.H, order: Q1 },
  ],

  expectedTruth: {
    input: TWO_QUBIT_INPUTS,
    output: [BASIS_00, BASIS_01, BASIS_10, BASIS_11],
  },

  uiMaxGates: MAX_GATES,

  description: "Build a Controlled-Z gate. CZ applies a phase flip when both qubits are |1⟩.",
} as const;

// =================
// LEVEL 2.3: SWAP
// =================
export const SWAP_LEVEL: LevelDefinition = {
  target_unitary: Gate.SWAP,
  number_of_qubits: LEVEL2_QUBITS,
  toolbox: [...SINGLE_QUBIT_GATES, Gate.CNOT, Gate.CONTROLLED_Z] as const,

  canonical: [
    { gate: Gate.CNOT, order: C0_T1 },
    { gate: Gate.CNOT, order: C1_T0 },
    { gate: Gate.CNOT, order: C0_T1 },
  ],

  expectedTruth: {
    input: TWO_QUBIT_INPUTS,
    output: [BASIS_00, BASIS_10, BASIS_01, BASIS_11],
  },

  uiMaxGates: MAX_GATES,

  description: "Build a SWAP gate from CNOTs. SWAP maps |a,b⟩ → |b,a⟩.",
} as const;

//---------------------------------------------------------------------------------------
/** Registry of all available levels */
export const LEVELS = {
  CNOT_FLIPPED: CNOT_FLIPPED_LEVEL,
  CONTROLLED_Z: CONTROLLED_Z_LEVEL,
  SWAP: SWAP_LEVEL,
} as const;

/** Union of level ids */
export type LevelId = keyof typeof LEVELS;
