import React, { useEffect, useRef } from 'react';
import { Vertex, Edge, GameState } from '../App';

interface GameCanvasProps {
  vertices: Vertex[];
  edges: Edge[];
  gameState: GameState;
  onVertexClick: (vertexId: string) => void;
}

export function GameCanvas({ vertices, edges, gameState, onVertexClick }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredVertex, setHoveredVertex] = React.useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGame = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Limpa o canvas
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(0, 0, width, height);

      // Desenha o fundo de terra/grama
      ctx.fillStyle = '#6B8E23';
      ctx.fillRect(width * 0.08, height * 0.15, width * 0.84, height * 0.7);

      // Desenha folhagem nas bordas (estilo pixel art simplificado)
      drawFoliage(ctx, width, height);

      // Desenha os rios (arestas)
      drawRivers(ctx, width, height);

      // Desenha os pesos nas arestas
      drawEdgeWeights(ctx, width, height);

      // Desenha os vértices
      drawVertices(ctx, width, height);

      // Desenha o barco
      drawBoat(ctx, width, height);
    };

    drawGame();
  }, [vertices, edges, gameState, hoveredVertex]);

  const drawFoliage = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Folhagem esquerda
    ctx.fillStyle = '#2F4F2F';
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * width * 0.12;
      const y = Math.random() * height;
      const size = 20 + Math.random() * 30;
      ctx.fillRect(x, y, size, size);
    }

    // Folhagem direita
    for (let i = 0; i < 15; i++) {
      const x = width * 0.88 + Math.random() * width * 0.12;
      const y = Math.random() * height;
      const size = 20 + Math.random() * 30;
      ctx.fillRect(x, y, size, size);
    }

    // Folhagem superior
    ctx.fillStyle = '#228B22';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height * 0.1;
      const size = 15 + Math.random() * 25;
      ctx.fillRect(x, y, size, size);
    }

    // Folhagem inferior
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = height * 0.9 + Math.random() * height * 0.1;
      const size = 15 + Math.random() * 25;
      ctx.fillRect(x, y, size, size);
    }

    // Adiciona detalhes de plantas mais claras
    ctx.fillStyle = '#3CB371';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width * 0.1;
      const y = Math.random() * height;
      const size = 10 + Math.random() * 15;
      ctx.fillRect(x, y, size, size);
    }

    for (let i = 0; i < 30; i++) {
      const x = width * 0.9 + Math.random() * width * 0.1;
      const y = Math.random() * height;
      const size = 10 + Math.random() * 15;
      ctx.fillRect(x, y, size, size);
    }
  };

  const drawRivers = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#4682B4';
    ctx.lineWidth = 35;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    edges.forEach(edge => {
      const fromVertex = vertices.find(v => v.id === edge.from);
      const toVertex = vertices.find(v => v.id === edge.to);

      if (!fromVertex || !toVertex) return;

      const fromX = (fromVertex.x / 100) * width;
      const fromY = (fromVertex.y / 100) * height;
      const toX = (toVertex.x / 100) * width;
      const toY = (toVertex.y / 100) * height;

      // Verifica se esta aresta está no caminho percorrido
      const isInPath = gameState.path.some((vertex, index) => {
        if (index === 0) return false;
        const prevVertex = gameState.path[index - 1];
        return (prevVertex === edge.from && vertex === edge.to) ||
               (prevVertex === edge.to && vertex === edge.from);
      });

      if (isInPath) {
        ctx.strokeStyle = '#87CEEB';
      } else {
        ctx.strokeStyle = '#4682B4';
      }

      ctx.beginPath();
      ctx.moveTo(fromX, fromY);

      // Adiciona uma curva suave para os rios
      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2;
      const offsetX = (toY - fromY) * 0.1;
      const offsetY = (fromX - toX) * 0.1;

      ctx.quadraticCurveTo(midX + offsetX, midY + offsetY, toX, toY);
      ctx.stroke();

      // Adiciona brilhos no rio (pixel art)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 3; i++) {
        const t = (i + 1) / 4;
        const sparkleX = fromX + (toX - fromX) * t + offsetX * t * (1 - t) * 4;
        const sparkleY = fromY + (toY - fromY) * t + offsetY * t * (1 - t) * 4;
        ctx.fillRect(sparkleX - 3, sparkleY - 3, 6, 6);
      }
    });
  };

  const drawEdgeWeights = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    edges.forEach(edge => {
      const fromVertex = vertices.find(v => v.id === edge.from);
      const toVertex = vertices.find(v => v.id === edge.to);

      if (!fromVertex || !toVertex) return;

      const fromX = (fromVertex.x / 100) * width;
      const fromY = (fromVertex.y / 100) * height;
      const toX = (toVertex.x / 100) * width;
      const toY = (toVertex.y / 100) * height;

      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2;

      // Desenha o fundo do número
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(midX - 18, midY - 18, 36, 36);

      // Borda
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 2;
      ctx.strokeRect(midX - 18, midY - 18, 36, 36);

      // Desenha o número
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.strokeText(edge.weight.toString(), midX, midY);
      ctx.fillText(edge.weight.toString(), midX, midY);
    });
  };

  const drawVertices = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    vertices.forEach(vertex => {
      const x = (vertex.x / 100) * width;
      const y = (vertex.y / 100) * height;
      const isHovered = hoveredVertex === vertex.id;
      const isCurrent = gameState.currentVertex === vertex.id;
      const isVisited = gameState.visitedVertices.includes(vertex.id);

      // Verifica se é clicável (conectado ao vértice atual)
      const isClickable = edges.some(
        e =>
          (e.from === gameState.currentVertex && e.to === vertex.id) ||
          (e.to === gameState.currentVertex && e.from === vertex.id)
      );

      if (vertex.type === 'fort') {
        drawFort(ctx, x, y, isCurrent, isHovered, isClickable);
      } else if (vertex.type === 'village') {
        drawVillage(ctx, x, y, isCurrent, isHovered, isClickable);
      } else if (vertex.type === 'forest') {
        drawForest(ctx, x, y, isCurrent, isHovered, isClickable);
      }

      // Desenha o label do vértice
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeText(vertex.label, x, y + 50);
      ctx.fillText(vertex.label, x, y + 50);
    });
  };

  const drawFort = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    isCurrent: boolean,
    isHovered: boolean,
    isClickable: boolean
  ) => {
    const baseColor = isCurrent ? '#FFD700' : isClickable ? '#D2691E' : '#8B4513';
    const darkColor = isCurrent ? '#DAA520' : isClickable ? '#A0522D' : '#654321';

    // Corpo principal do forte
    ctx.fillStyle = baseColor;
    ctx.fillRect(x - 25, y - 15, 50, 30);

    // Torres laterais
    ctx.fillRect(x - 30, y - 20, 15, 35);
    ctx.fillRect(x + 15, y - 20, 15, 35);

    // Ameias
    ctx.fillRect(x - 30, y - 25, 5, 5);
    ctx.fillRect(x - 20, y - 25, 5, 5);
    ctx.fillRect(x + 15, y - 25, 5, 5);
    ctx.fillRect(x + 25, y - 25, 5, 5);

    // Porta
    ctx.fillStyle = darkColor;
    ctx.fillRect(x - 8, y - 5, 16, 20);

    // Janelas
    ctx.fillStyle = '#000000';
    ctx.fillRect(x - 25, y - 10, 6, 6);
    ctx.fillRect(x + 19, y - 10, 6, 6);

    // Destaque se hover
    if (isHovered && isClickable) {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 32, y - 27, 64, 44);
    }
  };

  const drawVillage = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    isCurrent: boolean,
    isHovered: boolean,
    isClickable: boolean
  ) => {
    const baseColor = isCurrent ? '#FFD700' : isClickable ? '#DAA520' : '#CD853F';

    // Três ocas indígenas
    for (let i = -1; i <= 1; i++) {
      const offsetX = i * 25;

      // Base da oca
      ctx.fillStyle = baseColor;
      ctx.fillRect(x + offsetX - 10, y - 5, 20, 15);

      // Teto cônico
      ctx.beginPath();
      ctx.moveTo(x + offsetX - 12, y - 5);
      ctx.lineTo(x + offsetX, y - 20);
      ctx.lineTo(x + offsetX + 12, y - 5);
      ctx.closePath();
      ctx.fill();

      // Detalhe do teto (mais escuro)
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.moveTo(x + offsetX - 12, y - 5);
      ctx.lineTo(x + offsetX, y - 20);
      ctx.lineTo(x + offsetX, y - 5);
      ctx.closePath();
      ctx.fill();

      // Entrada
      ctx.fillStyle = '#654321';
      ctx.fillRect(x + offsetX - 4, y + 2, 8, 8);
    }

    // Destaque se hover
    if (isHovered && isClickable) {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 40, y - 22, 80, 34);
    }
  };

  const drawForest = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    isCurrent: boolean,
    isHovered: boolean,
    isClickable: boolean
  ) => {
    const treeColor = isCurrent ? '#FFD700' : isClickable ? '#3CB371' : '#228B22';

    // Tronco grande no centro
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - 8, y - 5, 16, 25);

    // Copa da árvore grande
    ctx.fillStyle = treeColor;
    ctx.fillRect(x - 25, y - 20, 50, 30);
    ctx.fillRect(x - 20, y - 30, 40, 20);
    ctx.fillRect(x - 15, y - 35, 30, 15);

    // Árvores menores ao lado
    ctx.fillStyle = '#654321';
    ctx.fillRect(x - 30, y + 5, 8, 15);
    ctx.fillRect(x + 22, y + 5, 8, 15);

    ctx.fillStyle = '#2F4F2F';
    ctx.fillRect(x - 35, y - 5, 18, 15);
    ctx.fillRect(x + 17, y - 5, 18, 15);

    // Destaque se hover
    if (isHovered && isClickable) {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 37, y - 37, 74, 59);
    }
  };

  const drawBoat = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const currentVertex = vertices.find(v => v.id === gameState.currentVertex);
    if (!currentVertex) return;

    const x = (currentVertex.x / 100) * width;
    const y = (currentVertex.y / 100) * height + 65;

    // Casco do barco
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.moveTo(x - 20, y);
    ctx.lineTo(x - 15, y + 10);
    ctx.lineTo(x + 15, y + 10);
    ctx.lineTo(x + 20, y);
    ctx.closePath();
    ctx.fill();

    // Mastro
    ctx.fillStyle = '#654321';
    ctx.fillRect(x - 2, y - 25, 4, 25);

    // Vela
    ctx.fillStyle = '#F5F5DC';
    ctx.beginPath();
    ctx.moveTo(x, y - 25);
    ctx.lineTo(x + 15, y - 15);
    ctx.lineTo(x, y - 5);
    ctx.closePath();
    ctx.fill();

    // Contorno da vela
    ctx.strokeStyle = '#D2B48C';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;

    vertices.forEach(vertex => {
      const vx = (vertex.x / 100) * canvas.width;
      const vy = (vertex.y / 100) * canvas.height;

      const distance = Math.sqrt((x - vx) ** 2 + (y - vy) ** 2);

      if (distance < 50) {
        onVertexClick(vertex.id);
      }
    });
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;

    let foundVertex: string | null = null;

    vertices.forEach(vertex => {
      const vx = (vertex.x / 100) * canvas.width;
      const vy = (vertex.y / 100) * canvas.height;

      const distance = Math.sqrt((x - vx) ** 2 + (y - vy) ** 2);

      if (distance < 50) {
        const isClickable = edges.some(
          e =>
            (e.from === gameState.currentVertex && e.to === vertex.id) ||
            (e.to === gameState.currentVertex && e.from === vertex.id)
        );

        if (isClickable && vertex.id !== gameState.currentVertex) {
          foundVertex = vertex.id;
        }
      }
    });

    setHoveredVertex(foundVertex);
  };

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={700}
      onClick={handleCanvasClick}
      onMouseMove={handleCanvasMouseMove}
      className="w-full h-full cursor-pointer"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
