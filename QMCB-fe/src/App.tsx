/**
 * Canvas + DnD:
 * - Toolbox shows gate glyphs (CNOT, H, Rz).
 * - Drag CNOT to a wire → we append a default CNOT (student sets order later).
 * - H and T are draggable visuals now; we’ll extend state next to support them fully.
 * - “Check Solution” posts to backend and renders truth tables.
 */

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";

import { simulateUnitary } from "./api/simulate";
import { useCircuit } from "./hooks/use-circuit";
import { SWAP_LEVEL } from "./repositories/target-library";
import { allowedOrdersFor } from "./repositories/quantum-gates";
import type { ControlTargetOrder } from "./types/global";
import { ToolboxGate } from "./types/global";
import { buildRequestFromLevel, toTruthRows } from "./controllers/simulate";

import { CNOTGlyph, HGlyph, RZGlyph } from "./components/gate-designs";
import { DraggableTool, DroppableStrip } from "./utils/dnd-helpers";

export default function App() {
  const { gates, addCNOT, addSingle, removeGate, setGateOrder, clearAll } = useCircuit();
  const mutation = useMutation({ mutationFn: simulateUnitary });

  const rows = mutation.data ? toTruthRows(mutation.data) : null;
  const allCorrect = rows?.every((r) => r.ok) ?? false;

  const handleCheck = () => {
    if (gates.length === 0) return; // don’t submit empty circuits
    const body = buildRequestFromLevel(SWAP_LEVEL, gates);
    mutation.mutate(body);
  };

  // track active drag for DragOverlay
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // DnD: drop rules per tool + wire
  const onDragEnd = (event: DragEndEvent) => {
    const id = String(event.active.id);
    const overId = event.over?.id ? String(event.over.id) : undefined;
    if (!overId) return;

    const wire = overId === "drop-wire-a" ? 0 : overId === "drop-wire-b" ? 1 : null;
    if (wire === null) return;

    if (id === "tool-cnot") {
      addCNOT(); // set order after placement via UI
      return;
    }
    if (id === "tool-h") {
      addSingle(ToolboxGate.H, wire);
      return;
    }
    if (id === "tool-t") {
      addSingle(ToolboxGate.T, wire);
      return;
    }
  };

  // --- canvas geometry ---
  const COL_W = 90;
  const PAD_X = 100; // shift right to avoid label overlap
  const CANVAS_W = Math.max(600, PAD_X * 2 + Math.max(1, gates.length) * COL_W);
  const CANVAS_H = 220;
  const yA = 80;
  const yB = 160;

  // CNOT glyph size to align internal wires (12 pad) to yA/yB
  const CNOT_W = 80;
  const CNOT_H = yB - yA + 24;

  // Single-qubit block placement
  const SQ_W = 54,
    SQ_H = 38;

  return (
    <div className="min-h-screen text-gray-900">
      <header className="border-b bg-white">
        <nav className="mx-auto max-w-6xl px-4 py-3 flex gap-6 text-sm font-medium">
          <a className="text-gray-900" href="#">
            Solve Level
          </a>
          <a className="text-gray-500 hover:text-gray-900" href="#">
            Levels
          </a>
          <a className="text-gray-500 hover:text-gray-900" href="#">
            Settings
          </a>
          <a className="text-gray-500 hover:text-gray-900" href="#">
            About
          </a>
        </nav>
      </header>

      <DndContext
        onDragStart={(e) => setActiveId(String(e.active.id))}
        onDragCancel={() => setActiveId(null)}
        onDragEnd={(e) => {
          setActiveId(null);
          onDragEnd(e);
        }}
      >
        <main className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ---------------- Left: Task + Toolbox ---------------- */}
          <section className="space-y-6">
            {/* Task card */}
            <div className="bg-white rounded-2xl shadow p-5">
              <h2 className="text-2xl font-semibold mb-2">Task</h2>
              <p className="text-sm">{SWAP_LEVEL.description}</p>

              <div className="mt-3 text-sm">
                <div className="font-medium">Expected (SWAP):</div>
                <table className="mt-2 text-xs border">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border px-2 py-1">Input</th>
                      <th className="border px-2 py-1">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SWAP_LEVEL.expectedTruth.input.map((i, idx) => (
                      <tr key={i}>
                        <td className="border px-2 py-1">{i}</td>
                        <td className="border px-2 py-1">{SWAP_LEVEL.expectedTruth.output[idx]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Toolbox */}
            <div className="bg-white rounded-2xl shadow p-5">
              <h2 className="text-2xl font-semibold mb-3">Toolbox</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <DraggableTool id="tool-cnot">
                    <CNOTGlyph order={[0, 1]} width={84} height={64} />
                  </DraggableTool>
                  <div className="mt-1 text-sm">CNOT</div>
                </div>

                <div className="flex flex-col items-center">
                  <DraggableTool id="tool-h">
                    <HGlyph width={64} height={44} />
                  </DraggableTool>
                  <div className="mt-1 text-sm">H</div>
                </div>

                <div className="flex flex-col items-center">
                  <DraggableTool id="tool-t">
                    <RZGlyph width={76} height={44} />
                  </DraggableTool>
                  <div className="mt-1 text-sm">T</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Tip: drag a gate onto the wires at right. For CNOT, set the order after placement.
              </p>
            </div>
          </section>

          {/* ---------------- Right: Circuit Canvas + Output ---------------- */}
          <section className="space-y-6">
            <div className="bg-white rounded-2xl shadow p-5">
              <h2 className="text-2xl font-semibold mb-4">Circuit</h2>

              <div className="relative border rounded-xl p-3 bg-gray-50 overflow-x-auto">
                {/* droppable strips */}
                <DroppableStrip id="drop-wire-a" top={yA - 28} height={56} />
                <DroppableStrip id="drop-wire-b" top={yB - 28} height={56} />

                {/* SVG canvas */}
                <svg width={CANVAS_W} height={CANVAS_H} className="block">
                  {/* labels */}
                  <text x={8} y={yA + 4} fontSize={14} fill="#374151">
                    |a⟩
                  </text>
                  <text x={8} y={yB + 4} fontSize={14} fill="#374151">
                    |b⟩
                  </text>

                  {/* wires */}
                  <line
                    x1={PAD_X}
                    y1={yA}
                    x2={CANVAS_W - PAD_X}
                    y2={yA}
                    stroke="#9CA3AF"
                    strokeWidth={2}
                  />
                  <line
                    x1={PAD_X}
                    y1={yB}
                    x2={CANVAS_W - PAD_X}
                    y2={yB}
                    stroke="#9CA3AF"
                    strokeWidth={2}
                  />

                  {/* placed gates */}
                  {gates.map((g, i) => {
                    const xCenter = PAD_X + i * COL_W;

                    if (g.type === ToolboxGate.CNOT) {
                      return (
                        <g key={g.id} transform={`translate(${xCenter - CNOT_W / 2}, ${yA - 12})`}>
                          <CNOTGlyph order={g.order} width={CNOT_W} height={CNOT_H} />
                        </g>
                      );
                    }

                    if (g.type === ToolboxGate.H || g.type === ToolboxGate.T) {
                      const y = g.type && g.wire === 0 ? yA : yB;
                      const x = xCenter - SQ_W / 2;
                      return (
                        <g key={g.id} transform={`translate(${x}, ${y - SQ_H / 2})`}>
                          {g.type === ToolboxGate.H ? (
                            <HGlyph width={SQ_W} height={SQ_H} />
                          ) : (
                            <RZGlyph width={SQ_W + 12} height={SQ_H} />
                          )}
                        </g>
                      );
                    }

                    return null;
                  })}
                </svg>

                {/* Drag overlay under cursor while dragging */}
                <DragOverlay>
                  {activeId === "tool-cnot" && <CNOTGlyph order={[0, 1]} width={84} height={64} />}
                  {activeId === "tool-h" && <HGlyph width={64} height={44} />}
                  {activeId === "tool-t" && <RZGlyph width={76} height={44} />}
                </DragOverlay>
              </div>

              {/* List controls (order select/remove) */}
              <div className="mt-4 space-y-2">
                {gates.length === 0 && (
                  <div className="text-sm text-gray-500">
                    Drag a gate from the toolbox to the wires, then click “Check Solution”.
                  </div>
                )}

                {gates.map((g, idx) => {
                  const isTwoQubit = g.type === ToolboxGate.CNOT;
                  const orders = isTwoQubit ? allowedOrdersFor(g.type as ToolboxGate) : [];

                  return (
                    <div key={g.id} className="flex items-center gap-3 border rounded-lg px-3 py-2">
                      <div className="text-sm font-medium w-16">{g.type}</div>

                      {isTwoQubit && (
                        <>
                          <label className="text-sm">Order:</label>
                          <select
                            className="border rounded px-1 py-0.5 text-sm"
                            value={`${g.order[0]}-${g.order[1]}`}
                            onChange={(e) => {
                              const [a, b] = e.target.value
                                .split("-")
                                .map(Number) as unknown as ControlTargetOrder;
                              setGateOrder(g.id, [a, b] as ControlTargetOrder);
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

                      {!isTwoQubit && (
                        <div className="text-xs text-gray-500">
                          wire: {"wire" in g ? g.wire : "?"}
                        </div>
                      )}

                      <span className="text-xs text-gray-500">col {idx}</span>
                      <button
                        onClick={() => removeGate(g.id)}
                        className="ml-auto text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleCheck}
                  disabled={mutation.isPending || gates.length === 0}
                  className="px-3 py-1.5 rounded-lg border disabled:opacity-60"
                >
                  {mutation.isPending ? "Checking..." : "Check Solution"}
                </button>
                <button
                  onClick={() => {
                    clearAll();
                    mutation.reset(); // clear Output table too
                  }}
                  className="px-3 py-1.5 rounded-lg border"
                >
                  Clear Circuit
                </button>
              </div>
            </div>

            {/* Output table */}
            <div className="bg-white rounded-2xl shadow p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-2">Circuit Output</h2>
                {allCorrect && (
                  <span className="text-green-700 text-sm font-semibold">Level Complete ✓</span>
                )}
              </div>

              {mutation.isError && (
                <div className="text-red-600 text-sm mb-2">
                  {(mutation.error as Error)?.message}
                </div>
              )}

              {!rows && !mutation.isError && (
                <div className="text-sm text-gray-500">Submit to see the truth tables.</div>
              )}

              {rows && (
                <table className="mt-2 text-sm border w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border px-2 py-1 text-left">Input</th>
                      <th className="border px-2 py-1 text-left">Trial Output</th>
                      <th className="border px-2 py-1 text-left">Target Output</th>
                      <th className="border px-2 py-1 text-left">✓</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.input}>
                        <td className="border px-2 py-1">{r.input}</td>
                        <td className="border px-2 py-1">{r.trial}</td>
                        <td className="border px-2 py-1">{r.target}</td>
                        <td className="border px-2 py-1">{r.ok ? "✓" : ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </main>

        {/* Drag overlay under cursor while dragging */}
        <DragOverlay>
          {activeId === "tool-cnot" && <CNOTGlyph order={[0, 1]} width={84} height={64} />}
          {activeId === "tool-h" && <HGlyph width={64} height={44} />}
          {activeId === "tool-t" && <RZGlyph width={76} height={44} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
