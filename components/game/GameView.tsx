'use client';

import { useState, useEffect } from 'react';
import { GameStateManager } from '@/lib/game/GameState';
import { GameScreen } from '@/types/game';
import SceneManager from './SceneManager';
import GameCamera from './GameCamera';
import UIOverlay from './UIOverlay';
import styles from './GameView.module.css';

export default function GameView() {
  const [gameState, setGameState] = useState<GameStateManager | null>(null);

  useEffect(() => {
    const game = new GameStateManager();
    setGameState(game);

    return () => {
      // Cleanup
    };
  }, []);

  const handleScreenChange = (screen: GameScreen) => {
    gameState?.changeScreen(screen);
    // Forzar re-render
    setGameState(new GameStateManager());
  };

  if (!gameState) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.gameContainer}>
      <GameCamera currentScreen={gameState.getCurrentScreen()}>
        <SceneManager gameState={gameState} />
      </GameCamera>
      <UIOverlay
        gameState={gameState}
        onScreenChange={handleScreenChange}
      />
    </div>
  );
}