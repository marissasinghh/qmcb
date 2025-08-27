/**
 * Domain-wide TypeScript types.
 * - Types only (no runtime constants here).
 * - Frontend does not simulate; these describe UI/domain shapes we pass to the backend.
 */

/** Primitive gates the student can place (exact strings your backend expects). */
export enum ToolboxGate {
  CNOT = "CNOT",
  H = "H",
  T = "T", // T here represents Rz(θ) per your backend contract
}

/** For single-qubit placement: which wire the chip sits on. */
export type SingleWire = 0 | 1;

/** Order type that can represent any 2-bit pair */
export type AnyQubitOrder = readonly [0 | 1, 0 | 1]; // covers [0,0], [1,1], [0,1], [1,0]

/** Control–target assignment for a 2-qubit gate: [control, target]. */
export type ControlTargetOrder = readonly [0, 1] | readonly [1, 0];

/** Two-qubit CNOT chip placed on the canvas. */
export type PlacedCNOT = {
  id: string; // uuid (crypto.randomUUID())
  type: ToolboxGate.CNOT; // discriminant
  order: ControlTargetOrder; // control→target
  column: number; // visual sequence position (left→right)
};

/** Single-qubit chip (H or T) placed on a specific wire. */
export type PlacedSingle = {
  id: string; // uuid
  type: ToolboxGate.H | ToolboxGate.T; // discriminant
  wire: SingleWire; // 0 = |a⟩, 1 = |b⟩
  column: number; // visual sequence position
};

/** Any placed gate on the canvas (discriminated union). */
export type PlacedGate = PlacedCNOT | PlacedSingle;
