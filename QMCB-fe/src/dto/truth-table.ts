/**
 * DTO: shape of a truth table returned by the backend.
 * Mirrors backend response fields exactly.
 */

export interface TruthTableDTO {
  input: string[];
  output: string[];
}
