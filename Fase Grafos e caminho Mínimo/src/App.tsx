import React, { useEffect, useRef, useState } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { GameUI } from './components/GameUI';

export interface Vertex {
  id: string;
  x: number;
  y: number;
  type: 'fort' | 'village' | 'forest';
  label: string;
}

export interface Edge {
  from: string;
  to: string;
  weight: number;
}

export interface GameState {
  currentVertex: string;
  visitedVertices: string[];
  suppliesUsed: number;
  totalSupplies: number;
  gameStatus: 'playing' | 'won' | 'lost';
  path: string[];
}

export interface LevelConfig {
  levelNumber: number;
  vertices: Vertex[];
  edges: Edge[];
  startVertex: string;
  endVertex: string;
  totalSupplies: number;
  optimalCost: number;
}

const LEVELS: LevelConfig[] = [
  // Fase 1
  {
    levelNumber: 1,
    vertices: [
      { id: 'A', x: 15, y: 50, type: 'fort', label: 'A' },
      { id: 'B', x: 50, y: 20, type: 'village', label: 'B' },
      { id: 'C', x: 50, y: 65, type: 'forest', label: 'C' },
      { id: 'D', x: 85, y: 50, type: 'fort', label: 'D' }
    ],
    edges: [
      { from: 'A', to: 'B', weight: 2 },
      { from: 'A', to: 'C', weight: 1 },
      { from: 'B', to: 'C', weight: 2 },
      { from: 'B', to: 'D', weight: 3 },
      { from: 'C', to: 'D', weight: 3 }
    ],
    startVertex: 'A',
    endVertex: 'D',
    totalSupplies: 10,
    optimalCost: 4
  },
  // Fase 2
  {
    levelNumber: 2,
    vertices: [
      { id: 'A', x: 10, y: 50, type: 'fort', label: 'A' },
      { id: 'B', x: 40, y: 15, type: 'fort', label: 'B' },
      { id: 'C', x: 50, y: 50, type: 'village', label: 'C' },
      { id: 'D', x: 40, y: 80, type: 'village', label: 'D' },
      { id: 'E', x: 85, y: 50, type: 'fort', label: 'E' }
    ],
    edges: [
      { from: 'A', to: 'B', weight: 2 },
      { from: 'A', to: 'C', weight: 3 },
      { from: 'A', to: 'D', weight: 4 },
      { from: 'B', to: 'C', weight: 4 },
      { from: 'B', to: 'E', weight: 3 },
      { from: 'C', to: 'E', weight: 3 },
      { from: 'D', to: 'E', weight: 4 }
    ],
    startVertex: 'A',
    endVertex: 'E',
    totalSupplies: 15,
    optimalCost: 6
  },
  // Fase 3
  {
    levelNumber: 3,
    vertices: [
      { id: 'A', x: 15, y: 72, type: 'fort', label: 'A' },
      { id: 'B', x: 25, y: 28, type: 'village', label: 'B' },
      { id: 'C', x: 50, y: 12, type: 'fort', label: 'C' },
      { id: 'D', x: 45, y: 52, type: 'forest', label: 'D' },
      { id: 'E', x: 70, y: 75, type: 'village', label: 'E' },
      { id: 'F', x: 85, y: 40, type: 'fort', label: 'F' }
    ],
    edges: [
      { from: 'A', to: 'B', weight: 5 },
      { from: 'A', to: 'E', weight: 8 },
      { from: 'B', to: 'C', weight: 6 },
      { from: 'B', to: 'D', weight: 6 },
      { from: 'C', to: 'D', weight: 2 },
      { from: 'C', to: 'F', weight: 4 },
      { from: 'D', to: 'F', weight: 2 },
      { from: 'E', to: 'F', weight: 6 }
    ],
    startVertex: 'A',
    endVertex: 'F',
    totalSupplies: 25,
    optimalCost: 13
  },
  // Fase 4
  {
    levelNumber: 4,
    vertices: [
      { id: 'A', x: 10, y: 50, type: 'village', label: 'A' },
      { id: 'B', x: 35, y: 20, type: 'forest', label: 'B' },
      { id: 'C', x: 25, y: 75, type: 'village', label: 'C' },
      { id: 'D', x: 50, y: 50, type: 'fort', label: 'D' },
      { id: 'E', x: 70, y: 25, type: 'village', label: 'E' },
      { id: 'F', x: 88, y: 50, type: 'fort', label: 'F' }
    ],
    edges: [
      { from: 'A', to: 'B', weight: 8 },
      { from: 'A', to: 'C', weight: 8 },
      { from: 'B', to: 'C', weight: 2 },
      { from: 'B', to: 'D', weight: 4 },
      { from: 'B', to: 'E', weight: 5 },
      { from: 'C', to: 'D', weight: 7 },
      { from: 'D', to: 'E', weight: 8 },
      { from: 'D', to: 'F', weight: 5 },
      { from: 'E', to: 'F', weight: 8 }
    ],
    startVertex: 'A',
    endVertex: 'F',
    totalSupplies: 30,
    optimalCost: 17
  },
  // Fase 5
  {
    levelNumber: 5,
    vertices: [
      { id: 'A', x: 12, y: 50, type: 'village', label: 'A' },
      { id: 'B', x: 25, y: 18, type: 'fort', label: 'B' },
      { id: 'C', x: 25, y: 75, type: 'village', label: 'C' },
      { id: 'D', x: 45, y: 20, type: 'village', label: 'D' },
      { id: 'E', x: 45, y: 50, type: 'forest', label: 'E' },
      { id: 'F', x: 45, y: 78, type: 'fort', label: 'F' },
      { id: 'G', x: 70, y: 18, type: 'forest', label: 'G' },
      { id: 'H', x: 70, y: 65, type: 'village', label: 'H' },
      { id: 'I', x: 88, y: 45, type: 'fort', label: 'I' }
    ],
    edges: [
      { from: 'A', to: 'B', weight: 4 },
      { from: 'A', to: 'C', weight: 4 },
      { from: 'B', to: 'C', weight: 6 },
      { from: 'B', to: 'D', weight: 8 },
      { from: 'C', to: 'E', weight: 3 },
      { from: 'C', to: 'F', weight: 7 },
      { from: 'D', to: 'E', weight: 4 },
      { from: 'D', to: 'G', weight: 5 },
      { from: 'D', to: 'H', weight: 9 },
      { from: 'E', to: 'F', weight: 3 },
      { from: 'F', to: 'H', weight: 7 },
      { from: 'G', to: 'I', weight: 6 },
      { from: 'H', to: 'I', weight: 4 }
    ],
    startVertex: 'A',
    endVertex: 'I',
    totalSupplies: 35,
    optimalCost: 21
  }
];

