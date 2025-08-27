/**
 * API client: POST the request DTO to your Flask backend.
 * This module does not build DTOs; it just performs the network call.
 */

import type { UnitaryRequestDTO } from "../dto/unitary";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function simulateUnitary(body: UnitaryRequestDTO) {
  const url = `${API_BASE_URL}/api/simulate`; // ← IMPORTANT
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
