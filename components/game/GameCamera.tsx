'use client';

import { ReactNode } from 'react';
import { GameScreen } from '@/types/game';
import styles from './GameCamera.module.css';

interface GameCameraProps {
  children: ReactNode;
  currentScreen: GameScreen;
}

export default function GameCamera({ children, currentScreen }: GameCameraProps) {
  const getCameraPosition = () => {
    switch (currentScreen) {
      case 'observation':
        return styles.center;
      case 'library':
        return styles.left;
      case 'musicPlayer':
        return styles.right;
      default:
        return styles.center;
    }
  };

  return (
    <div className={`${styles.cameraContainer} ${getCameraPosition()}`}>
      <div className={styles.cameraContent}>
        {children}
      </div>
    </div>
  );
}