/**
 * Handles circuit validation against the backend.
 * Submits student's circuit and compares against target.
 */

import { useMutation } from "@tanstack/react-query";
import { simulateUnitary } from "../services/simulate";
import { buildRequestFromLevel, toTruthRows } from "../controllers/simulate";
import type { LevelDefinition } from "../interfaces/levelDefinition";
import type { PlacedGate } from "../types/global";

export function useCircuitValidation(currentLevel: LevelDefinition, gates: PlacedGate[]) {
  const mutation = useMutation({ mutationFn: simulateUnitary });

  const rows = mutation.data ? toTruthRows(mutation.data) : null;
  const allCorrect = rows?.every((r) => r.ok) ?? false;

  const handleCheck = () => {
    if (gates.length === 0) return;
    const body = buildRequestFromLevel(currentLevel, gates);
    mutation.mutate(body);
  };

  return {
    mutation,
    rows,
    allCorrect,
    handleCheck,
  };
}
