interface VictoryMenuProps {
  onRestart: () => void;
  onNextLevel: () => void;
  currentLevel: number;
  commandsUsed: number;
}

export function VictoryMenu({ onRestart, onNextLevel, currentLevel, commandsUsed }: VictoryMenuProps) {
  // Número mínimo de comandos por fase
  const minCommands: { [key: number]: number } = {
    1: 10,
    2: 16,
    3: 20,
    4: 26,
    5: 26
  };

  const minimumCommands = minCommands[currentLevel] || 0;
  const isOptimal = commandsUsed <= minimumCommands;
  const difference = commandsUsed - minimumCommands;
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-[#1a3010] border-4 border-[#f4e4c1] rounded-lg shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="bg-[#4a7c2e] border-b-4 border-[#f4e4c1] p-6 text-center">
          <div className="text-6xl mb-4 animate-bounce-slow">🎉</div>
          <h2 className="text-[#f4e4c1] text-3xl pixel-font mb-2">PARABÉNS!</h2>
          <p className="text-[#a8d48a] pixel-font">Fase Concluída com Sucesso!</p>
        </div>

        {/* Content */}
        <div className="p-8 bg-[#2a1810]">
          <div className="bg-[#4a3820] rounded-lg border-2 border-[#8b6f47] p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">🪣</span>
              <span className="text-[#f4e4c1] pixel-font text-xl">Toda a seringa foi coletada!</span>
            </div>
            
            <div className="space-y-2 text-[#d4a574] pixel-font text-sm mb-4">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Todas as árvores foram cortadas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Toda a seringa foi coletada</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Missão cumprida!</span>
              </div>
            </div>

            {/* Estatísticas de comandos */}
            <div className="bg-[#2a1810] rounded border-2 border-[#8b6f47] p-4 mt-4">
              <div className="text-center mb-3">
                <span className="text-[#f4e4c1] pixel-font">Comandos Usados</span>
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="text-center">
                  <div className="text-3xl text-[#d4a024] pixel-font">{commandsUsed}</div>
                  <div className="text-xs text-[#d4a574]">Seus comandos</div>
                </div>
                <div className="text-2xl text-[#8b6f47]">vs</div>
                <div className="text-center">
                  <div className="text-3xl text-[#4ade80] pixel-font">{minimumCommands}</div>
                  <div className="text-xs text-[#d4a574]">Mínimo</div>
                </div>
              </div>

              {isOptimal ? (
                <div className="bg-[#2d8b3c] border-2 border-[#1a5024] rounded p-2 text-center">
                  <span className="text-[#f4e4c1] pixel-font text-sm">⭐ Solução Ótima! ⭐</span>
                </div>
              ) : (
                <div className="bg-[#8b6f47] border-2 border-[#5d4a2f] rounded p-2 text-center">
                  <span className="text-[#f4e4c1] pixel-font text-sm">
                    +{difference} comando{difference !== 1 ? 's' : ''} a mais
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={onNextLevel}
              className="w-full bg-[#2d8b3c] hover:bg-[#3dad54] text-[#f4e4c1] px-6 py-4 rounded-lg border-3 border-[#1a5024] transition-all hover:scale-105 active:scale-95 pixel-font text-lg shadow-lg"
            >
              <span className="inline-flex items-center gap-2">
                ▶ PRÓXIMA FASE
              </span>
            </button>

            <button
              onClick={onRestart}
              className="w-full bg-[#8b6f47] hover:bg-[#a0784a] text-[#f4e4c1] px-6 py-4 rounded-lg border-3 border-[#5d4a2f] transition-all hover:scale-105 active:scale-95 pixel-font text-lg shadow-lg"
            >
              <span className="inline-flex items-center gap-2">
                🔄 REPETIR FASE
              </span>
            </button>
          </div>
        </div>

        {/* Footer decoration */}
        <div className="bg-[#4a3820] border-t-2 border-[#8b6f47] p-3 flex justify-center gap-2">
          <span className="text-2xl">🌳</span>
          <span className="text-2xl">🪓</span>
          <span className="text-2xl">🪣</span>
          <span className="text-2xl">✨</span>
        </div>
      </div>
    </div>
  );
}
