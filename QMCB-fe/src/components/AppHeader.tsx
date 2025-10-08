/**
 * App header: contains navigation links.
 */

import { LEVELS, type LevelId } from "../config/levels";
import type { LevelDefinition } from "../interfaces/levelDefinition";

interface AppHeaderProps {
  currentLevel: LevelDefinition;
  onLevelChange: (level: LevelDefinition) => void;
}

export function AppHeader({ currentLevel, onLevelChange }: AppHeaderProps) {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex gap-6 text-sm font-medium items-center">
        <span className="text-gray-900 font-semibold">Quantum Circuit Builder</span>

        {/* Level Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="level-select" className="text-gray-600">
            Level:
          </label>
          <select
            id="level-select"
            className="border rounded px-2 py-1 text-sm"
            value={currentLevel.target_unitary}
            onChange={(e) => {
              const levelId = e.target.value as LevelId;
              onLevelChange(LEVELS[levelId]);
            }}
          >
            {Object.entries(LEVELS).map(([id, level]) => (
              <option key={id} value={level.target_unitary}>
                {id}
              </option>
            ))}
          </select>
        </div>

        <a className="text-gray-500 hover:text-gray-900 ml-auto" href="#">
          Settings
        </a>
        <a className="text-gray-500 hover:text-gray-900" href="#">
          About
        </a>
      </nav>
    </header>
  );
}