interface AppProps {
  onReturnToMenu?: () => void;
  initialLevel?: number;
}

export default function App({ onReturnToMenu, initialLevel = 1 }: AppProps) {
  const normalizedInitialLevel = Math.min(Math.max(initialLevel, 1), 5);
  const [currentLevel, setCurrentLevel] = useState(normalizedInitialLevel - 1);
  const level = LEVELS[currentLevel];

  const [gameState, setGameState] = useState<GameState>({
    currentVertex: level.startVertex,
    visitedVertices: [level.startVertex],
    suppliesUsed: 0,
    totalSupplies: level.totalSupplies,
    gameStatus: 'playing',
    path: [level.startVertex]
  });

  const handleVertexClick = (vertexId: string) => {
    if (gameState.gameStatus !== 'playing') return;
    if (vertexId === gameState.currentVertex) return;

    // Verifica se há uma aresta conectando os vértices
    const edge = level.edges.find(
      e => 
        (e.from === gameState.currentVertex && e.to === vertexId) ||
        (e.to === gameState.currentVertex && e.from === vertexId)
    );

    if (!edge) return;

    const newSuppliesUsed = gameState.suppliesUsed + edge.weight;
    const newPath = [...gameState.path, vertexId];
    const newVisitedVertices = [...new Set([...gameState.visitedVertices, vertexId])];

    let newGameStatus: 'playing' | 'won' | 'lost' = 'playing';

    // Verifica se chegou ao destino
    if (vertexId === level.endVertex) {
      newGameStatus = 'won';
    } else if (newSuppliesUsed >= gameState.totalSupplies) {
      newGameStatus = 'lost';
    }

    setGameState({
      currentVertex: vertexId,
      visitedVertices: newVisitedVertices,
      suppliesUsed: newSuppliesUsed,
      totalSupplies: gameState.totalSupplies,
      gameStatus: newGameStatus,
      path: newPath
    });
  };

  const handleReset = () => {
    setGameState({
      currentVertex: level.startVertex,
      visitedVertices: [level.startVertex],
      suppliesUsed: 0,
      totalSupplies: level.totalSupplies,
      gameStatus: 'playing',
      path: [level.startVertex]
    });
  };

  const handleNextLevel = () => {
    if (currentLevel < LEVELS.length - 1) {
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      const newLevel = LEVELS[nextLevel];
      
      setGameState({
        currentVertex: newLevel.startVertex,
        visitedVertices: [newLevel.startVertex],
        suppliesUsed: 0,
        totalSupplies: newLevel.totalSupplies,
        gameStatus: 'playing',
        path: [newLevel.startVertex]
      });
    } else {
      handleReset();
    }
  };

  return (
    <div className="w-full h-screen bg-[#1a1a1a] overflow-hidden flex items-center justify-center">
      <div className="relative w-full h-full max-w-[1200px] max-h-[800px]">
        <GameCanvas
          vertices={level.vertices}
          edges={level.edges}
          gameState={gameState}
          onVertexClick={handleVertexClick}
        />
        <GameUI
          gameState={gameState}
          onReset={handleReset}
          onNextLevel={handleNextLevel}
          onReturnToMenu={onReturnToMenu}
          levelNumber={level.levelNumber}
          optimalCost={level.optimalCost}
          hasNextLevel={currentLevel < LEVELS.length - 1}
        />
      </div>
    </div>
  );
}
