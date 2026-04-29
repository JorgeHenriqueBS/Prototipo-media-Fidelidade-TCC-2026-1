import { GridCell } from '../App';

interface CellProps {
  cell: GridCell;
  hasPlayer: boolean;
}

export function Cell({ cell, hasPlayer }: CellProps) {
  return (
    <div className="w-20 h-20 relative border-2 border-[#2d5016] bg-[#4a7c2e] pixel-style">
      {/* Grass pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            #3d6b26 2px,
            #3d6b26 4px
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            #3d6b26 2px,
            #3d6b26 4px
          )`
        }} />
      </div>

      {/* Tree */}
      {cell.type === 'tree' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {cell.treeState === 'normal' && (
            <div className="relative">
              {/* Tree trunk */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-8 bg-[#5d3a1a] border-2 border-[#3d2510]" />
              {/* Tree crown */}
              <div className="relative z-10">
                <div className="w-12 h-12 bg-[#2d6b1f] rounded-full border-2 border-[#1a4513]" />
                <div className="absolute top-1 left-1 w-4 h-4 bg-[#3d8b2a] rounded-full opacity-50" />
                <div className="absolute top-2 right-2 w-3 h-3 bg-[#3d8b2a] rounded-full opacity-50" />
              </div>
            </div>
          )}
          
          {cell.treeState === 'cortada' && (
            <div className="relative">
              {/* Tree trunk with cuts */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-8 bg-[#5d3a1a] border-2 border-[#3d2510]">
                <div className="absolute left-0 top-3 w-full h-0.5 bg-[#3d2510]" />
                <div className="absolute left-0 top-5 w-full h-0.5 bg-[#3d2510]" />
                <div className="absolute left-0 top-7 w-full h-0.5 bg-[#3d2510]" />
              </div>
              {/* Tree crown */}
              <div className="relative z-10">
                <div className="w-12 h-12 bg-[#2d6b1f] rounded-full border-2 border-[#1a4513]" />
                <div className="absolute top-1 left-1 w-4 h-4 bg-[#3d8b2a] rounded-full opacity-50" />
                <div className="absolute top-2 right-2 w-3 h-3 bg-[#3d8b2a] rounded-full opacity-50" />
              </div>
              {/* Bowl for collecting rubber */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-6 h-3 bg-[#8b6f47] border-2 border-[#5d4a2f] rounded-b-full" />
            </div>
          )}
          
          {cell.treeState === 'coletada' && (
            <div className="relative">
              {/* Tree trunk with cuts (no bowl) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-8 bg-[#5d3a1a] border-2 border-[#3d2510]">
                <div className="absolute left-0 top-3 w-full h-0.5 bg-[#3d2510]" />
                <div className="absolute left-0 top-5 w-full h-0.5 bg-[#3d2510]" />
                <div className="absolute left-0 top-7 w-full h-0.5 bg-[#3d2510]" />
              </div>
              {/* Tree crown - lighter to show it's done */}
              <div className="relative z-10 opacity-70">
                <div className="w-12 h-12 bg-[#2d6b1f] rounded-full border-2 border-[#1a4513]" />
                <div className="absolute top-1 left-1 w-4 h-4 bg-[#3d8b2a] rounded-full opacity-50" />
                <div className="absolute top-2 right-2 w-3 h-3 bg-[#3d8b2a] rounded-full opacity-50" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Obstacles */}
      {cell.type === 'obstacle' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {cell.obstacleType === 'rock' && (
            <div className="relative w-14 h-12">
              {/* Main rock */}
              <div className="absolute bottom-0 w-14 h-10 bg-[#6b6b6b] border-2 border-[#4a4a4a] rounded-lg" />
              {/* Rock highlights */}
              <div className="absolute top-1 left-2 w-6 h-6 bg-[#8b8b8b] border border-[#6b6b6b] rounded-md" />
              <div className="absolute top-2 right-2 w-4 h-4 bg-[#8b8b8b] border border-[#6b6b6b] rounded-md" />
              {/* Rock shadows */}
              <div className="absolute bottom-0 left-0 w-14 h-2 bg-[#3a3a3a] opacity-50 rounded-b-lg" />
            </div>
          )}
          
          {cell.obstacleType === 'hole' && (
            <div className="relative w-16 h-14">
              {/* Hole outer edge */}
              <div className="absolute inset-0 bg-[#2a1f0f] border-2 border-[#1a1308] rounded-full" />
              {/* Hole inner shadow */}
              <div className="absolute inset-2 bg-[#1a1308] rounded-full" />
              {/* Hole center darkness */}
              <div className="absolute inset-4 bg-black rounded-full" />
              {/* Dirt/grass edges */}
              <div className="absolute top-0 left-2 w-3 h-2 bg-[#5d4a2f] border border-[#3d2a1f] rounded-full opacity-70" />
              <div className="absolute top-1 right-2 w-2 h-2 bg-[#5d4a2f] border border-[#3d2a1f] rounded-full opacity-70" />
              <div className="absolute bottom-1 left-1 w-2 h-2 bg-[#5d4a2f] border border-[#3d2a1f] rounded-full opacity-70" />
            </div>
          )}
          
          {cell.obstacleType === 'log' && (
            <div className="relative w-16 h-12">
              {/* Main log body */}
              <div className="absolute inset-0 bg-[#5d3a1a] border-2 border-[#3d2510] rounded-lg" />
              {/* Log end ring (left) */}
              <div className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-8 bg-[#7d5a3a] border-2 border-[#4d3a1a] rounded-full" />
              <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-6 bg-[#4d3a1a] rounded-full opacity-60" />
              {/* Bark texture lines */}
              <div className="absolute top-2 left-5 right-2 h-0.5 bg-[#3d2510] opacity-50" />
              <div className="absolute top-4 left-6 right-1 h-0.5 bg-[#3d2510] opacity-50" />
              <div className="absolute bottom-2 left-5 right-3 h-0.5 bg-[#3d2510] opacity-50" />
              {/* Log highlights */}
              <div className="absolute top-1 left-6 w-4 h-2 bg-[#7d5a3a] rounded opacity-40" />
              <div className="absolute top-1 right-3 w-3 h-2 bg-[#7d5a3a] rounded opacity-40" />
              {/* Moss/vegetation on log */}
              <div className="absolute bottom-0 left-4 w-6 h-1.5 bg-[#3d6b26] border border-[#2d5016] rounded-t opacity-70" />
              <div className="absolute bottom-0 right-2 w-4 h-1 bg-[#3d6b26] border border-[#2d5016] rounded-t opacity-70" />
            </div>
          )}
          
          {cell.obstacleType === 'jaguar' && (
            <div className="relative w-16 h-16">
              {/* Jaguar body */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-7 bg-[#d4a024] border-2 border-[#8b6914] rounded-lg" />
              
              {/* Jaguar head */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-8 bg-[#d4a024] border-2 border-[#8b6914] rounded-t-lg rounded-b-md">
                {/* Ears */}
                <div className="absolute -top-1 left-0 w-3 h-3 bg-[#d4a024] border-2 border-[#8b6914] rounded-full" />
                <div className="absolute -top-1 right-0 w-3 h-3 bg-[#d4a024] border-2 border-[#8b6914] rounded-full" />
                <div className="absolute -top-0.5 left-0.5 w-2 h-2 bg-[#2a2a2a] rounded-full" />
                <div className="absolute -top-0.5 right-0.5 w-2 h-2 bg-[#2a2a2a] rounded-full" />
                
                {/* Eyes */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-[#4ade80] border border-black rounded-full" />
                <div className="absolute top-2 left-2.5 w-1 h-1.5 bg-black rounded-full" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-[#4ade80] border border-black rounded-full" />
                <div className="absolute top-2 right-2.5 w-1 h-1.5 bg-black rounded-full" />
                
                {/* Nose */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-[#2a2a2a] border border-black rounded-sm" />
                
                {/* Whiskers dots */}
                <div className="absolute top-3 left-0.5 w-1 h-1 bg-black rounded-full" />
                <div className="absolute top-4 left-0 w-1 h-1 bg-black rounded-full" />
                <div className="absolute top-3 right-0.5 w-1 h-1 bg-black rounded-full" />
                <div className="absolute top-4 right-0 w-1 h-1 bg-black rounded-full" />
              </div>
              
              {/* Jaguar spots on body */}
              <div className="absolute bottom-4 left-2 w-2 h-2 bg-[#2a2a2a] border border-black rounded-full" />
              <div className="absolute bottom-5 left-5 w-1.5 h-1.5 bg-[#2a2a2a] border border-black rounded-full" />
              <div className="absolute bottom-3 right-3 w-2 h-2 bg-[#2a2a2a] border border-black rounded-full" />
              <div className="absolute bottom-6 right-5 w-1.5 h-1.5 bg-[#2a2a2a] border border-black rounded-full" />
              
              {/* Jaguar spots on head */}
              <div className="absolute top-1 left-1/2 -translate-x-3 w-1.5 h-1.5 bg-[#2a2a2a] rounded-full" />
              <div className="absolute top-1 left-1/2 translate-x-1.5 w-1.5 h-1.5 bg-[#2a2a2a] rounded-full" />
              
              {/* Front legs */}
              <div className="absolute bottom-0 left-3 w-2 h-4 bg-[#d4a024] border-2 border-[#8b6914]" />
              <div className="absolute bottom-0 right-3 w-2 h-4 bg-[#d4a024] border-2 border-[#8b6914]" />
              
              {/* Paws */}
              <div className="absolute bottom-0 left-3 w-2 h-1 bg-[#2a2a2a] border border-black" />
              <div className="absolute bottom-0 right-3 w-2 h-1 bg-[#2a2a2a] border border-black" />
              
              {/* Tail */}
              <div className="absolute bottom-3 right-0 w-5 h-2 bg-[#d4a024] border-2 border-[#8b6914] rounded-r-full">
                <div className="absolute top-0 right-1 w-1.5 h-1.5 bg-[#2a2a2a] rounded-full" />
              </div>
            </div>
          )}
          
          {cell.obstacleType === 'cliff' && (
            <div className="relative w-16 h-16">
              {/* Cliff face - layered rocks */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#8b7355] to-[#5d4a2f]" />
              
              {/* Rock layers */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-[#6b5d4a] border-b-2 border-[#4a3820]" />
              <div className="absolute top-3 left-0 right-0 h-3 bg-[#5d4a2f] border-b-2 border-[#3d2a1f]" />
              <div className="absolute top-6 left-0 right-0 h-3 bg-[#6b5d4a] border-b-2 border-[#4a3820]" />
              <div className="absolute top-9 left-0 right-0 h-3 bg-[#5d4a2f] border-b-2 border-[#3d2a1f]" />
              <div className="absolute top-12 left-0 right-0 h-4 bg-[#4a3820]" />
              
              {/* Cracks in cliff */}
              <div className="absolute top-2 left-4 w-0.5 h-8 bg-[#3d2a1f] opacity-70" />
              <div className="absolute top-4 right-3 w-0.5 h-6 bg-[#3d2a1f] opacity-70" />
              <div className="absolute top-1 left-8 w-0.5 h-10 bg-[#3d2a1f] opacity-70" />
              
              {/* Rock highlights */}
              <div className="absolute top-1 left-2 w-3 h-1.5 bg-[#8b7355] opacity-50" />
              <div className="absolute top-5 right-2 w-2 h-1 bg-[#8b7355] opacity-50" />
              <div className="absolute top-8 left-3 w-3 h-1 bg-[#8b7355] opacity-50" />
              
              {/* Bottom shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-black opacity-40" />
              
              {/* Vegetation on edge */}
              <div className="absolute top-0 left-1 w-2 h-3 bg-[#3d6b26] border border-[#2d5016] opacity-60" />
              <div className="absolute top-0 right-2 w-1.5 h-2 bg-[#3d6b26] border border-[#2d5016] opacity-60" />
            </div>
          )}
          
          {cell.obstacleType === 'alligator' && (
            <div className="relative w-16 h-16">
              {/* Jaguar body */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-7 bg-[#d4a024] border-2 border-[#8b6914] rounded-lg" />
              
              {/* Jaguar head */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-8 bg-[#d4a024] border-2 border-[#8b6914] rounded-t-lg rounded-b-md">
                {/* Ears */}
                <div className="absolute -top-1 left-0 w-3 h-3 bg-[#d4a024] border-2 border-[#8b6914] rounded-full" />
                <div className="absolute -top-1 right-0 w-3 h-3 bg-[#d4a024] border-2 border-[#8b6914] rounded-full" />
                <div className="absolute -top-0.5 left-0.5 w-2 h-2 bg-[#2a2a2a] rounded-full" />
                <div className="absolute -top-0.5 right-0.5 w-2 h-2 bg-[#2a2a2a] rounded-full" />
                
                {/* Eyes */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-[#4ade80] border border-black rounded-full" />
                <div className="absolute top-2 left-2.5 w-1 h-1.5 bg-black rounded-full" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-[#4ade80] border border-black rounded-full" />
                <div className="absolute top-2 right-2.5 w-1 h-1.5 bg-black rounded-full" />
                
                {/* Nose */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-[#2a2a2a] border border-black rounded-sm" />
                
                {/* Whiskers dots */}
                <div className="absolute top-3 left-0.5 w-1 h-1 bg-black rounded-full" />
                <div className="absolute top-4 left-0 w-1 h-1 bg-black rounded-full" />
                <div className="absolute top-3 right-0.5 w-1 h-1 bg-black rounded-full" />
                <div className="absolute top-4 right-0 w-1 h-1 bg-black rounded-full" />
              </div>
              
              {/* Jaguar spots on body */}
              <div className="absolute bottom-4 left-2 w-2 h-2 bg-[#2a2a2a] border border-black rounded-full" />
              <div className="absolute bottom-5 left-5 w-1.5 h-1.5 bg-[#2a2a2a] border border-black rounded-full" />
              <div className="absolute bottom-3 right-3 w-2 h-2 bg-[#2a2a2a] border border-black rounded-full" />
              <div className="absolute bottom-6 right-5 w-1.5 h-1.5 bg-[#2a2a2a] border border-black rounded-full" />
              
              {/* Jaguar spots on head */}
              <div className="absolute top-1 left-1/2 -translate-x-3 w-1.5 h-1.5 bg-[#2a2a2a] rounded-full" />
              <div className="absolute top-1 left-1/2 translate-x-1.5 w-1.5 h-1.5 bg-[#2a2a2a] rounded-full" />
              
              {/* Front legs */}
              <div className="absolute bottom-0 left-3 w-2 h-4 bg-[#d4a024] border-2 border-[#8b6914]" />
              <div className="absolute bottom-0 right-3 w-2 h-4 bg-[#d4a024] border-2 border-[#8b6914]" />
              
              {/* Paws */}
              <div className="absolute bottom-0 left-3 w-2 h-1 bg-[#2a2a2a] border border-black" />
              <div className="absolute bottom-0 right-3 w-2 h-1 bg-[#2a2a2a] border border-black" />
              
              {/* Tail */}
              <div className="absolute bottom-3 right-0 w-5 h-2 bg-[#d4a024] border-2 border-[#8b6914] rounded-r-full">
                <div className="absolute top-0 right-1 w-1.5 h-1.5 bg-[#2a2a2a] rounded-full" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Player */}
      {hasPlayer && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="relative w-10 h-14 animate-bounce-subtle">
            {/* Head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#d4a574] border-2 border-[#a0784a] rounded-full">
              {/* Hat */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3 bg-[#8b6f47] border-2 border-[#5d4a2f] rounded-t-lg" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-2 bg-[#8b6f47] border-2 border-[#5d4a2f]" />
              {/* Eyes */}
              <div className="absolute top-2 left-1 w-1 h-1 bg-black rounded-full" />
              <div className="absolute top-2 right-1 w-1 h-1 bg-black rounded-full" />
            </div>
            
            {/* Body */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-5 h-6 bg-[#6b4423] border-2 border-[#4a2f17]" />
            
            {/* Arms */}
            <div className="absolute top-7 left-0 w-3 h-1 bg-[#d4a574] border border-[#a0784a]" />
            <div className="absolute top-7 right-0 w-3 h-1 bg-[#d4a574] border border-[#a0784a]" />
            
            {/* Legs */}
            <div className="absolute bottom-0 left-1 w-1.5 h-3 bg-[#4a2f17] border border-[#2a1f0f]" />
            <div className="absolute bottom-0 right-1 w-1.5 h-3 bg-[#4a2f17] border border-[#2a1f0f]" />
          </div>
        </div>
      )}
    </div>
  );
}
