/**
 * Circuit Canvas: contains SVG visualization and gate controls.
 */

import { Gate, type PlacedGate, type ControlTargetOrder } from "../types/global";
import { CNOTGlyph, ControlledZGlyph, HGlyph, TGlyph, SGlyph, RXGlyph, RYGlyph, UGlyph } from "./GateDesign";
import { DroppableStrip } from "./DragAndDropWrappers";
import { allowedOrdersFor } from "../config/gates";

interface CircuitCanvasProps {
  gates: PlacedGate[];
  onRemoveGate: (id: string) => void;
  onSetGateOrder: (id: string, order: ControlTargetOrder) => void;
  onCheck: () => void;
  onClear: () => void;
  isChecking: boolean;
}

// Set of all 2-qubit gates
const TWO_QUBIT_GATES = new Set<Gate>([Gate.CNOT, Gate.CNOT_FLIPPED, Gate.CONTROLLED_Z, Gate.SWAP]);

export function CircuitCanvas({
  gates,
  onRemoveGate,
  onSetGateOrder,
  onCheck,
  onClear,
  isChecking,
}: CircuitCanvasProps) {
  // Canvas geometry
  const COL_W = 90;
  const PAD_X = 100;
  const CANVAS_W = Math.max(600, PAD_X * 2 + Math.max(1, gates.length) * COL_W);
  const CANVAS_H = 250;
  const yA = 80;
  const yB = 160;
  const CNOT_W = 80;
  const CNOT_H = yB - yA + 24;
  const SQ_W = 54;
  const SQ_H = 38;

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h2 className="text-2xl font-semibold mb-4">Circuit</h2>

      <div className="relative border rounded-xl p-3 bg-gray-50 overflow-x-auto">
        {/* Droppable strips */}
        <DroppableStrip id="drop-wire-a" top={yA - 28} height={56} />
        <DroppableStrip id="drop-wire-b" top={yB - 28} height={56} />

        {/* SVG canvas */}
        <svg width={CANVAS_W} height={CANVAS_H} className="block">
          {/* Wire labels */}
          <text x={8} y={yA + 4} fontSize={14} fill="#374151">
            |a⟩
          </text>
          <text x={8} y={yB + 4} fontSize={14} fill="#374151">
            |b⟩
          </text>

          {/* Wires */}
          <line x1={PAD_X} y1={yA} x2={CANVAS_W - PAD_X} y2={yA} stroke="#9CA3AF" strokeWidth={2} />
          <line x1={PAD_X} y1={yB} x2={CANVAS_W - PAD_X} y2={yB} stroke="#9CA3AF" strokeWidth={2} />

          {/* Placed gates */}
          {gates.map((g, i) => {
            const xCenter = PAD_X + i * COL_W;

            // Handle all 2-qubit gates
            if (TWO_QUBIT_GATES.has(g.type) && "order" in g) {
              // Choose the right glyph based on gate type
              let GlyphComponent = CNOTGlyph;
              if (g.type === Gate.CONTROLLED_Z) {
                GlyphComponent = ControlledZGlyph;
              }
              
              return (
                <g key={g.id} transform={`translate(${xCenter - CNOT_W / 2}, ${yA - 12})`}>
                  <GlyphComponent order={g.order} width={CNOT_W} height={CNOT_H} />
                </g>
              );
            }

            // Handle single-qubit gates
            if ("wire" in g) {
              const y = g.wire === 0 ? yA : yB;
              const x = xCenter - SQ_W / 2;
              return (
                <g key={g.id} transform={`translate(${x}, ${y - SQ_H / 2})`}>
                  {(() => {
                    switch (g.type) {
                      case Gate.S:
                        return <SGlyph width={SQ_W + 12} height={SQ_H} />;
                      case Gate.T:
                        return <TGlyph width={SQ_W + 12} height={SQ_H} />;
                      case Gate.H:
                        return <HGlyph width={SQ_W} height={SQ_H} />;
                      case Gate.RX:
                        return <RXGlyph width={SQ_W + 6} height={SQ_H} />;
                      case Gate.RY:
                        return <RYGlyph width={SQ_W + 6} height={SQ_H} />;
                      case Gate.U:
                        return <UGlyph width={SQ_W} height={SQ_H} />;
                      default:
                        return <HGlyph width={SQ_W} height={SQ_H} />; // Fallback
                    }
                  })()}
                </g>
              );
            }

            return null;
          })}
        </svg>
      </div>

      {/* Gate controls */}
      <div className="mt-4 space-y-2">
        {gates.length === 0 && (
          <div className="text-sm text-gray-500">
            {'Drag a gate from the toolbox to the wires, then click "Check Solution".'}
          </div>
        )}

        {gates.map((g, idx) => {
          const isTwoQubit = TWO_QUBIT_GATES.has(g.type);
          const orders = isTwoQubit ? allowedOrdersFor(g.type as Gate) : [];

          return (
            <div key={g.id} className="flex items-center gap-3 border rounded-lg px-3 py-2">
              <div className="text-sm font-medium w-32">{g.type}</div>

              {isTwoQubit && "order" in g && (
                <>
                  <label className="text-sm">Order:</label>
                  <select
                    className="border rounded px-1 py-0.5 text-sm"
                    value={`${g.order[0]}-${g.order[1]}`}
                    onChange={(e) => {
                      const [a, b] = e.target.value
                        .split("-")
                        .map(Number) as unknown as ControlTargetOrder;
                      onSetGateOrder(g.id, [a, b] as ControlTargetOrder);
                    }}
                  >
                    {orders.map((o) => (
                      <option key={`${o[0]}-${o[1]}`} value={`${o[0]}-${o[1]}`}>
                        [{o[0]},{o[1]}]
                      </option>
                    ))}
                  </select>
                </>
              )}

              {!isTwoQubit && "wire" in g && (
                <div className="text-xs text-gray-500">wire: {g.wire}</div>
              )}

              <span className="text-xs text-gray-500">col {idx}</span>
              <button onClick={() => onRemoveGate(g.id)} className="ml-auto text-red-600 text-sm">
                Remove
              </button>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={onCheck}
          disabled={isChecking || gates.length === 0}
          className="px-3 py-1.5 rounded-lg border disabled:opacity-60"
        >
          {isChecking ? "Checking..." : "Check Solution"}
        </button>
        <button onClick={onClear} className="px-3 py-1.5 rounded-lg border">
          Clear Circuit
        </button>
      </div>
    </div>
  );
}
