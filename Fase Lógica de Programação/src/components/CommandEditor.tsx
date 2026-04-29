import { Command } from '../App';

interface CommandEditorProps {
  commands: Command[];
  removeCommand: (id: string) => void;
  isExecuting: boolean;
  currentCommandIndex: number;
}

export function CommandEditor({ 
  commands, 
  removeCommand, 
  isExecuting,
  currentCommandIndex 
}: CommandEditorProps) {
  const getCommandIcon = (type: string) => {
    const icons: Record<string, string> = {
      cima: '↑',
      baixo: '↓',
      esquerda: '←',
      direita: '→',
      cortar: '🪓',
      coletar: '🪣',
      repetir: '🔁'
    };
    return icons[type] || '?';
  };

  const getCommandLabel = (type: string) => {
    const labels: Record<string, string> = {
      cima: 'CIMA',
      baixo: 'BAIXO',
      esquerda: 'ESQUERDA',
      direita: 'DIREITA',
      cortar: 'CORTAR',
      coletar: 'COLETAR',
      repetir: 'REPETIR'
    };
    return labels[type] || type.toUpperCase();
  };

  return (
    <div className="bg-[#4a3820] p-6 rounded-lg border-4 border-[#8b6f47] flex-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#f4e4c1] text-xl pixel-font">EDITOR DE COMANDOS</h2>
        <div className="text-[#d4a574] text-sm pixel-font">
          {commands.length} comando(s)
        </div>
      </div>
      
      <div className="h-[300px] bg-[#2a1810] rounded-lg border-2 border-[#5d4a2f] p-4">
        {commands.length === 0 ? (
          <div className="h-full flex items-center justify-center text-[#8b6f47] pixel-font">
            Clique nos comandos abaixo para adicionar
          </div>
        ) : (
          <div className="h-full overflow-y-auto pr-1">
            <div className="space-y-2">
            {commands.map((command, index) => (
              <div
                key={command.id}
                className={`bg-[#d4a574] p-3 rounded border-2 flex items-center justify-between transition-all ${
                  currentCommandIndex === index
                    ? 'border-[#f4e4c1] shadow-lg scale-105 bg-[#e4b584]'
                    : 'border-[#8b6f47]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#4a3820] rounded flex items-center justify-center text-[#f4e4c1] pixel-font text-sm">
                    {index + 1}
                  </div>
                  <span className="text-xl">{getCommandIcon(command.type)}</span>
                  <span className="text-[#2a1f0f] pixel-font">
                    {getCommandLabel(command.type)}
                  </span>
                  {command.repetitions && (
                    <span className="text-[#2a1f0f] text-sm pixel-font">
                      ({command.repetitions}x)
                    </span>
                  )}
                </div>
                
                {!isExecuting && (
                  <button
                    onClick={() => removeCommand(command.id)}
                    className="w-8 h-8 bg-[#8b3a3a] hover:bg-[#a04545] text-[#f4e4c1] rounded border-2 border-[#5d2020] transition-colors pixel-font"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            </div>
          </div>
        )}
      </div>

      {currentCommandIndex >= 0 && (
        <div className="mt-4 p-3 bg-[#2d5016] rounded border-2 border-[#4a7c2e]">
          <p className="text-[#a8d48a] pixel-font text-sm">
            ⚡ Executando comando {currentCommandIndex + 1} de {commands.length}
          </p>
        </div>
      )}
    </div>
  );
}
