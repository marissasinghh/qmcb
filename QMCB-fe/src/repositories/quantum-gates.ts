/**
 * Primitive-gate UI metadata.
 * Purpose: tell the UI what options to offer (labels, allowed orders, params),
 * never to simulate or enforce target recipes.
 */

import { ToolboxGate, type ControlTargetOrder } from "../types/global";
import { ALLOWED_QUBIT_ORDERS } from "../utils/constants";

/** Legal control–target orders for a given primitive gate (UI dropdown) */
export function allowedOrdersFor(gate: ToolboxGate): readonly ControlTargetOrder[] {
  switch (gate) {
    case ToolboxGate.CNOT:
      return ALLOWED_QUBIT_ORDERS;
    default:
      return ALLOWED_QUBIT_ORDERS; // future-proofing
  }
}

/** Display label for a gate chip. Extend later (e.g., "Rz(θ)") */
export function labelFor(gate: ToolboxGate): string {
  return gate;
}

/**
 * Keeping the functions below for future proofing
 */

export function isValidOrderFor(gate: ToolboxGate, order: ControlTargetOrder): boolean {
  return allowedOrdersFor(gate).some((o) => o[0] === order[0] && o[1] === order[1]);
}

// Will help later when we add X, Rz, etc. (single qubit gates)
export function arityFor(gate: ToolboxGate): 1 | 2 {
  switch (gate) {
    case ToolboxGate.CNOT:
      return 2;
    default:
      return 2; // adjust when adding single-qubit gates
  }
}
