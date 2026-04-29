import { useState } from 'react';
import LogicGameApp from '../../../Fase Lógica de Programação/src/App.tsx';
import GraphGameApp from '../../../Fase Grafos e caminho Mínimo/src/App.tsx';
import BSTGameApp from '../../../Fase Árvores de dados BST/src/App.tsx';

type Screen =
  | 'menu'
  | 'opcoes'
  | 'fases'
  | 'fase-logica-niveis'
  | 'fase-grafos-niveis'
  | 'fase-bst-niveis'
  | 'fase-logica'
  | 'fase-grafos'
  | 'fase-bst'
  | 'encerrado';

const LEVELS = [1, 2, 3, 4, 5] as const;

const CREDITS = [
  { role: 'Autor', name: 'Jorge Henrique' },
  { role: 'Orientadora', name: 'Marcela Pessoa' },
  { role: 'Co-Orientador', name: 'Fabrizio Honda' },
  { role: 'Co-Orientadora', name: 'Fernanda Pires' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [logicInitialLevel, setLogicInitialLevel] = useState(1);
  const [graphInitialLevel, setGraphInitialLevel] = useState(1);
  const [bstInitialLevel, setBstInitialLevel] = useState(1);

  const handleFasesClick = () => {
    setCurrentScreen('fases');
  };

  const handleOpcoesClick = () => {
    setCurrentScreen('opcoes');
  };

  const handleSairClick = () => {
    setCurrentScreen('encerrado');

    window.setTimeout(() => {
      window.close();

      if (!window.closed) {
        window.location.replace('about:blank');
      }
    }, 150);
  };

  const handleVoltarClick = () => {
    setCurrentScreen('menu');
  };

  const handleFaseClick = (fase: string) => () => {
    const normalized = fase.toLowerCase();

    if (normalized.includes('lógica') || normalized.includes('logica')) {
      setCurrentScreen('fase-logica-niveis');
      return;
    }

    if (normalized.includes('caminho')) {
      setCurrentScreen('fase-grafos-niveis');
      return;
    }

    if (normalized.includes('árvore') || normalized.includes('arvore')) {
      setCurrentScreen('fase-bst-niveis');
    }
  };

  const handleLogicLevelClick = (level: number) => () => {
    setLogicInitialLevel(level);
    setCurrentScreen('fase-logica');
  };

  const handleGraphLevelClick = (level: number) => () => {
    setGraphInitialLevel(level);
    setCurrentScreen('fase-grafos');
  };

  const handleBstLevelClick = (level: number) => () => {
    setBstInitialLevel(level);
    setCurrentScreen('fase-bst');
  };

  if (currentScreen === 'fase-logica') {
    return (
      <LogicGameApp
        initialLevel={logicInitialLevel}
        onReturnToMenu={() => setCurrentScreen('menu')}
      />
    );
  }

  if (currentScreen === 'fase-grafos') {
    return (
      <GraphGameApp
        initialLevel={graphInitialLevel}
        onReturnToMenu={() => setCurrentScreen('menu')}
      />
    );
  }

  if (currentScreen === 'fase-bst') {
    return (
      <BSTGameApp
        initialLevel={bstInitialLevel}
        onReturnToMenu={() => setCurrentScreen('menu')}
      />
    );
  }

  if (currentScreen === 'encerrado') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-[#f4e4c1]">
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl font-bold">Encerrando o jogo...</h1>
          <p className="text-lg text-[#d4a574]">
            Se a aba não fechar automaticamente, você pode fechá-la com segurança.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571386630421-f06b6375695a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')",
          filter: 'blur(2px) brightness(0.5)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      <div className="absolute inset-0 fog-layer opacity-30" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8">
        {currentScreen === 'menu' && (
          <>
            <div className="mb-24 title-container">
              <div className="flex flex-col items-center gap-0">
                <div className="title-arc title-line-1">
                  {'Vestígios da'.split('').map((char, index) => (
                    <span
                      key={`line1-${index}`}
                      className="title-char"
                      style={{
                        animationDelay: `${index * 0.05}s`,
                        transform: `rotate(${(index - 6) * 4}deg) translateY(${Math.abs(index - 6) * -2}px)`,
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </div>

                <div className="title-arc title-line-2 mt-2">
                  {'Amazônia'.split('').map((char, index) => (
                    <span
                      key={`line2-${index}`}
                      className="title-char"
                      style={{
                        animationDelay: `${(index + 13) * 0.05}s`,
                        transform: `rotate(${(index - 3.5) * 5}deg) translateY(${Math.abs(index - 3.5) * -3}px)`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="button-container flex flex-col items-center gap-6">
              <button
                onClick={handleFasesClick}
                onMouseEnter={() => setHoveredButton('fases')}
                onMouseLeave={() => setHoveredButton(null)}
                className="game-button"
                style={{
                  animationDelay: '1.2s',
                  transform: hoveredButton === 'fases' ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <div className="button-texture" />
                <span className="relative z-10">Fases</span>
                {hoveredButton === 'fases' && <div className="button-glow" />}
              </button>

              <button
                onClick={handleOpcoesClick}
                onMouseEnter={() => setHoveredButton('opcoes')}
                onMouseLeave={() => setHoveredButton(null)}
                className="game-button"
                style={{
                  animationDelay: '1.3s',
                  transform: hoveredButton === 'opcoes' ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <div className="button-texture" />
                <span className="relative z-10">Opções</span>
                {hoveredButton === 'opcoes' && <div className="button-glow" />}
              </button>

              <button
                onClick={handleSairClick}
                onMouseEnter={() => setHoveredButton('sair')}
                onMouseLeave={() => setHoveredButton(null)}
                className="game-button"
                style={{
                  animationDelay: '1.4s',
                  transform: hoveredButton === 'sair' ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <div className="button-texture" />
                <span className="relative z-10">Sair</span>
                {hoveredButton === 'sair' && <div className="button-glow" />}
              </button>
            </div>
          </>
        )}

        {currentScreen === 'opcoes' && (
          <>
            <div className="mb-12 title-container">
              <h1 className="credits-title">Créditos</h1>
            </div>

            <div className="credits-panel">
              <div className="credits-list">
                {CREDITS.map((credit) => (
                  <div key={credit.role} className="credit-item">
                    <span className="credit-role">{credit.role}</span>
                    <span className="credit-name">{credit.name}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleVoltarClick}
                onMouseEnter={() => setHoveredButton('voltar-opcoes')}
                onMouseLeave={() => setHoveredButton(null)}
                className="game-button back-button"
                style={{
                  animationDelay: '1.1s',
                  transform: hoveredButton === 'voltar-opcoes' ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <div className="button-texture" />
                <span className="relative z-10">← Voltar</span>
                {hoveredButton === 'voltar-opcoes' && <div className="button-glow" />}
              </button>
            </div>
          </>
        )}

        {currentScreen === 'fases' && (
          <>
            <div className="mb-20 title-container">
              <h1 className="fase-title">Seleção de Fases</h1>
            </div>

            <div className="button-container max-w-md w-full flex flex-col items-center gap-5">
              <button
                onClick={handleFaseClick('Lógica de Programação')}
                onMouseEnter={() => setHoveredButton('logica')}
                onMouseLeave={() => setHoveredButton(null)}
                className="game-button fase-button"
                style={{
                  animationDelay: '0.8s',
                  transform: hoveredButton === 'logica' ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <div className="button-texture" />
                <span className="relative z-10">Lógica de Programação</span>
                {hoveredButton === 'logica' && <div className="button-glow" />}
              </button>

              <button
                onClick={handleFaseClick('Caminho Mínimo')}
                onMouseEnter={() => setHoveredButton('caminho')}
                onMouseLeave={() => setHoveredButton(null)}
                className="game-button fase-button"
                style={{
                  animationDelay: '1s',
                  transform: hoveredButton === 'caminho' ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <div className="button-texture" />
                <span className="relative z-10">Caminho Mínimo</span>
                {hoveredButton === 'caminho' && <div className="button-glow" />}
              </button>

              <button
                onClick={handleFaseClick('Árvores de Dados')}
                onMouseEnter={() => setHoveredButton('arvores')}
                onMouseLeave={() => setHoveredButton(null)}
                className="game-button fase-button"
                style={{
                  animationDelay: '1.2s',
                  transform: hoveredButton === 'arvores' ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <div className="button-texture" />
                <span className="relative z-10">Árvores de Dados</span>
                {hoveredButton === 'arvores' && <div className="button-glow" />}
              </button>

              <button
                onClick={() => setCurrentScreen('menu')}
                onMouseEnter={() => setHoveredButton('voltar')}
                onMouseLeave={() => setHoveredButton(null)}
                className="game-button back-button"
                style={{
                  animationDelay: '1.4s',
                  transform: hoveredButton === 'voltar' ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <div className="button-texture" />
                <span className="relative z-10">← Voltar</span>
                {hoveredButton === 'voltar' && <div className="button-glow" />}
              </button>
            </div>
          </>
        )}

        {currentScreen === 'fase-logica-niveis' && (
          <>
            <div className="mb-12 title-container">
              <h1 className="fase-title">Lógica de Programação</h1>
            </div>

            <div className="level-panel">
              <p className="level-description">Escolha o nível para iniciar esta fase.</p>
              <div className="level-grid">
                {LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={handleLogicLevelClick(level)}
                    onMouseEnter={() => setHoveredButton(`logic-level-${level}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                    className="game-button level-button"
                    style={{
                      animationDelay: `${0.7 + level * 0.1}s`,
                      transform: hoveredButton === `logic-level-${level}` ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    <div className="button-texture" />
                    <span className="relative z-10">Nível {level}</span>
                    {hoveredButton === `logic-level-${level}` && <div className="button-glow" />}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentScreen('fases')}
                onMouseEnter={() => setHoveredButton('voltar-niveis')}
                onMouseLeave={() => setHoveredButton(null)}
                className="game-button back-button"
                style={{
                  animationDelay: '1.4s',
                  transform: hoveredButton === 'voltar-niveis' ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <div className="button-texture" />
                <span className="relative z-10">← Voltar</span>
                {hoveredButton === 'voltar-niveis' && <div className="button-glow" />}
              </button>
            </div>
          </>
        )}

        {currentScreen === 'fase-grafos-niveis' && (
          <>
            <div className="mb-12 title-container">
              <h1 className="fase-title">Grafos e Caminho Mínimo</h1>
            </div>

            <div className="level-panel">
              <p className="level-description">Escolha o nível para iniciar esta fase.</p>
              <div className="level-grid">
                {LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={handleGraphLevelClick(level)}
                    onMouseEnter={() => setHoveredButton(`graph-level-${level}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                    className="game-button level-button"
                    style={{
                      animationDelay: `${0.7 + level * 0.1}s`,
                      transform: hoveredButton === `graph-level-${level}` ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    <div className="button-texture" />
                    <span className="relative z-10">Nível {level}</span>
                    {hoveredButton === `graph-level-${level}` && <div className="button-glow" />}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentScreen('fases')}
                onMouseEnter={() => setHoveredButton('voltar-grafos-niveis')}
                onMouseLeave={() => setHoveredButton(null)}
                className="game-button back-button"
                style={{
                  animationDelay: '1.4s',
                  transform: hoveredButton === 'voltar-grafos-niveis' ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <div className="button-texture" />
                <span className="relative z-10">← Voltar</span>
                {hoveredButton === 'voltar-grafos-niveis' && <div className="button-glow" />}
              </button>
            </div>
          </>
        )}

        {currentScreen === 'fase-bst-niveis' && (
          <>
            <div className="mb-12 title-container">
              <h1 className="fase-title">Árvores de Dados BST</h1>
            </div>

            <div className="level-panel">
              <p className="level-description">Escolha o nível para iniciar esta fase.</p>
              <div className="level-grid">
                {LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={handleBstLevelClick(level)}
                    onMouseEnter={() => setHoveredButton(`bst-level-${level}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                    className="game-button level-button"
                    style={{
                      animationDelay: `${0.7 + level * 0.1}s`,
                      transform: hoveredButton === `bst-level-${level}` ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    <div className="button-texture" />
                    <span className="relative z-10">Nível {level}</span>
                    {hoveredButton === `bst-level-${level}` && <div className="button-glow" />}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentScreen('fases')}
                onMouseEnter={() => setHoveredButton('voltar-bst-niveis')}
                onMouseLeave={() => setHoveredButton(null)}
                className="game-button back-button"
                style={{
                  animationDelay: '1.4s',
                  transform: hoveredButton === 'voltar-bst-niveis' ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <div className="button-texture" />
                <span className="relative z-10">← Voltar</span>
                {hoveredButton === 'voltar-bst-niveis' && <div className="button-glow" />}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        :root {
          --forest-green: #1a4d2e;
          --leaf-green: #4f772d;
          --wood-brown: #8b5a3c;
          --aged-yellow: #d4a574;
          --glow-red: #ff3b3b;
        }

        .title-container {
          animation: fadeInDown 1s ease-out forwards;
          opacity: 0;
        }

        .title-arc {
          display: flex;
          justify-content: center;
          position: relative;
        }

        .title-line-1 {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .title-line-2 {
          font-family: 'Uncial Antiqua', serif;
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 400;
          letter-spacing: 0.08em;
        }

        .title-char {
          display: inline-block;
          color: #4f772d;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8))
                  drop-shadow(0 0 20px rgba(79, 119, 45, 0.4));
          animation: charFadeIn 0.5s ease-out forwards;
          opacity: 0;
          text-shadow:
            0 0 10px rgba(79, 119, 45, 0.5),
            0 0 20px rgba(139, 90, 60, 0.3);
          transform-origin: center bottom;
        }

        .button-container {
          animation: fadeInUp 1s ease-out 1s forwards;
          opacity: 0;
        }

        .game-button {
          position: relative;
          min-width: 240px;
          padding: 18px 48px;
          font-family: 'Crimson Text', serif;
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #2c1810;
          background: linear-gradient(
            135deg,
            #d4a574 0%,
            #c9985f 50%,
            #8b5a3c 100%
          );
          border: 3px solid #6d4c3d;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow:
            0 8px 16px rgba(0, 0, 0, 0.6),
            inset 0 2px 0 rgba(255, 255, 255, 0.2),
            inset 0 -2px 8px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .game-button:hover {
          filter: brightness(0.85);
          box-shadow:
            0 12px 24px rgba(0, 0, 0, 0.8),
            inset 0 2px 0 rgba(255, 255, 255, 0.2),
            inset 0 -2px 8px rgba(0, 0, 0, 0.4),
            0 0 30px rgba(212, 165, 116, 0.4);
        }

        .game-button:active {
          transform: scale(0.98) !important;
        }

        .button-texture {
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(139, 90, 60, 0.1) 2px,
              rgba(139, 90, 60, 0.1) 4px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(139, 90, 60, 0.05) 2px,
              rgba(139, 90, 60, 0.05) 4px
            );
          opacity: 0.6;
        }

        .button-glow {
          position: absolute;
          inset: -4px;
          background: radial-gradient(
            circle at center,
            rgba(212, 165, 116, 0.4),
            transparent 70%
          );
          animation: buttonGlowPulse 1.5s ease-in-out infinite;
          z-index: -1;
        }

        .fog-layer {
          background:
            radial-gradient(ellipse at 20% 30%, rgba(79, 119, 45, 0.15), transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 90, 60, 0.1), transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.3), transparent 60%);
          animation: fogDrift 20s ease-in-out infinite;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(212, 165, 116, 0.8), transparent);
          border-radius: 50%;
          animation: particleFloat linear infinite;
          filter: blur(1px);
        }

        .fase-title,
        .credits-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(2rem, 4.5vw, 3.5rem);
          font-weight: 900;
          letter-spacing: 0.12em;
          color: #4f772d;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.9))
                  drop-shadow(0 0 25px rgba(79, 119, 45, 0.5));
          text-align: center;
        }

        .fase-button {
          width: 100%;
          min-width: auto;
          font-size: 1.5rem;
          padding: 16px 32px;
        }

        .back-button {
          margin-top: 16px;
          background: linear-gradient(
            135deg,
            #8b5a3c 0%,
            #6d4c3d 50%,
            #5a3a2a 100%
          );
          border-color: #5a3a2a;
        }

        .back-button:hover {
          filter: brightness(0.9);
        }

        .credits-panel,
        .level-panel {
          width: min(100%, 720px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          animation: fadeInUp 1s ease-out 0.4s forwards;
          opacity: 0;
        }

        .credits-list {
          width: 100%;
          padding: 28px;
          border: 3px solid rgba(212, 165, 116, 0.45);
          border-radius: 18px;
          background: linear-gradient(
            180deg,
            rgba(14, 10, 7, 0.88) 0%,
            rgba(33, 24, 18, 0.82) 100%
          );
          box-shadow:
            0 18px 40px rgba(0, 0, 0, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(6px);
        }

        .credit-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 16px 12px;
        }

        .credit-item + .credit-item {
          border-top: 1px solid rgba(212, 165, 116, 0.22);
        }

        .credit-role {
          font-family: 'Cinzel Decorative', serif;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4f772d;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.75));
        }

        .credit-name {
          color: #F3F3F3;
          font-family: 'Crimson Text', serif;
          font-size: clamp(1.4rem, 2.2vw, 1.9rem);
          font-weight: 600;
          letter-spacing: 0.04em;
          text-align: center;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
        }

        .level-description {
          width: 100%;
          margin: 0;
          padding: 20px 24px;
          border: 3px solid rgba(212, 165, 116, 0.35);
          border-radius: 18px;
          background: linear-gradient(
            180deg,
            rgba(14, 10, 7, 0.88) 0%,
            rgba(33, 24, 18, 0.82) 100%
          );
          color: #f3f3f3;
          font-family: 'Crimson Text', serif;
          font-size: 1.35rem;
          text-align: center;
          box-shadow:
            0 18px 40px rgba(0, 0, 0, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .level-grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .level-button {
          min-width: auto;
          width: 100%;
          font-size: 1.45rem;
          padding: 18px 24px;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes charFadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes buttonGlowPulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes fogDrift {
          0%, 100% {
            transform: translateX(0) scale(1);
          }
          50% {
            transform: translateX(20px) scale(1.05);
          }
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) translateX(30px);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .title-line-1 {
            font-size: 2rem;
            letter-spacing: 0.1em;
          }

          .title-line-2 {
            font-size: 2.5rem;
            letter-spacing: 0.05em;
          }

          .game-button {
            min-width: 200px;
            padding: 14px 36px;
            font-size: 1.5rem;
          }

          .fase-button,
          .level-button {
            font-size: 1.25rem;
            padding: 14px 24px;
          }

          .fase-title,
          .credits-title {
            font-size: 1.75rem;
            letter-spacing: 0.08em;
          }

          .credits-list {
            padding: 20px 18px;
          }

          .credit-role {
            font-size: 0.9rem;
          }

          .credit-name {
            font-size: 1.2rem;
          }

          .level-description {
            font-size: 1.05rem;
            padding: 16px 18px;
          }

          .level-grid {
            grid-template-columns: 1fr;
          }

          .book-glow {
            width: 150px;
            height: 180px;
          }
        }
      `}</style>
    </div>
  );
}
