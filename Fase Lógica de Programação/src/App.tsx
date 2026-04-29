import { useState } from 'react';
import { GameGrid } from './components/GameGrid';
import { CommandPanel } from './components/CommandPanel';
import { CommandEditor } from './components/CommandEditor';
import { VictoryMenu } from './components/VictoryMenu';

export type CellType = 'empty' | 'tree' | 'obstacle' | 'player';
export type ObstacleType = 'rock' | 'hole' | 'log' | 'jaguar' | 'cliff' | 'alligator';
export type TreeState = 'normal' | 'cortada' | 'coletada';
export type CommandType = 'cima' | 'baixo' | 'esquerda' | 'direita' | 'cortar' | 'coletar' | 'repetir';

export interface Command {
  id: string;
  type: CommandType;
  repetitions?: number;
}

export interface GridCell {
  type: CellType;
  treeState?: TreeState;
  obstacleType?: ObstacleType;
}

interface AppProps {
  onReturnToMenu?: () => void;
  initialLevel?: number;
}

export default function App({ onReturnToMenu, initialLevel = 1 }: AppProps) {
  const normalizedInitialLevel = Math.min(Math.max(initialLevel, 1), 5);
  const [currentLevel, setCurrentLevel] = useState(normalizedInitialLevel);
  const [playerPosition, setPlayerPosition] = useState(() => getInitialPosition(normalizedInitialLevel));
  const [commands, setCommands] = useState<Command[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);
  const [showVictoryMenu, setShowVictoryMenu] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [commandsUsed, setCommandsUsed] = useState(0);

  // Função para obter a posição inicial do jogador baseada na fase
  function getInitialPosition(level: number) {
    if (level === 3) {
      return { x: 1, y: 1 };
    } else if (level === 4) {
      return { x: 0, y: 0 };
    } else if (level === 5) {
      return { x: 0, y: 2 };
    }
    return { x: 4, y: 4 };
  }

  // Função para inicializar o grid baseado na fase
  function initializeGrid(level: number): GridCell[][] {
    const newGrid: GridCell[][] = Array(5).fill(null).map(() =>
      Array(5).fill(null).map(() => ({ type: 'empty' }))
    );

    if (level === 1) {
      // Fase 1
      // Árvores nas posições (1,3) e (3,2)
      newGrid[3][1] = { type: 'tree', treeState: 'normal' };
      newGrid[2][3] = { type: 'tree', treeState: 'normal' };
      
      // Pedra na posição (2,3)
      newGrid[3][2] = { type: 'obstacle', obstacleType: 'rock' };
    } else if (level === 2) {
      // Fase 2
      // Árvores nas posições (1,3), (2,1) e (4,1)
      newGrid[3][1] = { type: 'tree', treeState: 'normal' };
      newGrid[1][2] = { type: 'tree', treeState: 'normal' };
      newGrid[1][4] = { type: 'tree', treeState: 'normal' };
      
      // Pedra na posição (3,1)
      newGrid[1][3] = { type: 'obstacle', obstacleType: 'rock' };
      
      // Buraco na posição (1,2)
      newGrid[2][1] = { type: 'obstacle', obstacleType: 'hole' };
    } else if (level === 3) {
      // Fase 3
      // Árvores nas posições (4,0), (3,1), (3,3) e (0,4)
      newGrid[0][4] = { type: 'tree', treeState: 'normal' };
      newGrid[1][3] = { type: 'tree', treeState: 'normal' };
      newGrid[3][3] = { type: 'tree', treeState: 'normal' };
      newGrid[4][0] = { type: 'tree', treeState: 'normal' };
      
      // Pedra na posição (0,3)
      newGrid[3][0] = { type: 'obstacle', obstacleType: 'rock' };
      
      // Buraco na posição (2,2)
      newGrid[2][2] = { type: 'obstacle', obstacleType: 'hole' };
      
      // Tronco Caído na posição (3,2)
      newGrid[2][3] = { type: 'obstacle', obstacleType: 'log' };
    } else if (level === 4) {
      // Fase 4
      // Árvores nas posições (2,0), (3,1), (2,3), (0,4) e (4,4)
      newGrid[0][2] = { type: 'tree', treeState: 'normal' };
      newGrid[1][3] = { type: 'tree', treeState: 'normal' };
      newGrid[3][2] = { type: 'tree', treeState: 'normal' };
      newGrid[4][0] = { type: 'tree', treeState: 'normal' };
      newGrid[4][4] = { type: 'tree', treeState: 'normal' };
      
      // Pedra na posição (3,3)
      newGrid[3][3] = { type: 'obstacle', obstacleType: 'rock' };
      
      // Buraco na posição (1,0)
      newGrid[0][1] = { type: 'obstacle', obstacleType: 'hole' };
      
      // Tronco Caído na posição (4,2)
      newGrid[2][4] = { type: 'obstacle', obstacleType: 'log' };
      
      // Onça-Pintada na posição (0,3)
      newGrid[3][0] = { type: 'obstacle', obstacleType: 'jaguar' };
    } else if (level === 5) {
      // Fase 5
      // Árvores nas posições (0,0), (3,1), (4,2), (3,4) e (0,4)
      newGrid[0][0] = { type: 'tree', treeState: 'normal' };
      newGrid[1][3] = { type: 'tree', treeState: 'normal' };
      newGrid[2][4] = { type: 'tree', treeState: 'normal' };
      newGrid[4][3] = { type: 'tree', treeState: 'normal' };
      newGrid[4][0] = { type: 'tree', treeState: 'normal' };
      
      // Pedra na posição (2,3)
      newGrid[3][2] = { type: 'obstacle', obstacleType: 'rock' };
      
      // Buraco na posição (0,3)
      newGrid[3][0] = { type: 'obstacle', obstacleType: 'hole' };
      
      // Tronco Caído na posição (4,3)
      newGrid[3][4] = { type: 'obstacle', obstacleType: 'log' };
      
      // Barranco na posição (1,0)
      newGrid[0][1] = { type: 'obstacle', obstacleType: 'cliff' };
      
      // Jacaré na posição (2,1)
      newGrid[1][2] = { type: 'obstacle', obstacleType: 'alligator' };
    }

    return newGrid;
  }

  // Inicializar o grid 5x5
  const [grid, setGrid] = useState<GridCell[][]>(() => initializeGrid(normalizedInitialLevel));

  const addCommand = (type: CommandType) => {
    if (isExecuting) return;
    
    const newCommand: Command = {
      id: `${type}-${Date.now()}-${Math.random()}`,
      type,
      repetitions: type === 'repetir' ? 2 : undefined
    };
    setCommands([...commands, newCommand]);
  };

  const removeCommand = (id: string) => {
    if (isExecuting) return;
    setCommands(commands.filter(cmd => cmd.id !== id));
  };

  const executeCommands = async () => {
    if (isExecuting || commands.length === 0) return;
    
    setIsExecuting(true);
    setCommandsUsed(commands.length); // Contar comandos usados
    let currentPos = { ...playerPosition };
    let currentGrid = grid.map(row => row.map(cell => ({ ...cell })));

    for (let i = 0; i < commands.length; i++) {
      setCurrentCommandIndex(i);
      const command = commands[i];

      if (command.type === 'repetir' && command.repetitions) {
        // Para simplificar, o loop executa os próximos comandos
        continue;
      }

      // Executar comando
      const result = executeCommand(command.type, currentPos, currentGrid);
      currentPos = result.position;
      currentGrid = result.grid;
      
      setPlayerPosition(currentPos);
      setGrid(currentGrid);
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setCurrentCommandIndex(-1);
    setIsExecuting(false);
    
    // Verificar vitória
    checkVictory(currentGrid);
  };

  const executeCommand = (
    type: CommandType,
    pos: { x: number; y: number },
    currentGrid: GridCell[][]
  ) => {
    const newPos = { ...pos };
    const newGrid = currentGrid.map(row => row.map(cell => ({ ...cell })));

    switch (type) {
      case 'cima':
        if (pos.y > 0 && currentGrid[pos.y - 1][pos.x].type !== 'obstacle') {
          newPos.y--;
        }
        break;
      case 'baixo':
        if (pos.y < 4 && currentGrid[pos.y + 1][pos.x].type !== 'obstacle') {
          newPos.y++;
        }
        break;
      case 'esquerda':
        if (pos.x > 0 && currentGrid[pos.y][pos.x - 1].type !== 'obstacle') {
          newPos.x--;
        }
        break;
      case 'direita':
        if (pos.x < 4 && currentGrid[pos.y][pos.x + 1].type !== 'obstacle') {
          newPos.x++;
        }
        break;
      case 'cortar':
        if (currentGrid[pos.y][pos.x].type === 'tree' && 
            currentGrid[pos.y][pos.x].treeState === 'normal') {
          newGrid[pos.y][pos.x].treeState = 'cortada';
        }
        break;
      case 'coletar':
        if (currentGrid[pos.y][pos.x].type === 'tree' && 
            currentGrid[pos.y][pos.x].treeState === 'cortada') {
          newGrid[pos.y][pos.x].treeState = 'coletada';
        }
        break;
    }

    return { position: newPos, grid: newGrid };
  };

  const checkVictory = (currentGrid: GridCell[][]) => {
    const allCollected = currentGrid.every(row =>
      row.every(cell => 
        cell.type !== 'tree' || cell.treeState === 'coletada'
      )
    );

    if (allCollected) {
      setTimeout(() => {
        setShowVictoryMenu(true);
      }, 500);
    }
  };

  const resetGame = () => {
    setIsExecuting(false);
    setCurrentCommandIndex(-1);
    setCommands([]);
    setCommandsUsed(0); // Reset contador de comandos
    setPlayerPosition(getInitialPosition(currentLevel));
    setShowVictoryMenu(false);
    
    const newGrid = initializeGrid(currentLevel);
    setGrid(newGrid);
  };

  const handleNextLevel = () => {
    if (currentLevel < 5) {
      // Avançar para a próxima fase
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      setIsExecuting(false);
      setCurrentCommandIndex(-1);
      setCommands([]);
      setCommandsUsed(0); // Reset contador de comandos
      setPlayerPosition(getInitialPosition(nextLevel));
      setShowVictoryMenu(false);
      
      const newGrid = initializeGrid(nextLevel);
      setGrid(newGrid);
    } else {
      // Não há mais fases - mostrar mensagem final
      setShowVictoryMenu(false);
      setShowFinalMessage(true);
    }
  };

  const closeFinalMessage = () => {
    if (onReturnToMenu) {
      setShowFinalMessage(false);
      onReturnToMenu();
      return;
    }

    setShowFinalMessage(false);
    // Reiniciar o jogo
    setCurrentLevel(1);
    setIsExecuting(false);
    setCurrentCommandIndex(-1);
    setCommands([]);
    setCommandsUsed(0); // Reset contador de comandos
    setPlayerPosition(getInitialPosition(1));
    const newGrid = initializeGrid(1);
    setGrid(newGrid);
  };

  return (
    <div className="min-h-screen bg-[#2d5016] flex items-center justify-center p-4">
      {/* Victory Menu */}
      {showVictoryMenu && (
        <VictoryMenu
          onRestart={resetGame}
          onNextLevel={handleNextLevel}
          currentLevel={currentLevel}
          commandsUsed={commandsUsed}
        />
      )}

      {/* Final Message */}
      {showFinalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#4a3820] border-4 border-[#d4a024] rounded-lg p-8 max-w-2xl mx-4 shadow-2xl">
            <div className="text-center space-y-6">
              <h2 className="text-[#d4a024] pixel-font text-4xl mb-4">🎉 Parabéns! 🎉</h2>
              
              <div className="bg-[#1a3010] border-2 border-[#8b6f47] rounded-lg p-6 space-y-4">
                <p className="text-[#f4e4c1] text-xl">
                  Você completou todas as 5 fases do jogo!
                </p>
                
                <div className="text-[#a8d5a8] space-y-2">
                  <p className="text-lg">Você aprendeu conceitos fundamentais de Lógica de Programação:</p>
                  <ul className="list-none space-y-2 text-left pl-4">
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a024]">✓</span>
                      <span><strong>Sequência:</strong> Executar comandos em ordem</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a024]">✓</span>
                      <span><strong>Comandos básicos:</strong> Movimentação e ações</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a024]">✓</span>
                      <span><strong>Planejamento:</strong> Pensar antes de executar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4a024]">✓</span>
                      <span><strong>Resolução de problemas:</strong> Superar obstáculos</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-[#f4e4c1] text-lg mt-4">
                  Continue praticando e explorando o mundo da programação! 🌳
                </p>
              </div>
              
              <button
                onClick={closeFinalMessage}
                className="bg-[#3d6b26] hover:bg-[#4d7b36] text-[#f4e4c1] px-8 py-3 rounded border-2 border-[#2d5016] transition-colors text-lg"
              >
                {onReturnToMenu ? 'Voltar ao Main Menu' : 'Jogar Novamente'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl bg-[#1a3010] rounded-lg shadow-2xl overflow-hidden border-4 border-[#8b6f47]">
        {/* Header */}
        <div className="bg-[#4a3820] p-4 border-b-4 border-[#8b6f47] flex justify-between items-center">
          <h1 className="text-[#f4e4c1] text-2xl pixel-font">Coletor de Seringa - Fase {currentLevel}</h1>
          <div className="flex gap-3">
            <button
              onClick={executeCommands}
              disabled={isExecuting || commands.length === 0}
              className="bg-[#2d8b3c] hover:bg-[#3dad54] disabled:bg-[#555] text-[#f4e4c1] px-6 py-2 rounded border-2 border-[#1a5024] disabled:border-[#333] transition-colors pixel-font"
            >
              {isExecuting ? '⏸ PAUSAR' : '▶ EXECUTAR'}
            </button>
            <button
              onClick={resetGame}
              disabled={isExecuting}
              className="bg-[#8b4513] hover:bg-[#a0522d] disabled:bg-[#555] text-[#f4e4c1] px-6 py-2 rounded border-2 border-[#5d2e0f] disabled:border-[#333] transition-colors pixel-font"
            >
              🔄 RESETAR
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Left Side - Game Grid */}
          <div className="lg:w-1/2 p-8 bg-[#1a3010] border-r-4 border-[#8b6f47]">
            <GameGrid
              grid={grid}
              playerPosition={playerPosition}
            />

            {currentLevel === 1 && (
              <div className="mt-6 bg-[#3b5d28] border-2 border-[#8b6f47] rounded-lg p-5 text-[#f4e4c1] shadow-inner">
                <h2 className="text-2xl mb-3 pixel-font text-[#f4e4c1]">Regras do Jogo</h2>
                <div className="space-y-3 text-sm leading-6 text-[#d4e1b1]">
                  <p>Você controla um coletor de borracha, percorrendo uma floresta para coletar seringa.</p>
                  <p>Para passar de fase, colete a seringa de todas as árvores do mapa e desvie de obstáculos, utilizando ações disponíveis na lista de comandos. Clicando no botão Executar, ações serão feitas na ordem em que estão no editor de comandos.</p>
                  <p>Você pode clicar em uma ação na lista para incluí-la no Editor e você pode removê-la do editor de qualquer posição.</p>
                  <p>Árvores precisam ser cortadas antes de serem coletadas.</p>
                  <p>A fase é concluída apenas quando todas as árvores estiverem no estado Coletada.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Commands */}
          <div className="lg:w-1/2 p-8 bg-[#2a1810] flex flex-col gap-6">
            <CommandEditor
              commands={commands}
              removeCommand={removeCommand}
              isExecuting={isExecuting}
              currentCommandIndex={currentCommandIndex}
            />
            
            <CommandPanel
              addCommand={addCommand}
              isExecuting={isExecuting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
