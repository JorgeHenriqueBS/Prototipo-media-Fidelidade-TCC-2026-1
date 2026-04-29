import { useDrop } from 'react-dnd';
import { TucumaIcon, BuritiIcon, CupuacuIcon, JamboIcon, AcaiIcon, MatrinxaIcon, JaraquiIcon, PupunhaIcon, TambaquiIcon, PirarucuIcon, BodoIcon } from './FoodIcons';

interface FoodItem {
  id: string;
  name: string;
  value: number;
  icon: 'tucuma' | 'buriti' | 'cupuacu' | 'jambo' | 'acai' | 'matrinxa' | 'jaraqui' | 'pupunha' | 'tambaqui' | 'pirarucu' | 'bodo';
}

interface TreeNodeData {
  id: string;
  value: number | null;
  foodName: string | null;
  icon: 'tucuma' | 'buriti' | 'cupuacu' | 'jambo' | 'acai' | 'matrinxa' | 'jaraqui' | 'pupunha' | 'tambaqui' | 'pirarucu' | 'bodo' | null;
}

interface TreeNodeProps {
  node: TreeNodeData;
  onDrop: (food: FoodItem) => void;
  onRemove: () => void;
  size?: number;
}

export function TreeNode({ node, onDrop, onRemove, size = 90 }: TreeNodeProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'FOOD',
    drop: (item: FoodItem) => {
      onDrop(item);
    },
    canDrop: () => node.value === null,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [node.value, onDrop]);

  const iconSize = size * 0.7;
  const badgeSize = size * 0.28;
  const fontSize = size < 80 ? 'text-[10px]' : 'text-xs';

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={drop}
        className={`
          border-8 flex flex-col items-center justify-center
          relative transition-all duration-200 -mt-1
          ${node.value === null 
            ? 'bg-[#fef3c7] border-[#7f1d1d] border-dashed' 
            : 'bg-[#fef3c7] border-[#7f1d1d] border-solid'
          }
          ${isOver && canDrop ? 'ring-8 ring-yellow-400 scale-105' : ''}
          ${!canDrop && isOver ? 'ring-8 ring-red-500' : ''}
        `}
        style={{ 
          width: `${size}px`,
          height: `${size}px`,
          imageRendering: 'pixelated',
          boxShadow: node.value !== null ? '0 6px 0 #5a1010' : 'inset 0 0 20px rgba(127, 29, 29, 0.2)',
        }}
      >
        {node.value === null ? (
          <div className={`text-[#7f1d1d] ${fontSize} text-center opacity-50`}>vazio</div>
        ) : (
          <>
            <div className="mb-1">
              {node.icon === 'tucuma' && <TucumaIcon size={iconSize} />}
              {node.icon === 'buriti' && <BuritiIcon size={iconSize} />}
              {node.icon === 'cupuacu' && <CupuacuIcon size={iconSize} />}
              {node.icon === 'jambo' && <JamboIcon size={iconSize} />}
              {node.icon === 'acai' && <AcaiIcon size={iconSize} />}
              {node.icon === 'matrinxa' && <MatrinxaIcon size={iconSize} />}
              {node.icon === 'jaraqui' && <JaraquiIcon size={iconSize} />}
              {node.icon === 'pupunha' && <PupunhaIcon size={iconSize} />}
              {node.icon === 'tambaqui' && <TambaquiIcon size={iconSize} />}
              {node.icon === 'pirarucu' && <PirarucuIcon size={iconSize} />}
              {node.icon === 'bodo' && <BodoIcon size={iconSize} />}
            </div>
            <div className={`${fontSize} text-[#7f1d1d]`}>{node.foodName}</div>
            <div 
              className={`absolute top-2 right-2 bg-[#fef3c7] border-2 border-[#7f1d1d] flex items-center justify-center text-[#7f1d1d] ${fontSize}`}
              style={{
                width: `${badgeSize}px`,
                height: `${badgeSize}px`,
              }}
            >
              {node.value}
            </div>
            <button
              onClick={onRemove}
              className="absolute -top-3 -right-3 w-8 h-8 bg-red-600 hover:bg-red-700 text-white border-4 border-red-900 flex items-center justify-center transition-transform hover:scale-110"
              style={{ imageRendering: 'pixelated', borderRadius: '50%' }}
            >
              ×
            </button>
          </>
        )}
      </div>
    </div>
  );
}