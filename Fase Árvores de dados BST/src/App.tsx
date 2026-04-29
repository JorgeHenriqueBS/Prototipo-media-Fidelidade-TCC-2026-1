import { useState } from 'react';
import { BSTGame } from './components/BSTGame';
import { BSTGameLevel2 } from './components/BSTGameLevel2';
import { BSTGameLevel3 } from './components/BSTGameLevel3';
import { BSTGameLevel4 } from './components/BSTGameLevel4';
import { BSTGameLevel5 } from './components/BSTGameLevel5';

interface AppProps {
  onReturnToMenu?: () => void;
  initialLevel?: number;
}

export default function App({ onReturnToMenu, initialLevel = 1 }: AppProps) {
  const normalizedInitialLevel = Math.min(Math.max(initialLevel, 1), 5);
  const [currentLevel, setCurrentLevel] = useState(normalizedInitialLevel);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Cabeçalho com indicador de fase */}
      <div className="absolute top-4 left-4 z-50 bg-[#fef3c7] border-4 border-[#7f1d1d] px-4 py-2" style={{ imageRendering: 'pixelated' }}>
        <span className="text-[#7f1d1d]">Fase {currentLevel}</span>
      </div>

      {currentLevel === 1 ? (
        <BSTGame onNextLevel={() => setCurrentLevel(2)} />
      ) : currentLevel === 2 ? (
        <BSTGameLevel2 onNextLevel={() => setCurrentLevel(3)} />
      ) : currentLevel === 3 ? (
        <BSTGameLevel3 onNextLevel={() => setCurrentLevel(4)} />
      ) : currentLevel === 4 ? (
        <BSTGameLevel4 onNextLevel={() => setCurrentLevel(5)} />
      ) : (
        <BSTGameLevel5 onReturnToMenu={onReturnToMenu} />
      )}
    </div>
  );
}
