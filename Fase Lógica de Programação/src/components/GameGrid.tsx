import { GridCell } from '../App';
import { Cell } from './Cell';

interface GameGridProps {
  grid: GridCell[][];
  playerPosition: { x: number; y: number };
}

export function GameGrid({ grid, playerPosition }: GameGridProps) {
  return (
    <div className="inline-block bg-[#0d1f08] p-4 rounded-lg border-4 border-[#8b6f47]">
      <div className="grid grid-cols-5 gap-1">
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <Cell
              key={`${x}-${y}`}
              cell={cell}
              hasPlayer={playerPosition.x === x && playerPosition.y === y}
            />
          ))
        )}
      </div>
    </div>
  );
}
