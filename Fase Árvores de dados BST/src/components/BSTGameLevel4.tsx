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
  icon: 'tucuma' | 'cupuacu' | 'jambo' | 'pupunha' | 'jaraqui' | 'tambaqui' | 'pirarucu';
  placed: boolean;
}

interface TreeNodeData {
  id: string;
  value: number | null;
  foodName: string | null;
  icon: 'tucuma' | 'cupuacu' | 'jambo' | 'pupunha' | 'jaraqui' | 'tambaqui' | 'pirarucu' | null;
}

interface BSTGameLevel4Props {
  onNextLevel?: () => void;
}

export function BSTGameLevel4({ onNextLevel }: BSTGameLevel4Props) {
  const [foods, setFoods] = useState<FoodItem[]>([
    { id: 'tucuma', name: 'Tucumã', value: 1, icon: 'tucuma', placed: false },
    { id: 'cupuacu', name: 'Cupuaçu', value: 3, icon: 'cupuacu', placed: false },
    { id: 'jambo', name: 'Jambo', value: 4, icon: 'jambo', placed: false },
    { id: 'pupunha', name: 'Pupunha', value: 6, icon: 'pupunha', placed: false },
    { id: 'jaraqui', name: 'Jaraqui', value: 8, icon: 'jaraqui', placed: false },
    { id: 'tambaqui', name: 'Tambaqui', value: 9, icon: 'tambaqui', placed: false },
    { id: 'pirarucu', name: 'Pirarucu', value: 10, icon: 'pirarucu', placed: false },
  ]);

  const [tree, setTree] = useState<TreeNodeData[]>([
    { id: 'root', value: null, foodName: null, icon: null },
    { id: 'left-l2', value: null, foodName: null, icon: null },
    { id: 'right-l2', value: null, foodName: null, icon: null },
    { id: 'left-left-l3', value: null, foodName: null, icon: null },
    { id: 'left-right-l3', value: null, foodName: null, icon: null },
    { id: 'right-left-l3', value: null, foodName: null, icon: null },
    { id: 'right-right-l3', value: null, foodName: null, icon: null },
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
    // Solução correta: root=6, left-l2=3, right-l2=9, left-left-l3=1, left-right-l3=4, right-left-l3=8, right-right-l3=10
    const correct = 
      tree[0].value === 6 &&
      tree[1].value === 3 &&
      tree[2].value === 9 &&
      tree[3].value === 1 &&
      tree[4].value === 4 &&
      tree[5].value === 8 &&
      tree[6].value === 10;

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
      { id: 'cupuacu', name: 'Cupuaçu', value: 3, icon: 'cupuacu', placed: false },
      { id: 'jambo', name: 'Jambo', value: 4, icon: 'jambo', placed: false },
      { id: 'pupunha', name: 'Pupunha', value: 6, icon: 'pupunha', placed: false },
      { id: 'jaraqui', name: 'Jaraqui', value: 8, icon: 'jaraqui', placed: false },
      { id: 'tambaqui', name: 'Tambaqui', value: 9, icon: 'tambaqui', placed: false },
      { id: 'pirarucu', name: 'Pirarucu', value: 10, icon: 'pirarucu', placed: false },
    ]);

    setTree([
      { id: 'root', value: null, foodName: null, icon: null },
      { id: 'left-l2', value: null, foodName: null, icon: null },
      { id: 'right-l2', value: null, foodName: null, icon: null },
      { id: 'left-left-l3', value: null, foodName: null, icon: null },
      { id: 'left-right-l3', value: null, foodName: null, icon: null },
      { id: 'right-left-l3', value: null, foodName: null, icon: null },
      { id: 'right-right-l3', value: null, foodName: null, icon: null },
    ]);

    setShowResult(false);
    setIsCorrect(false);
  };

  const handleNextLevel = () => {
    if (onNextLevel) {
      onNextLevel();
    } else {
      alert('Próximo nível ainda não implementado!');
    }
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

        {/* Área da Árvore */}
        <div className="relative flex-1 flex items-start justify-center pt-6 pb-2">

          {/*
            Layout da árvore (nó size = 81px, half = 40.5):

            Nível 0 (Raiz A):  cx=228, top=0
            Nível 1 (B, C):    cy=156.5 (top=116)
              B: cx=103   C: cx=353
            Nível 2 (D,E,F,G): cy=272.5 (top=232)
              D: cx=40.5  E: cx=165.5  F: cx=290.5  G: cx=415.5

            Container width = 456px, height = 313px
          */}
          <div className="relative" style={{ width: 456, height: 313 }}>

            {/* SVG de Conexões — atrás dos nós */}
            <svg
              className="absolute inset-0 pointer-events-none z-10"
              width={456}
              height={313}
              style={{ imageRendering: 'pixelated' }}
            >
              <defs>
                <pattern id="weavePattern4" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="8" height="8" fill="#c2410c"/>
                  <rect x="8" y="8" width="8" height="8" fill="#c2410c"/>
                  <rect x="8" y="0" width="8" height="8" fill="#000000"/>
                  <rect x="0" y="8" width="8" height="8" fill="#000000"/>
                </pattern>
              </defs>

              {/* Sombra das arestas (camada inferior) */}
              <line x1={228} y1={40.5}  x2={103}   y2={156.5} stroke="#000" strokeWidth={20} strokeLinecap="round" opacity={0.3}/>
              <line x1={228} y1={40.5}  x2={353}   y2={156.5} stroke="#000" strokeWidth={20} strokeLinecap="round" opacity={0.3}/>
              <line x1={103} y1={156.5} x2={40.5}  y2={272.5} stroke="#000" strokeWidth={20} strokeLinecap="round" opacity={0.3}/>
              <line x1={103} y1={156.5} x2={165.5} y2={272.5} stroke="#000" strokeWidth={20} strokeLinecap="round" opacity={0.3}/>
              <line x1={353} y1={156.5} x2={290.5} y2={272.5} stroke="#000" strokeWidth={20} strokeLinecap="round" opacity={0.3}/>
              <line x1={353} y1={156.5} x2={415.5} y2={272.5} stroke="#000" strokeWidth={20} strokeLinecap="round" opacity={0.3}/>

              {/* Arestas com padrão xadrez indígena */}
              {/* A → B */}
              <line x1={228} y1={40.5}  x2={103}   y2={156.5} stroke="url(#weavePattern4)" strokeWidth={14} strokeLinecap="round"/>
              {/* A → C */}
              <line x1={228} y1={40.5}  x2={353}   y2={156.5} stroke="url(#weavePattern4)" strokeWidth={14} strokeLinecap="round"/>
              {/* B → D */}
              <line x1={103} y1={156.5} x2={40.5}  y2={272.5} stroke="url(#weavePattern4)" strokeWidth={14} strokeLinecap="round"/>
              {/* B → E */}
              <line x1={103} y1={156.5} x2={165.5} y2={272.5} stroke="url(#weavePattern4)" strokeWidth={14} strokeLinecap="round"/>
              {/* C → F */}
              <line x1={353} y1={156.5} x2={290.5} y2={272.5} stroke="url(#weavePattern4)" strokeWidth={14} strokeLinecap="round"/>
              {/* C → G */}
              <line x1={353} y1={156.5} x2={415.5} y2={272.5} stroke="url(#weavePattern4)" strokeWidth={14} strokeLinecap="round"/>
            </svg>

            {/* Nó A — Raiz (Nível 0) */}
            <div className="absolute z-20" style={{ top: 0, left: 187.5 }}>
              <TreeNode
                node={tree[0]}
                onDrop={(food) => handleDrop('root', food)}
                onRemove={() => handleRemove('root')}
                size={81}
              />
            </div>

            {/* Nó B — Esquerda Nível 1 */}
            <div className="absolute z-20" style={{ top: 116, left: 62.5 }}>
              <TreeNode
                node={tree[1]}
                onDrop={(food) => handleDrop('left-l2', food)}
                onRemove={() => handleRemove('left-l2')}
                size={81}
              />
            </div>

            {/* Nó C — Direita Nível 1 */}
            <div className="absolute z-20" style={{ top: 116, left: 312.5 }}>
              <TreeNode
                node={tree[2]}
                onDrop={(food) => handleDrop('right-l2', food)}
                onRemove={() => handleRemove('right-l2')}
                size={81}
              />
            </div>

            {/* Nó D — Folha esquerda-esquerda (Nível 2) */}
            <div className="absolute z-20" style={{ top: 232, left: 0 }}>
              <TreeNode
                node={tree[3]}
                onDrop={(food) => handleDrop('left-left-l3', food)}
                onRemove={() => handleRemove('left-left-l3')}
                size={81}
              />
            </div>

            {/* Nó E — Folha esquerda-direita (Nível 2) */}
            <div className="absolute z-20" style={{ top: 232, left: 125 }}>
              <TreeNode
                node={tree[4]}
                onDrop={(food) => handleDrop('left-right-l3', food)}
                onRemove={() => handleRemove('left-right-l3')}
                size={81}
              />
            </div>

            {/* Nó F — Folha direita-esquerda (Nível 2) */}
            <div className="absolute z-20" style={{ top: 232, left: 250 }}>
              <TreeNode
                node={tree[5]}
                onDrop={(food) => handleDrop('right-left-l3', food)}
                onRemove={() => handleRemove('right-left-l3')}
                size={81}
              />
            </div>

            {/* Nó G — Folha direita-direita (Nível 2) */}
            <div className="absolute z-20" style={{ top: 232, left: 375 }}>
              <TreeNode
                node={tree[6]}
                onDrop={(food) => handleDrop('right-right-l3', food)}
                onRemove={() => handleRemove('right-right-l3')}
                size={81}
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
        <div className="relative z-10 p-2 pb-4">
          <div 
            className="relative mx-auto max-w-5xl px-8 py-4"
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
                <pattern id="trianglePattern4" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <polygon points="6,2 10,10 2,10" fill="#fbbf24" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#trianglePattern4)" />
              </svg>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-16 opacity-40">
              <svg width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
                <rect width="100%" height="100%" fill="url(#trianglePattern4)" />
              </svg>
            </div>
            
            <div className="relative flex justify-center items-center gap-3">
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