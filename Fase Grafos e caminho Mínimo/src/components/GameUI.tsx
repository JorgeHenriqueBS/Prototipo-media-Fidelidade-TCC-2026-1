import React from 'react';
import { GameState } from '../App';
import { Package, RotateCcw, Award, X, ArrowRight } from 'lucide-react';

interface GameUIProps {
  gameState: GameState;
  onReset: () => void;
  onNextLevel?: () => void;
  onReturnToMenu?: () => void;
  levelNumber: number;
  optimalCost: number;
  hasNextLevel: boolean;
}

export function GameUI({ gameState, onReset, onNextLevel, onReturnToMenu, levelNumber, optimalCost, hasNextLevel }: GameUIProps) {
  const suppliesRemaining = gameState.totalSupplies - gameState.suppliesUsed;
  const suppliesPercentage = (suppliesRemaining / gameState.totalSupplies) * 100;

  return (
    <>
      {/* Medidor de Mantimentos */}
      <div className="absolute top-6 right-6 bg-[#8B4513] border-4 border-[#654321] rounded-lg p-3 shadow-lg min-w-[200px]">
        <div className="flex items-center gap-3 mb-2">
          <Package className="w-6 h-6 text-[#F5DEB3]" />
          <span className="text-[#F5DEB3] uppercase tracking-wider">
            Mantimentos
          </span>
        </div>
        <div className="bg-[#654321] rounded p-2">
          <div className="text-3xl text-center text-white mb-1">
            {suppliesRemaining}
          </div>
          <div className="w-full bg-[#3d2817] rounded-full h-3 overflow-hidden border-2 border-[#8B4513]">
            <div
              className={`h-full transition-all duration-300 ${
                suppliesPercentage > 50
                  ? 'bg-green-500'
                  : suppliesPercentage > 25
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${suppliesPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Informações do Caminho */}
      <div className="absolute top-6 left-6 bg-[#8B4513] border-4 border-[#654321] rounded-lg p-3 shadow-lg">
        <div className="text-[#F5DEB3] mb-2">
          <div className="uppercase tracking-wider mb-1">Fase {levelNumber}</div>
          <div className="uppercase tracking-wider mb-1 text-sm">Caminho Percorrido:</div>
          <div className="text-2xl text-white">
            {gameState.path.join(' → ')}
          </div>
        </div>
        <div className="text-[#F5DEB3] text-sm">
          Custo Total: <span className="text-white text-lg">{gameState.suppliesUsed}</span>
        </div>
      </div>

      {/* Instruções */}
      {gameState.gameStatus === 'playing' && gameState.path.length === 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#8B4513] border-4 border-[#654321] rounded-lg p-4 shadow-lg max-w-[600px]">
          <div className="text-[#F5DEB3] text-center">
            <div className="mb-2">
              Clique nos vértices conectados para navegar pelos rios.
            </div>
            <div className="text-sm">
              Objetivo: Chegar ao destino com o menor custo de mantimentos possível!
            </div>
          </div>
        </div>
      )}

      {/* Modal de Vitória */}
      {gameState.gameStatus === 'won' && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#8B4513] border-8 border-[#FFD700] rounded-lg p-8 shadow-2xl max-w-md">
            <div className="flex justify-center mb-4">
              <Award className="w-20 h-20 text-[#FFD700]" />
            </div>
            <div className="text-center text-[#F5DEB3] mb-4">
              <h2 className="text-3xl mb-2 text-[#FFD700]">
                {!hasNextLevel ? 'Parabéns, Explorador!' : 'Parabéns!'}
              </h2>
              <p className="text-xl mb-3">
                {!hasNextLevel 
                  ? 'Você completou todas as fases do jogo!' 
                  : `Você completou a Fase ${levelNumber}!`
                }
              </p>
              <div className="bg-[#654321] rounded p-3 mb-3">
                <div className="text-lg">Caminho: <span className="text-white">{gameState.path.join(' → ')}</span></div>
                <div className="text-lg">Custo Total: <span className="text-white">{gameState.suppliesUsed}</span></div>
                <div className="text-lg">Mantimentos Restantes: <span className="text-white">{suppliesRemaining}</span></div>
              </div>
              <div className="text-sm text-[#FFD700]">
                {gameState.suppliesUsed === optimalCost && '🏆 Caminho Ótimo!'}
                {gameState.suppliesUsed === optimalCost + 1 && '⭐ Muito Bom!'}
                {gameState.suppliesUsed > optimalCost + 1 && '✓ Você completou, mas há caminhos melhores!'}
              </div>
              {!hasNextLevel && (
                <div className="mt-4 pt-4 border-t-2 border-[#654321]">
                  <p className="text-lg text-[#FFD700] mb-2">
                    🎓 Você dominou a Busca de Caminho Mínimo em Grafos!
                  </p>
                  <p className="text-sm">
                    Parabéns por concluir todas as 5 fases e explorar os rios amazônicos com maestria!
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {hasNextLevel && onNextLevel && (
                <button
                  onClick={onNextLevel}
                  className="w-full bg-[#FFD700] hover:bg-[#DAA520] text-[#654321] py-3 rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                  Próximo Nível
                </button>
              )}
              <button
                onClick={!hasNextLevel && onReturnToMenu ? onReturnToMenu : onReset}
                className="w-full bg-[#8B7355] hover:bg-[#654321] text-[#F5DEB3] py-3 rounded flex items-center justify-center gap-2 transition-colors border-2 border-[#654321]"
              >
                <RotateCcw className="w-5 h-5" />
                {!hasNextLevel ? 'Voltar ao Main Menu' : 'Jogar Novamente'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Derrota */}
      {gameState.gameStatus === 'lost' && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#8B4513] border-8 border-[#DC143C] rounded-lg p-8 shadow-2xl max-w-md">
            <div className="flex justify-center mb-4">
              <X className="w-20 h-20 text-[#DC143C]" />
            </div>
            <div className="text-center text-[#F5DEB3] mb-4">
              <h2 className="text-3xl mb-2 text-[#DC143C]">Mantimentos Esgotados!</h2>
              <p className="text-xl mb-3">
                Você ficou sem mantimentos antes de chegar ao destino.
              </p>
              <div className="bg-[#654321] rounded p-3 mb-3">
                <div className="text-lg">Caminho: <span className="text-white">{gameState.path.join(' → ')}</span></div>
                <div className="text-lg">Custo Total: <span className="text-white">{gameState.suppliesUsed}</span></div>
              </div>
              <div className="text-sm">
                Dica: Procure por caminhos com menor custo total!
              </div>
            </div>
            <button
              onClick={onReset}
              className="w-full bg-[#FFD700] hover:bg-[#DAA520] text-[#654321] py-3 rounded flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Tentar Novamente
            </button>
          </div>
        </div>
      )}

      {/* Botão de Reset */}
      {gameState.gameStatus === 'playing' && gameState.path.length > 1 && (
        <button
          onClick={onReset}
          className="absolute bottom-6 right-6 bg-[#8B4513] hover:bg-[#654321] border-4 border-[#654321] text-[#F5DEB3] py-2 px-4 rounded flex items-center gap-2 transition-colors shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
          Reiniciar
        </button>
      )}
    </>
  );
}
