/**
 * DTO: shape of a truth table returned by the backend.
 */

export interface TruthTableDTO {
  input: readonly string[];
  output: readonly string[];
}
