import React from "react";
import type { ControlTargetOrder } from "../types/global";

const WIRE_COLOR = "#9CA3AF";

/** Shared wire styling */
const Wire = ({ x1, x2, y }: { x1: number; x2: number; y: number }) => (
  <line x1={x1} y1={y} x2={x2} y2={y} stroke={WIRE_COLOR} strokeWidth={2} />
);

/** A tiny plus sign for the CNOT target circle */
const Plus = ({ cx, cy, r = 8 }: { cx: number; cy: number; r?: number }) => (
  <>
    <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="#111827" strokeWidth={2} />
    <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="#111827" strokeWidth={2} />
  </>
);

/** CNOT glyph: two wires + vertical link + control dot + target ⊕
 * --> internal wires drawn at y=12 and y=height-12 for alignment on canvas. */
export function CNOTGlyph({
  order = [0, 1],
  width = 80,
  height = 60,
}: {
  order?: ControlTargetOrder;
  width?: number;
  height?: number;
}) {
  const pad = 10;
  const yTop = 12;
  const yBot = height - 12;
  const cx = width / 2;

  const controlY = order[0] === 0 ? yTop : yBot;
  const targetY = order[1] === 1 ? yBot : yTop;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-label="CNOT">
      <Wire x1={pad} x2={width - pad} y={yTop} />
      <Wire x1={pad} x2={width - pad} y={yBot} />

      <line x1={cx} y1={yTop} x2={cx} y2={yBot} stroke="#10B981" strokeWidth={3} />

      <circle cx={cx} cy={controlY} r={6} fill="#10B981" />
      <circle cx={cx} cy={targetY} r={10} fill="white" stroke="#10B981" strokeWidth={3} />
      <Plus cx={cx} cy={targetY} r={6} />
    </svg>
  );
}

/** Single-qubit gate block (H, T, Rz, etc.) */
function GateBlock({
  label,
  width = 54,
  height = 38,
}: {
  label: string;
  width?: number;
  height?: number;
}) {
  const rx = 8;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-label={label}>
      <rect
        x={1}
        y={1}
        width={width - 2}
        height={height - 2}
        rx={rx}
        ry={rx}
        fill="white"
        stroke="#111827"
        strokeWidth={2}
      />
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
        fontSize={14}
        fill="#111827"
      >
        {label}
      </text>
    </svg>
  );
}

export function HGlyph(props: { width?: number; height?: number }) {
  return <GateBlock label="H" {...props} />;
}

export function RZGlyph({
  theta = "θ",
  width,
  height,
}: {
  theta?: string;
  width?: number;
  height?: number;
}) {
  return <GateBlock label={`Rz(${theta})`} width={width} height={height} />;
}
