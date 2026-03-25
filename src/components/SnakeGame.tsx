import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 120;

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    setFood(newFood);
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        setIsPaused(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 100);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!isPaused && !isGameOver) {
      gameLoopRef.current = window.setInterval(moveSnake, SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPaused, isGameOver, moveSnake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setIsGameOver(false);
    setScore(0);
    setIsPaused(false);
    generateFood();
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black border-[6px] border-glitch-cyan shadow-[12px_12px_0px_#ff00ff]">
      <div className="mb-8 flex items-center justify-center gap-8 w-full font-pixel">
        <h2 className="text-lg glitch-text text-glitch-cyan" data-text="CORE_PROCESS">CORE_PROCESS</h2>
        <div className="text-lg text-glitch-magenta">
          DATA: {score.toString().padStart(6, '0')}
        </div>
      </div>

      <div 
        className="relative bg-black border-2 border-glitch-cyan/50 overflow-hidden"
        style={{ 
          width: GRID_SIZE * 16, 
          height: GRID_SIZE * 16,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-10" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }} 
        />

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`${i === 0 ? 'bg-glitch-cyan shadow-[0_0_8px_#00ffff]' : 'bg-glitch-cyan/40'}`}
            style={{
              gridColumnStart: segment.x + 1,
              gridRowStart: segment.y + 1,
              border: '1px solid black'
            }}
          />
        ))}

        {/* Food */}
        <motion.div
          animate={{ 
            opacity: [1, 0.5, 1],
            scale: [1, 1.1, 1]
          }}
          transition={{ repeat: Infinity, duration: 0.2 }}
          className="bg-glitch-magenta shadow-[0_0_10px_#ff00ff]"
          style={{
            gridColumnStart: food.x + 1,
            gridRowStart: food.y + 1,
          }}
        />

        {/* Overlays */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-10">
            <h3 className="text-lg font-pixel glitch-text text-glitch-magenta mb-6" data-text="FATAL_ERROR">FATAL_ERROR</h3>
            <button 
              onClick={resetGame}
              className="jarring-button"
            >
              REBOOT_SYSTEM
            </button>
          </div>
        )}

        {isPaused && !isGameOver && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
            <button 
              onClick={() => setIsPaused(false)}
              className="bg-glitch-cyan text-black px-10 py-4 font-pixel text-lg shadow-[6px_6px_0px_#ff00ff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#ff00ff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              EXECUTE_INIT
            </button>
            <div className="mt-10 text-[10px] text-glitch-cyan font-pixel leading-relaxed text-center space-y-2">
              <p>INPUT_VECTORS: ARROWS</p>
              <p>INTERRUPT: SPACE</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
