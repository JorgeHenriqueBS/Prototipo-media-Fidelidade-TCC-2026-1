import { CommandType } from '../App';

interface CommandPanelProps {
  addCommand: (type: CommandType) => void;
  isExecuting: boolean;
}

export function CommandPanel({ addCommand, isExecuting }: CommandPanelProps) {
  const commands: { type: CommandType; label: string; icon: string }[] = [
    { type: 'cima', label: 'CIMA', icon: '↑' },
    { type: 'baixo', label: 'BAIXO', icon: '↓' },
    { type: 'esquerda', label: 'ESQUERDA', icon: '←' },
    { type: 'direita', label: 'DIREITA', icon: '→' },
    { type: 'cortar', label: 'CORTAR', icon: '🪓' },
    { type: 'coletar', label: 'COLETAR', icon: '🪣' },
  ];

  return (
    <div className="bg-[#4a3820] p-6 rounded-lg border-4 border-[#8b6f47]">
      <h2 className="text-[#f4e4c1] text-xl mb-4 pixel-font">COMANDOS</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {commands.map(({ type, label, icon }) => (
          <button
            key={type}
            onClick={() => addCommand(type)}
            disabled={isExecuting}
            className="bg-[#d4a574] hover:bg-[#e4b584] disabled:bg-[#8b6f47] text-[#2a1f0f] px-4 py-3 rounded border-3 border-[#8b6f47] transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed pixel-font flex items-center justify-center gap-2"
          >
            <span className="text-xl">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 p-4 bg-[#2a1810] rounded border-2 border-[#5d4a2f]">
        <p className="text-[#d4a574] text-sm pixel-font">
          💡 Arraste comandos para o editor acima para programar o coletor!
        </p>
      </div>
    </div>
  );
}
