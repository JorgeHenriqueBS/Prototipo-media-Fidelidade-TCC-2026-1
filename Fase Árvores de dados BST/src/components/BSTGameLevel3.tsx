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
  icon: 'buriti' | 'cupuacu' | 'acai' | 'matrinxa' | 'jaraqui';
  placed: boolean;
}

interface TreeNodeData {
  id: string;
  value: number | null;
  foodName: string | null;
  icon: 'buriti' | 'cupuacu' | 'acai' | 'matrinxa' | 'jaraqui' | null;
}

interface BSTGameLevel3Props {
  onNextLevel?: () => void;
}

export function BSTGameLevel3({ onNextLevel }: BSTGameLevel3Props) {
  const [foods, setFoods] = useState<FoodItem[]>([
    { id: 'buriti', name: 'Buriti', value: 2, icon: 'buriti', placed: false },
    { id: 'cupuacu', name: 'Cupuaçu', value: 3, icon: 'cupuacu', placed: false },
    { id: 'acai', name: 'Ramo de Açaí', value: 5, icon: 'acai', placed: false },
    { id: 'matrinxa', name: 'Matrinxã', value: 7, icon: 'matrinxa', placed: false },
    { id: 'jaraqui', name: 'Jaraqui', value: 8, icon: 'jaraqui', placed: false },
  ]);

  const [tree, setTree] = useState<TreeNodeData[]>([
    { id: 'root', value: null, foodName: null, icon: null },
    { id: 'left-l2', value: null, foodName: null, icon: null },
    { id: 'right-l2', value: null, foodName: null, icon: null },
    { id: 'left-right-l3', value: null, foodName: null, icon: null },
    { id: 'right-left-l3', value: null, foodName: null, icon: null },
  ]);

  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDrop = (nodeId: string, food: FoodItem) => {
    const nodeIndex = tree.findIndex(n => n.id === nodeId);
    if (nodeIndex === -1) return;

    if (tree[nodeIndex].value !== null) {
      return;
    }

    if (food.placed) {
      return;
    }

    const newTree = [...tree];
    newTree[nodeIndex] = {
      ...newTree[nodeIndex],
      value: food.value,
      foodName: food.name,
      icon: food.icon,
    };
    setTree(newTree);

    setFoods(prevFoods => prevFoods.map(f => 
      f.id === food.id ? { ...f, placed: true } : f
    ));
  };

  const handleRemove = (nodeId: string) => {
    const nodeIndex = tree.findIndex(n => n.id === nodeId);
    if (nodeIndex === -1) return;

    const node = tree[nodeIndex];
    if (!node.value) return;

    setFoods(foods.map(f => 
      f.value === node.value ? { ...f, placed: false } : f
    ));

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
    // Solução correta: root=5, left-l2=2, right-l2=8, left-right-l3=3, right-left-l3=7
    const correct = 
      tree[0].value === 5 &&
      tree[1].value === 2 &&
      tree[2].value === 8 &&
      tree[3].value === 3 &&
      tree[4].value === 7;

    if (correct) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowResult(true);
  };

  const handleReplay = () => {
    setFoods([
      { id: 'buriti', name: 'Buriti', value: 2, icon: 'buriti', placed: false },
      { id: 'cupuacu', name: 'Cupuaçu', value: 3, icon: 'cupuacu', placed: false },
      { id: 'acai', name: 'Ramo de Açaí', value: 5, icon: 'acai', placed: false },
      { id: 'matrinxa', name: 'Matrinxã', value: 7, icon: 'matrinxa', placed: false },
      { id: 'jaraqui', name: 'Jaraqui', value: 8, icon: 'jaraqui', placed: false },
    ]);

    setTree([
      { id: 'root', value: null, foodName: null, icon: null },
      { id: 'left-l2', value: null, foodName: null, icon: null },
      { id: 'right-l2', value: null, foodName: null, icon: null },
      { id: 'left-right-l3', value: null, foodName: null, icon: null },
      { id: 'right-left-l3', value: null, foodName: null, icon: null },
    ]);

    setShowResult(false);
    setIsCorrect(false);
  };

  const handleCloseModal = () => {
    setShowResult(false);
  };

  const handleNextLevel = () => {
    if (onNextLevel) {
      onNextLevel();
    } else {
      alert('Próximo nível ainda não implementado!');
    }
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

        {/* Área da Árvore */}
        <div className="relative flex-1 flex items-start justify-center pt-8 pb-2">
          <div className="relative">
            {/* Nó Raiz */}
            <div className="flex justify-center mb-8 relative z-20">
              <TreeNode
                node={tree[0]}
                onDrop={(food) => handleDrop('root', food)}
                onRemove={() => handleRemove('root')}
                size={88}
              />
            </div>

            {/* Conexões Nível 1 -> Nível 2 */}
            <div className="absolute top-[24px] left-1/2 -translate-x-1/2 w-[400px] h-[90px] pointer-events-none z-10">
              <svg className="absolute left-0 top-0 w-full h-full" style={{ imageRendering: 'pixelated' }}>
                <defs>
                  <pattern id="weavePatternL2" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="8" height="8" fill="#c2410c"/>
                    <rect x="8" y="8" width="8" height="8" fill="#c2410c"/>
                    <rect x="8" y="0" width="8" height="8" fill="#000000"/>
                    <rect x="0" y="8" width="8" height="8" fill="#000000"/>
                  </pattern>
                </defs>
                
                {/* Conexão esquerda raiz -> nó esquerdo nível 2 */}
                <path
                  d="M 165 22 L 115 22 Q 90 22, 90 42 L 90 90"
                  stroke="url(#weavePatternL2)"
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 165 22 L 115 22 Q 90 22, 90 42 L 90 90"
                  stroke="#000000"
                  strokeWidth="20"
                  fill="none"
                  opacity="0.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Conexão direita raiz -> nó direito nível 2 */}
                <path
                  d="M 235 22 L 285 22 Q 310 22, 310 42 L 310 90"
                  stroke="url(#weavePatternL2)"
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 235 22 L 285 22 Q 310 22, 310 42 L 310 90"
                  stroke="#000000"
                  strokeWidth="20"
                  fill="none"
                  opacity="0.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Nós Nível 2 */}
            <div className="flex justify-center gap-40 mb-8 relative z-20">
              <TreeNode
                node={tree[1]}
                onDrop={(food) => handleDrop('left-l2', food)}
                onRemove={() => handleRemove('left-l2')}
                size={88}
              />
              <TreeNode
                node={tree[2]}
                onDrop={(food) => handleDrop('right-l2', food)}
                onRemove={() => handleRemove('right-l2')}
                size={88}
              />
            </div>

            {/* Conexões Nível 2 -> Nível 3 */}
            <div className="absolute top-[114px] left-1/2 -translate-x-1/2 w-[400px] h-[90px] pointer-events-none z-10">
              <svg className="absolute left-0 top-0 w-full h-full" style={{ imageRendering: 'pixelated' }}>
                <defs>
                  <pattern id="weavePatternL3" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="8" height="8" fill="#c2410c"/>
                    <rect x="8" y="8" width="8" height="8" fill="#c2410c"/>
                    <rect x="8" y="0" width="8" height="8" fill="#000000"/>
                    <rect x="0" y="8" width="8" height="8" fill="#000000"/>
                  </pattern>
                </defs>
                
                {/* Conexão da esquerda: nó esquerdo nível 2 -> filho direito (nó 3) */}
                <path
                  d="M 125 22 L 165 22 Q 185 22, 185 42 L 185 90"
                  stroke="url(#weavePatternL3)"
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 125 22 L 165 22 Q 185 22, 185 42 L 185 90"
                  stroke="#000000"
                  strokeWidth="20"
                  fill="none"
                  opacity="0.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Conexão da direita: nó direito nível 2 -> filho esquerdo (nó 7) */}
                <path
                  d="M 275 22 L 235 22 Q 215 22, 215 42 L 215 90"
                  stroke="url(#weavePatternL3)"
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 275 22 L 235 22 Q 215 22, 215 42 L 215 90"
                  stroke="#000000"
                  strokeWidth="20"
                  fill="none"
                  opacity="0.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Nós Nível 3 - filho direito da esquerda e filho esquerdo da direita */}
            <div className="flex justify-center gap-6">
              <TreeNode
                node={tree[3]}
                onDrop={(food) => handleDrop('left-right-l3', food)}
                onRemove={() => handleRemove('left-right-l3')}
                size={88}
              />
              <TreeNode
                node={tree[4]}
                onDrop={(food) => handleDrop('right-left-l3', food)}
                onRemove={() => handleRemove('right-left-l3')}
                size={88}
              />
            </div>
          </div>

          {/* Botão Verificar */}
          {tree.every(n => n.value !== null) && (
            <button
              onClick={checkSolution}
              className="absolute bottom-2 right-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white border-4 border-green-900 text-sm"
              style={{ imageRendering: 'pixelated', boxShadow: '0 4px 0 #14532d' }}
            >
              ✓ Verificar
            </button>
          )}
        </div>

        {/* Barra Inferior (Cuia) */}
        <div className="relative z-10 p-4 pb-6">
          <div 
            className="relative mx-auto max-w-4xl px-12 py-6"
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
            
            <div className="relative flex justify-center items-center gap-6">
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
            onNextLevel={handleNextLevel}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </DndProvider>
  );
}