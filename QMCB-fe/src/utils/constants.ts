/**
 * Runtime constants shared across the app.
 * NOTE: This module may import types from src/types, but types MUST NOT import this module
 * to avoid circular dependency (values → types → values).
 */

import type { ControlTargetOrder } from "../types/global";

export const MAX_GATES = 10;
export const NUMBER_OF_QUBITS = 2 as const;

/** Legal control–target orders to *offer* for 2-qubit primitives like CNOT */
export const ALLOWED_QUBIT_ORDERS: readonly ControlTargetOrder[] = [
  [0, 1],
  [1, 0],
] as const;

/** Default order when a chip is dropped onto the canvas */
export const DEFAULT_QUBIT_ORDER: ControlTargetOrder = [0, 1] as const;

/** Single source of truth for target identifiers */
export const LEVEL_ID = {
  SWAP: "SWAP",
  S: "S",
  T: "T",
  // Add more targets here
} as const;

/** Type derived from LEVEL_ID so strings and types can’t drift */
export type TargetUnitary = (typeof LEVEL_ID)[keyof typeof LEVEL_ID];
