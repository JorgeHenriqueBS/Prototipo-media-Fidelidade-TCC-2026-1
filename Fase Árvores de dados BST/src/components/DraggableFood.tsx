import { useDrag } from 'react-dnd';
import { TucumaIcon, BuritiIcon, CupuacuIcon, JamboIcon, AcaiIcon, MatrinxaIcon, JaraquiIcon, PupunhaIcon, TambaquiIcon, PirarucuIcon, BodoIcon } from './FoodIcons';

interface FoodItem {
  id: string;
  name: string;
  value: number;
  icon: 'tucuma' | 'buriti' | 'cupuacu' | 'jambo' | 'acai' | 'matrinxa' | 'jaraqui' | 'pupunha' | 'tambaqui' | 'pirarucu' | 'bodo';
}

interface DraggableFoodProps {
  food: FoodItem;
}

export function DraggableFood({ food }: DraggableFoodProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FOOD',
    item: food,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [food]);

  return (
    <div
      ref={drag}
      className={`
        w-28 h-32 bg-[#fef3c7] border-6 border-[#7f1d1d]
        flex flex-col items-center justify-center gap-1 relative
        cursor-move transition-all duration-200
        hover:scale-105 hover:shadow-2xl
        ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
      `}
      style={{ 
        imageRendering: 'pixelated',
        boxShadow: isDragging ? 'none' : '0 6px 0 #5a1010',
      }}
    >
      {/* Número no canto superior direito */}
      <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-[#fef3c7] border-2 border-[#7f1d1d] flex items-center justify-center text-[#7f1d1d] text-xs">
        {food.value}
      </div>
      
      <div className="mt-2">
        {food.icon === 'tucuma' && <TucumaIcon size={56} />}
        {food.icon === 'buriti' && <BuritiIcon size={56} />}
        {food.icon === 'cupuacu' && <CupuacuIcon size={56} />}
        {food.icon === 'jambo' && <JamboIcon size={56} />}
        {food.icon === 'acai' && <AcaiIcon size={56} />}
        {food.icon === 'matrinxa' && <MatrinxaIcon size={56} />}
        {food.icon === 'jaraqui' && <JaraquiIcon size={56} />}
        {food.icon === 'pupunha' && <PupunhaIcon size={56} />}
        {food.icon === 'tambaqui' && <TambaquiIcon size={56} />}
        {food.icon === 'pirarucu' && <PirarucuIcon size={56} />}
        {food.icon === 'bodo' && <BodoIcon size={56} />}
      </div>
      <div className="text-xs text-[#7f1d1d] mt-1">{food.name}</div>
    </div>
  );
}