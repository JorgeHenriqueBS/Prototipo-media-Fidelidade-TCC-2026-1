interface ResultModalProps {
  isCorrect: boolean;
  onReplay: () => void;
  onNextLevel: () => void;
  onClose: () => void;
}

export function ResultModal({ isCorrect, onReplay, onNextLevel, onClose }: ResultModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay escuro */}
      <div 
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-[#fef3c7] border-8 border-[#7f1d1d] p-12 max-w-lg w-full"
        style={{ 
          imageRendering: 'pixelated',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Padrão decorativo de fundo */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ imageRendering: 'pixelated' }}>
          <svg width="100%" height="100%">
            <pattern id="decorPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="3" fill="#7f1d1d" />
              <polygon points="20,5 25,15 15,15" fill="#7f1d1d" />
              <polygon points="20,35 25,25 15,25" fill="#7f1d1d" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#decorPattern)" />
          </svg>
        </div>

        <div className="relative">
          {isCorrect ? (
            <>
              {/* Sucesso */}
              <div className="text-center mb-8">
                <div className="text-8xl mb-4">🎉</div>
                <h2 className="text-3xl text-[#7f1d1d] mb-4">Parabéns!</h2>
                <p className="text-[#7f1d1d]">
                  Você organizou corretamente a<br />
                  Árvore de Busca Binária!
                </p>
              </div>

              {/* Botões */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={onReplay}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white border-4 border-amber-900 transition-transform hover:scale-105 flex items-center gap-2"
                  style={{ imageRendering: 'pixelated', boxShadow: '0 6px 0 #78350f' }}
                >
                  <span>↻</span>
                  <span>Jogar Novamente</span>
                </button>
                <button
                  onClick={onNextLevel}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white border-4 border-green-900 transition-transform hover:scale-105 flex items-center gap-2"
                  style={{ imageRendering: 'pixelated', boxShadow: '0 6px 0 #14532d' }}
                >
                  <span>Próxima Fase</span>
                  <span>→</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Erro */}
              <div className="text-center mb-8">
                <div className="text-8xl mb-4">🌳</div>
                <h2 className="text-3xl text-[#7f1d1d] mb-4">Quase lá!</h2>
                <p className="text-[#7f1d1d] mb-2">
                  Ainda não está correto.
                </p>
                <p className="text-[#7f1d1d] text-sm">
                  Lembre-se: valores <strong>menores</strong> vão à <strong>esquerda</strong>,<br />
                  valores <strong>maiores</strong> vão à <strong>direita</strong>!
                </p>
              </div>

              {/* Botões */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white border-4 border-blue-900 transition-transform hover:scale-105"
                  style={{ imageRendering: 'pixelated', boxShadow: '0 6px 0 #1e3a8a' }}
                >
                  Continuar Tentando
                </button>
                <button
                  onClick={onReplay}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white border-4 border-amber-900 transition-transform hover:scale-105 flex items-center gap-2"
                  style={{ imageRendering: 'pixelated', boxShadow: '0 6px 0 #78350f' }}
                >
                  <span>↻</span>
                  <span>Recomeçar</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
