/**
 * React state wrapper around the pure circuit repo.
 * Components use these functions to mutate the circuit.
 */

import { useState, useCallback } from "react";
import {
  ToolboxGate,
  type PlacedGate,
  type PlacedCNOT,
  type PlacedSingle,
  type ControlTargetOrder,
} from "../types/global";
import { DEFAULT_QUBIT_ORDER } from "../utils/constants";

export function useCircuit() {
  /** Current circuit, as an ordered list of placed gate chips. */
  const [gates, setGates] = useState<PlacedGate[]>([]);

  /** Add a CNOT with default order at the end of the sequence. */
  const addCNOT = useCallback(() => {
    const g: PlacedCNOT = {
      id: crypto.randomUUID(),
      type: ToolboxGate.CNOT,
      order: DEFAULT_QUBIT_ORDER,
      column: gates.length,
    };
    setGates((prev) => [...prev, g]);
  }, [gates.length]);

  const addSingle = useCallback(
    (type: ToolboxGate.H | ToolboxGate.T, wire: 0 | 1) => {
      const g: PlacedSingle = {
        id: crypto.randomUUID(),
        type,
        wire,
        column: gates.length,
      };
      setGates((prev) => [...prev, g]);
    },
    [gates.length]
  );

  const setGateOrder = useCallback((id: string, order: ControlTargetOrder) => {
    setGates((prev) =>
      prev.map((g) => (g.id === id && g.type === ToolboxGate.CNOT ? { ...g, order } : g))
    );
  }, []);

  /** Remove a chip by id. */
  const removeGate = useCallback((id: string) => {
    setGates((prev) => prev.filter((g) => g.id !== id).map((g, i) => ({ ...g, column: i })));
  }, []);

  /** Clear the circuit. */
  const clearAll = useCallback(() => setGates([]), []);

  return { gates, addCNOT, addSingle, setGateOrder, removeGate, clearAll };
}
