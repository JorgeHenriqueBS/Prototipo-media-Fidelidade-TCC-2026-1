import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TreeNode } from './TreeNode';
import { DraggableFood } from './DraggableFood';
import { ResultModal } from './ResultModal';
import { CompletionModal } from './CompletionModal';

interface FoodItem {
  id: string;
  name: string;
  value: number;
  icon: 'tucuma' | 'jambo' | 'acai' | 'pupunha' | 'matrinxa' | 'jaraqui' | 'tambaqui' | 'pirarucu' | 'bodo';
  placed: boolean;
}

interface TreeNodeData {
  id: string;
  value: number | null;
  foodName: string | null;
  icon: 'tucuma' | 'jambo' | 'acai' | 'pupunha' | 'matrinxa' | 'jaraqui' | 'tambaqui' | 'pirarucu' | 'bodo' | null;
}

interface BSTGameLevel5Props {
  onNextLevel?: () => void;
  onReturnToMenu?: () => void;
}

export function BSTGameLevel5({ onNextLevel, onReturnToMenu }: BSTGameLevel5Props) {
  const [foods, setFoods] = useState<FoodItem[]>([
    { id: 'tucuma', name: 'Tucumã', value: 1, icon: 'tucuma', placed: false },
    { id: 'jambo', name: 'Jambo', value: 4, icon: 'jambo', placed: false },
    { id: 'acai', name: 'Ramo de Açaí', value: 5, icon: 'acai', placed: false },
    { id: 'pupunha', name: 'Pupunha', value: 6, icon: 'pupunha', placed: false },
    { id: 'matrinxa', name: 'Matrinxã', value: 7, icon: 'matrinxa', placed: false },
    { id: 'jaraqui', name: 'Jaraqui', value: 8, icon: 'jaraqui', placed: false },
    { id: 'tambaqui', name: 'Tambaqui', value: 9, icon: 'tambaqui', placed: false },
    { id: 'pirarucu', name: 'Pirarucu', value: 10, icon: 'pirarucu', placed: false },
    { id: 'bodo', name: 'Bodó', value: 11, icon: 'bodo', placed: false },
  ]);

  const [tree, setTree] = useState<TreeNodeData[]>([
    { id: 'root', value: null, foodName: null, icon: null },
    { id: 'left-l2', value: null, foodName: null, icon: null },
    { id: 'right-l2', value: null, foodName: null, icon: null },
    { id: 'left-left-l3', value: null, foodName: null, icon: null },
    { id: 'left-right-l3', value: null, foodName: null, icon: null },
    { id: 'right-right-l3', value: null, foodName: null, icon: null },
    { id: 'left-right-left-l4', value: null, foodName: null, icon: null },
    { id: 'left-right-right-l4', value: null, foodName: null, icon: null },
    { id: 'right-right-left-l4', value: null, foodName: null, icon: null },
  ]);

  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

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
    // Solução correta: root=8, left-l2=4, right-l2=10, left-left-l3=1, left-right-l3=6, right-right-l3=11, left-right-left-l4=5, left-right-right-l4=7, right-right-left-l4=9
    const correct = 
      tree[0].value === 8 &&
      tree[1].value === 4 &&
      tree[2].value === 10 &&
      tree[3].value === 1 &&
      tree[4].value === 6 &&
      tree[5].value === 11 &&
      tree[6].value === 5 &&
      tree[7].value === 7 &&
      tree[8].value === 9;

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
      { id: 'jambo', name: 'Jambo', value: 4, icon: 'jambo', placed: false },
      { id: 'acai', name: 'Ramo de Açaí', value: 5, icon: 'acai', placed: false },
      { id: 'pupunha', name: 'Pupunha', value: 6, icon: 'pupunha', placed: false },
      { id: 'matrinxa', name: 'Matrinxã', value: 7, icon: 'matrinxa', placed: false },
      { id: 'jaraqui', name: 'Jaraqui', value: 8, icon: 'jaraqui', placed: false },
      { id: 'tambaqui', name: 'Tambaqui', value: 9, icon: 'tambaqui', placed: false },
      { id: 'pirarucu', name: 'Pirarucu', value: 10, icon: 'pirarucu', placed: false },
      { id: 'bodo', name: 'Bodó', value: 11, icon: 'bodo', placed: false },
    ]);

    setTree([
      { id: 'root', value: null, foodName: null, icon: null },
      { id: 'left-l2', value: null, foodName: null, icon: null },
      { id: 'right-l2', value: null, foodName: null, icon: null },
      { id: 'left-left-l3', value: null, foodName: null, icon: null },
      { id: 'left-right-l3', value: null, foodName: null, icon: null },
      { id: 'right-right-l3', value: null, foodName: null, icon: null },
      { id: 'left-right-left-l4', value: null, foodName: null, icon: null },
      { id: 'left-right-right-l4', value: null, foodName: null, icon: null },
      { id: 'right-right-left-l4', value: null, foodName: null, icon: null },
    ]);

    setShowResult(false);
    setIsCorrect(false);
  };

  const handleNextLevel = () => {
    setShowResult(false);
    setShowCompletion(true);
  };

  const handleCloseModal = () => {
    setShowResult(false);
  };

  const handleCloseCompletion = () => {
    setShowCompletion(false);

    if (onReturnToMenu) {
      onReturnToMenu();
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
        <div className="relative flex-1 flex items-start justify-center pt-4 pb-1">

          {/*
            Layout da árvore (nó size = 75px, half = 37.5):
            Calculado de baixo para cima (folhas → raiz):

            Nível 3 (folhas): D=42, G=138, H=228, I=393
            Nível 2:  E=(138+228)/2=183  F=478  D=42(folha)
            Nível 1:  B=(42+183)/2=112   C=415
            Nível 0:  A=(112+415)/2=264

            vertGap=30, levelHeight=105
            Container: 520×390px
          */}
          <div className="relative" style={{ width: 520, height: 390 }}>

            {/* SVG de Conexões — atrás dos nós */}
            <svg
              className="absolute inset-0 pointer-events-none z-10"
              width={520}
              height={390}
              style={{ imageRendering: 'pixelated' }}
            >
              <defs>
                <pattern id="weavePattern5" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="8" height="8" fill="#c2410c"/>
                  <rect x="8" y="8" width="8" height="8" fill="#c2410c"/>
                  <rect x="8" y="0" width="8" height="8" fill="#000000"/>
                  <rect x="0" y="8" width="8" height="8" fill="#000000"/>
                </pattern>
              </defs>

              {/* Sombras */}
              <line x1={264} y1={37.5}  x2={112}  y2={142.5} stroke="#000" strokeWidth={18} strokeLinecap="round" opacity={0.3}/>
              <line x1={264} y1={37.5}  x2={415}  y2={142.5} stroke="#000" strokeWidth={18} strokeLinecap="round" opacity={0.3}/>
              <line x1={112} y1={142.5} x2={42}   y2={247.5} stroke="#000" strokeWidth={18} strokeLinecap="round" opacity={0.3}/>
              <line x1={112} y1={142.5} x2={183}  y2={247.5} stroke="#000" strokeWidth={18} strokeLinecap="round" opacity={0.3}/>
              <line x1={415} y1={142.5} x2={478}  y2={247.5} stroke="#000" strokeWidth={18} strokeLinecap="round" opacity={0.3}/>
              <line x1={183} y1={247.5} x2={138}  y2={352.5} stroke="#000" strokeWidth={18} strokeLinecap="round" opacity={0.3}/>
              <line x1={183} y1={247.5} x2={228}  y2={352.5} stroke="#000" strokeWidth={18} strokeLinecap="round" opacity={0.3}/>
              <line x1={478} y1={247.5} x2={393}  y2={352.5} stroke="#000" strokeWidth={18} strokeLinecap="round" opacity={0.3}/>

              {/* Arestas com padrão xadrez indígena */}
              {/* A → B */}
              <line x1={264} y1={37.5}  x2={112}  y2={142.5} stroke="url(#weavePattern5)" strokeWidth={12} strokeLinecap="round"/>
              {/* A → C */}
              <line x1={264} y1={37.5}  x2={415}  y2={142.5} stroke="url(#weavePattern5)" strokeWidth={12} strokeLinecap="round"/>
              {/* B → D */}
              <line x1={112} y1={142.5} x2={42}   y2={247.5} stroke="url(#weavePattern5)" strokeWidth={12} strokeLinecap="round"/>
              {/* B → E */}
              <line x1={112} y1={142.5} x2={183}  y2={247.5} stroke="url(#weavePattern5)" strokeWidth={12} strokeLinecap="round"/>
              {/* C → F (filho direito) */}
              <line x1={415} y1={142.5} x2={478}  y2={247.5} stroke="url(#weavePattern5)" strokeWidth={12} strokeLinecap="round"/>
              {/* E → G */}
              <line x1={183} y1={247.5} x2={138}  y2={352.5} stroke="url(#weavePattern5)" strokeWidth={12} strokeLinecap="round"/>
              {/* E → H */}
              <line x1={183} y1={247.5} x2={228}  y2={352.5} stroke="url(#weavePattern5)" strokeWidth={12} strokeLinecap="round"/>
              {/* F → I (filho esquerdo) */}
              <line x1={478} y1={247.5} x2={393}  y2={352.5} stroke="url(#weavePattern5)" strokeWidth={12} strokeLinecap="round"/>
            </svg>

            {/* Nó A — Raiz (Nível 0) */}
            <div className="absolute z-20" style={{ top: 0, left: 226.5 }}>
              <TreeNode
                node={tree[0]}
                onDrop={(food) => handleDrop('root', food)}
                onRemove={() => handleRemove('root')}
                size={75}
              />
            </div>

            {/* Nó B — Esquerda Nível 1 */}
            <div className="absolute z-20" style={{ top: 105, left: 74.5 }}>
              <TreeNode
                node={tree[1]}
                onDrop={(food) => handleDrop('left-l2', food)}
                onRemove={() => handleRemove('left-l2')}
                size={75}
              />
            </div>

            {/* Nó C — Direita Nível 1 (sem filho esquerdo) */}
            <div className="absolute z-20" style={{ top: 105, left: 377.5 }}>
              <TreeNode
                node={tree[2]}
                onDrop={(food) => handleDrop('right-l2', food)}
                onRemove={() => handleRemove('right-l2')}
                size={75}
              />
            </div>

            {/* Nó D — Folha esquerda-esquerda (Nível 2) */}
            <div className="absolute z-20" style={{ top: 210, left: 4.5 }}>
              <TreeNode
                node={tree[3]}
                onDrop={(food) => handleDrop('left-left-l3', food)}
                onRemove={() => handleRemove('left-left-l3')}
                size={75}
              />
            </div>

            {/* Nó E — Esquerda-direita Nível 2 */}
            <div className="absolute z-20" style={{ top: 210, left: 145.5 }}>
              <TreeNode
                node={tree[4]}
                onDrop={(food) => handleDrop('left-right-l3', food)}
                onRemove={() => handleRemove('left-right-l3')}
                size={75}
              />
            </div>

            {/* Nó F — Direita-direita Nível 2 (sem filho direito) */}
            <div className="absolute z-20" style={{ top: 210, left: 440.5 }}>
              <TreeNode
                node={tree[5]}
                onDrop={(food) => handleDrop('right-right-l3', food)}
                onRemove={() => handleRemove('right-right-l3')}
                size={75}
              />
            </div>

            {/* Nó G — Folha E-esquerda (Nível 3) */}
            <div className="absolute z-20" style={{ top: 315, left: 100.5 }}>
              <TreeNode
                node={tree[6]}
                onDrop={(food) => handleDrop('left-right-left-l4', food)}
                onRemove={() => handleRemove('left-right-left-l4')}
                size={75}
              />
            </div>

            {/* Nó H — Folha E-direita (Nível 3) */}
            <div className="absolute z-20" style={{ top: 315, left: 190.5 }}>
              <TreeNode
                node={tree[7]}
                onDrop={(food) => handleDrop('left-right-right-l4', food)}
                onRemove={() => handleRemove('left-right-right-l4')}
                size={75}
              />
            </div>

            {/* Nó I — Folha F-esquerda (Nível 3) */}
            <div className="absolute z-20" style={{ top: 315, left: 355.5 }}>
              <TreeNode
                node={tree[8]}
                onDrop={(food) => handleDrop('right-right-left-l4', food)}
                onRemove={() => handleRemove('right-right-left-l4')}
                size={75}
              />
            </div>
          </div>

          {/* Botão Verificar */}
          {tree.every(n => n.value !== null) && (
            <button
              onClick={checkSolution}
              className="absolute bottom-1 right-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white border-4 border-green-900 text-sm"
              style={{ imageRendering: 'pixelated', boxShadow: '0 4px 0 #14532d' }}
            >
              ✓ Verificar
            </button>
          )}
        </div>

        {/* Barra Inferior (Cuia) */}
        <div className="relative z-10 p-2 pb-3">
          <div 
            className="relative mx-auto max-w-6xl px-6 py-3"
            style={{
              background: 'linear-gradient(to bottom, #6b4423 0%, #5a3a1f 50%, #4a2f19 100%)',
              borderRadius: '50% / 40%',
              border: '6px solid #3d2414',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 -4px 8px rgba(0,0,0,0.3)',
              imageRendering: 'pixelated',
            }}
          >
            {/* Padrões decorativos laterais - estilo indígena */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-12 opacity-40">
              <svg width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
                <pattern id="trianglePattern5" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <polygon points="6,2 10,10 2,10" fill="#fbbf24" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#trianglePattern5)" />
              </svg>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-12 opacity-40">
              <svg width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
                <rect width="100%" height="100%" fill="url(#trianglePattern5)" />
              </svg>
            </div>
            
            <div className="relative flex justify-center items-center gap-2">
              {foods.filter(f => !f.placed).map(food => (
                <DraggableFood key={food.id} food={food} />
              ))}
              {foods.every(f => f.placed) && (
                <div className="text-amber-100 text-center px-6 py-2">
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

        {/* Modal de Conclusão */}
        {showCompletion && (
          <CompletionModal
            onClose={handleCloseCompletion}
            returnLabel={onReturnToMenu ? 'Voltar ao Main Menu' : '✨ Finalizar ✨'}
          />
        )}
      </div>
    </DndProvider>
  );
}
