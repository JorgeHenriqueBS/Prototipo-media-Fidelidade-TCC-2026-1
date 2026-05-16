import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TreeNode } from './TreeNode';
import { DraggableFood } from './DraggableFood';
import { ResultModal } from './ResultModal';

interface FoodItem {
  id: string;
  name: string;
  value: number;
  icon: 'tucuma' | 'buriti' | 'cupuacu';
  placed: boolean;
}

interface TreeNodeData {
  id: string;
  value: number | null;
  foodName: string | null;
  icon: 'tucuma' | 'buriti' | 'cupuacu' | null;
}

interface BSTGameProps {
  onNextLevel: () => void;
}

export function BSTGame({ onNextLevel }: BSTGameProps) {
  const instructions = [
    'Organize os alimentos coletados pela tribo para a refeição. Insira cada alimento na árvore de dados conforme seu número, usando as regras de organização de Árvores de dados Binárias.',
    'Cada nó (vazio) da árvore tem até dois nós ligados a ele, chamados de filhos. Para cada nó, os filhos do lado esquerdo devem ter valor menor que o alimento posicionado lá e os do lado direito devem ter valor maior. Arraste todos os alimentos para a árvore seguindo esse critério.',
    'Uma dica: A partir do nó superior, todos os alimentos à esquerda dele devem ser menores que ele e todos os à direita devem ser maiores.',
  ];

  const [foods, setFoods] = useState<FoodItem[]>([
    { id: 'tucuma', name: 'Tucumã', value: 1, icon: 'tucuma', placed: false },
    { id: 'buriti', name: 'Buriti', value: 2, icon: 'buriti', placed: false },
    { id: 'cupuacu', name: 'Cupuaçu', value: 3, icon: 'cupuacu', placed: false },
  ]);

  const [tree, setTree] = useState<TreeNodeData[]>([
    { id: 'root', value: null, foodName: null, icon: null },
    { id: 'left', value: null, foodName: null, icon: null },
    { id: 'right', value: null, foodName: null, icon: null },
  ]);

  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHistoricalIntro, setShowHistoricalIntro] = useState(true);

  const handleDrop = (nodeId: string, food: FoodItem) => {
    const nodeIndex = tree.findIndex(n => n.id === nodeId);
    if (nodeIndex === -1) return;

    // Verifica se o nó está vazio
    if (tree[nodeIndex].value !== null) {
      return; // Nó já ocupado
    }

    // Verifica se o alimento já foi colocado em outro lugar
    if (food.placed) {
      return; // Alimento já está na árvore
    }

    // Atualiza a árvore
    const newTree = [...tree];
    newTree[nodeIndex] = {
      ...newTree[nodeIndex],
      value: food.value,
      foodName: food.name,
      icon: food.icon,
    };
    setTree(newTree);

    // Marca o alimento como colocado
    setFoods(prevFoods => prevFoods.map(f => 
      f.id === food.id ? { ...f, placed: true } : f
    ));
  };

  const handleRemove = (nodeId: string) => {
    const nodeIndex = tree.findIndex(n => n.id === nodeId);
    if (nodeIndex === -1) return;

    const node = tree[nodeIndex];
    if (!node.value) return;

    // Devolve o alimento para a barra
    setFoods(foods.map(f => 
      f.value === node.value ? { ...f, placed: false } : f
    ));

    // Limpa o nó
    const newTree = [...tree];
    newTree[nodeIndex] = {
      ...newTree[nodeIndex],
      value: null,
      foodName: null,
      icon: null,
    };
    setTree(newTree);
  };

  const checkSolution = () => {
    // Solução correta: root=2, left=1, right=3
    const correct = 
      tree[0].value === 2 &&
      tree[1].value === 1 &&
      tree[2].value === 3;

    if (correct) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowResult(true);
  };

  const handleReplay = () => {
    setFoods([
      { id: 'tucuma', name: 'Tucumã', value: 1, icon: 'tucuma', placed: false },
      { id: 'buriti', name: 'Buriti', value: 2, icon: 'buriti', placed: false },
      { id: 'cupuacu', name: 'Cupuaçu', value: 3, icon: 'cupuacu', placed: false },
    ]);

    setTree([
      { id: 'root', value: null, foodName: null, icon: null },
      { id: 'left', value: null, foodName: null, icon: null },
      { id: 'right', value: null, foodName: null, icon: null },
    ]);

    setShowResult(false);
    setIsCorrect(false);
  };

  const handleCloseModal = () => {
    setShowResult(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div 
        className="w-full h-screen relative flex flex-col"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1543125274-c53157f43fbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwdmlsbGFnZSUyMGFtYXpvbnxlbnwxfHx8fDE3NjQxMjc0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          imageRendering: 'pixelated',
        }}
      >
        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0 bg-black/40" />

        <div
          className="absolute right-0 top-4 z-10 w-[360px] bg-[#fef3c7]/95 border-4 border-[#7f1d1d] px-4 py-3 text-[#3b1d0a] shadow-xl"
          style={{ imageRendering: 'pixelated' }}
        >
          <h2 className="mb-2 text-sm text-[#7f1d1d]">Instruções</h2>
          <div className="space-y-2 text-[11px] leading-5">
            {instructions.map((instruction) => (
              <p key={instruction}>{instruction}</p>
            ))}
          </div>
        </div>

        {/* Área da Árvore */}
        <div className="relative flex-1 flex items-center justify-center p-8">
          <div className="relative pt-20">
            {/* Nó Raiz */}
            <div className="flex justify-center mb-8 relative z-20">
              <TreeNode
                node={tree[0]}
                onDrop={(food) => handleDrop('root', food)}
                onRemove={() => handleRemove('root')}
                size={88}
              />
            </div>

            {/* Conexões - visual trançado de cesta indígena */}
            <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[520px] h-[150px] pointer-events-none z-10">
              <svg className="absolute left-0 top-0 w-full h-full" style={{ imageRendering: 'pixelated' }}>
                <defs>
                  <pattern id="weavePattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="8" height="8" fill="#c2410c"/>
                    <rect x="8" y="8" width="8" height="8" fill="#c2410c"/>
                    <rect x="8" y="0" width="8" height="8" fill="#000000"/>
                    <rect x="0" y="8" width="8" height="8" fill="#000000"/>
                  </pattern>
                </defs>
                
                {/* Conexão esquerda: sai horizontal da lateral esquerda, curva para baixo e desce até o topo do nó esquerdo */}
                <path
                  d="M 200 30 L 150 30 Q 120 30, 120 60 L 120 150"
                  stroke="url(#weavePattern)"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 200 30 L 150 30 Q 120 30, 120 60 L 120 150"
                  stroke="#000000"
                  strokeWidth="24"
                  fill="none"
                  opacity="0.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Conexão direita: sai horizontal da lateral direita, curva para baixo e desce até o topo do nó direito */}
                <path
                  d="M 320 30 L 370 30 Q 400 30, 400 60 L 400 150"
                  stroke="url(#weavePattern)"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 320 30 L 370 30 Q 400 30, 400 60 L 400 150"
                  stroke="#000000"
                  strokeWidth="24"
                  fill="none"
                  opacity="0.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Nós Filhos */}
            <div className="flex justify-center gap-48">
              <TreeNode
                node={tree[1]}
                onDrop={(food) => handleDrop('left', food)}
                onRemove={() => handleRemove('left')}
                size={88}
              />
              <TreeNode
                node={tree[2]}
                onDrop={(food) => handleDrop('right', food)}
                onRemove={() => handleRemove('right')}
                size={88}
              />
            </div>
          </div>

          {/* Botão Verificar */}
          {tree.every(n => n.value !== null) && (
            <button
              onClick={checkSolution}
              className="absolute bottom-8 right-8 px-8 py-4 bg-green-600 hover:bg-green-700 text-white border-4 border-green-900"
              style={{ imageRendering: 'pixelated', boxShadow: '0 6px 0 #14532d' }}
            >
              ✓ Verificar
            </button>
          )}
        </div>

        {/* Barra Inferior (Cuia) */}
        <div className="relative z-10 p-4 pb-6">
          <div 
            className="relative mx-auto max-w-3xl px-12 py-6"
            style={{
              background: 'linear-gradient(to bottom, #6b4423 0%, #5a3a1f 50%, #4a2f19 100%)',
              borderRadius: '50% / 40%',
              border: '6px solid #3d2414',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 -4px 8px rgba(0,0,0,0.3)',
              imageRendering: 'pixelated',
            }}
          >
            {/* Padrões decorativos laterais - estilo indígena */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-16 opacity-40">
              <svg width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
                <pattern id="trianglePattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <polygon points="6,2 10,10 2,10" fill="#fbbf24" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#trianglePattern)" />
              </svg>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-16 opacity-40">
              <svg width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
                <rect width="100%" height="100%" fill="url(#trianglePattern)" />
              </svg>
            </div>
            
            <div className="relative flex justify-center items-center gap-8">
              {foods.filter(f => !f.placed).map(food => (
                <DraggableFood key={food.id} food={food} />
              ))}
              {foods.every(f => f.placed) && (
                <div className="text-amber-100 text-center px-6 py-3">
                  <p>Todos os alimentos foram colocados na árvore!</p>
                  <p className="text-sm mt-1 text-amber-300">Clique em "Verificar" para conferir</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal de Resultado */}
        {showResult && (
          <ResultModal
            isCorrect={isCorrect}
            onReplay={handleReplay}
            onNextLevel={onNextLevel}
            onClose={handleCloseModal}
          />
        )}

        {showHistoricalIntro && (
          <div className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-[1px] flex items-center justify-center p-6">
            <div className="w-full max-w-4xl max-h-[88vh] bg-[#8B4513] border-8 border-[#654321] rounded-lg shadow-2xl flex flex-col">
              <div className="overflow-y-auto px-8 py-8 text-[#F5DEB3] text-center space-y-6 leading-relaxed">
                <h2 className="text-3xl text-[#FFD700]">Alimentação dos Povos Pré-Colombianos (Antes de 1500)</h2>
                <p>
                  Estudos sobre os hábitos de alimentação dos Povos Originários que habitavam o Amazonas, desde séculos antes do contato com os europeus, apontam para uma dieta com alimentos diversificados e a extração sustentável da natureza.
                </p>
                <p>
                  Raízes como Mandioca e Milho eram pilares das refeições, colhidos da própria agricultura das tribos na qual praticava adubação com Terra Preta e mudança do lugar de plantio, garantindo que o solo se renovasse para novas safras. Frutas locais como Tucumã, cupuaçu e buriti também eram coletados da mata para somar a nutrição dos indivíduos.
                </p>
                <p>
                  A pesca configurava o segundo pilar da alimentação, com grande consumo de diferentes peixes da região como Pirarucu, Matrinchã, Tambaqui, Jaraqui e outros de acordo com as cheias e secas dos rios. A depender da proximidade dos rios, algumas tribos também complementavam suas dietas com a caça de espécies como pacas e jabutis.
                </p>
              </div>
              <div className="px-8 pb-8 pt-2 flex justify-center">
                <button
                  onClick={() => setShowHistoricalIntro(false)}
                  className="bg-[#FFD700] hover:bg-[#DAA520] text-[#654321] font-semibold py-3 px-8 rounded border-2 border-[#654321] transition-colors"
                >
                  Prepara refeição
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
