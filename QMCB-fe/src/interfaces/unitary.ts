/**
 * DTO: request sent to the backend to simulate the student's circuit
 * against the target unitary for the current level.
 */

import type { AnyQubitOrder } from "../types/global";
import type { Gate } from "../types/global";

export interface UnitaryRequestDTO {
  target_unitary: Gate;
  number_of_qubits: number;
  gates: Gate[]; // "CNOT" | "H" | "T"
  qubit_order: AnyQubitOrder[]; // now allows [0,0] / [1,1] too
}
