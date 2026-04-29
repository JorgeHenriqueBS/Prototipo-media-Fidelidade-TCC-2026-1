interface CompletionModalProps {
  onClose: () => void;
  returnLabel?: string;
}

export function CompletionModal({
  onClose,
  returnLabel = 'Voltar ao Main Menu',
}: CompletionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div
        className="relative w-full max-w-2xl border-8 border-[#7f1d1d] bg-[#fef3c7] p-8"
        style={{
          imageRendering: 'pixelated',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
        }}
      >
        <div className="absolute left-1/2 top-[-24px] h-12 w-32 -translate-x-1/2">
          <svg width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
            <rect x="0" y="0" width="128" height="48" fill="#7f1d1d" />
            <pattern id="celebrationPattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="3" fill="#fbbf24" />
            </pattern>
            <rect x="8" y="8" width="112" height="32" fill="url(#celebrationPattern)" opacity="0.5" />
          </svg>
        </div>

        <div className="mt-4 space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-[#7f1d1d]">PARABENS!</h2>
            <div className="h-1 w-full bg-[#7f1d1d]" style={{ imageRendering: 'pixelated' }} />
          </div>

          <div className="space-y-4 text-[#7f1d1d]">
            <p className="text-lg">
              Voce concluiu com sucesso todas as 5 fases do jogo educacional sobre
              <strong> Arvores de Busca Binaria (BST)</strong>!
            </p>

            <div className="border-4 border-amber-600 bg-amber-100 p-4" style={{ imageRendering: 'pixelated' }}>
              <p className="mb-2">Durante sua jornada voce aprendeu:</p>
              <ul className="ml-6 space-y-1 text-left">
                <li>Estrutura basica de arvores binarias</li>
                <li>Propriedades de arvores de busca binaria</li>
                <li>Como organizar valores de forma hierarquica</li>
                <li>O conceito de arvores balanceadas</li>
                <li>Relacoes entre nos pai, filhos esquerdo e direito</li>
              </ul>
            </div>

            <p>
              Voce dominou desde arvores simples de 3 nos ate estruturas complexas
              de 9 nos com multiplos niveis!
            </p>

            <div
              className="grid grid-cols-3 gap-4 border-4 border-green-700 bg-green-100 p-4"
              style={{ imageRendering: 'pixelated' }}
            >
              <div>
                <div className="text-2xl">5</div>
                <div className="text-sm">Fases</div>
              </div>
              <div>
                <div className="text-2xl">31</div>
                <div className="text-sm">Nos totais</div>
              </div>
              <div>
                <div className="text-2xl">100%</div>
                <div className="text-sm">Concluido</div>
              </div>
            </div>

            <p className="text-sm italic">
              Continue praticando e explorando o fascinante mundo das estruturas de dados!
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full border-4 border-[#5a1010] bg-[#7f1d1d] px-8 py-4 text-[#fef3c7] transition-transform hover:scale-105 hover:bg-[#991b1b]"
            style={{
              imageRendering: 'pixelated',
              boxShadow: '0 6px 0 #3d0a0a',
            }}
          >
            {returnLabel}
          </button>
        </div>

        <div className="pointer-events-none absolute left-4 top-4 opacity-20">
          <svg width="48" height="48" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
            <circle cx="8" cy="8" r="6" fill="#581c87" />
          </svg>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 opacity-20">
          <svg width="48" height="48" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
            <circle cx="8" cy="8" r="6" fill="#f97316" />
          </svg>
        </div>
        <div className="pointer-events-none absolute bottom-4 left-4 opacity-20">
          <svg width="48" height="48" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
            <circle cx="8" cy="8" r="6" fill="#92400e" />
          </svg>
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 opacity-20">
          <svg width="48" height="48" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
            <circle cx="8" cy="8" r="6" fill="#eab308" />
          </svg>
        </div>
      </div>
    </div>
  );
}
