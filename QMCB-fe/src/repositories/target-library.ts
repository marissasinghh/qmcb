/**
 * Frontend level registry for copy/UX. Not used for correctness.
 * We keep canonical solutions here for hints/docs only; FE does not enforce them.
 */

import { ToolboxGate } from "../types/global";
import { LEVEL_ID } from "../utils/constants";
import type { LevelDefinition } from "../dto/level-definition";

/** Level: build SWAP from CNOTs */
export const SWAP_LEVEL: LevelDefinition = {
  target_unitary: LEVEL_ID.SWAP,
  number_of_qubits: 2,
  toolbox: [ToolboxGate.CNOT] as const,

  // Canonical recipe (for hints / "show solution" UI)
  canonical: {
    gates: [ToolboxGate.CNOT, ToolboxGate.CNOT, ToolboxGate.CNOT] as const,
    qubit_order: [
      [0, 1],
      [1, 0],
      [0, 1],
    ] as const,
  },

  // Expected mapping
  expectedTruth: {
    input: ["00", "01", "10", "11"],
    output: ["00", "10", "01", "11"],
  },

  // Soft limit for UX (not correctness)
  uiMaxGates: 6,

  description: "Use the toolbox to build a SWAP gate. SWAP maps |a,b⟩ → |b,a⟩.",
} as const;

/** Optional registry for future levels */
export const LEVELS = {
  SWAP: SWAP_LEVEL,
} as const;

/** Union of level ids (e.g., "SWAP") */
export type LevelId = keyof typeof LEVELS; // "SWAP"
