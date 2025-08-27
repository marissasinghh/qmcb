/**
 * Frontend level definition for copy/UX. Not used for correctness.
 * Backend remains the source of truth via simulation.
 */

import type { ControlTargetOrder, ToolboxGate } from "../types/global";
import type { TruthTableDTO } from "./truth-table";
import type { TargetUnitary } from "../utils/constants";

/** Shape for a level's UI/UX config. */
export interface LevelDefinition<U extends TargetUnitary = TargetUnitary> {
  target_unitary: U; // e.g., LEVEL_ID.SWAP
  number_of_qubits: number; // how many wires to show
  toolbox: readonly ToolboxGate[]; // primitives in the toolbox

  /**
   * Canonical solution (for hints/docs). The FE does not enforce this;
   * the student can try anything, and the backend will grade via simulation.
   */
  canonical?: {
    gates: readonly ToolboxGate[]; // e.g., [ToolboxGate.CNOT, ...]
    qubit_order: readonly ControlTargetOrder[];
  };

  expectedTruth: TruthTableDTO; // for the Task card (so student knows the goal)
  uiMaxGates?: number; // optional soft UI limit
  description?: string; // optional Task text
}
