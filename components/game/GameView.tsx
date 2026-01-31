'use client';

import { useState } from 'react';
import styles from './GameView.module.css';

export default function GameView() {
  const [currentScreen, setCurrentScreen] = useState('observation');

  return (
    <div className={styles.gameContainer}>
      <h1>🎮 ANIA - El Misterio de la Máscara</h1>
      <p>Prototipo del juego cargado correctamente</p>
      
      <div className={styles.screens}>
        <button onClick={() => setCurrentScreen('library')}>
          📚 Biblioteca
        </button>
        <button onClick={() => setCurrentScreen('observation')}>
          🎨 Mesa de Observación
        </button>
        <button onClick={() => setCurrentScreen('music')}>
          🎵 Música
        </button>
      </div>
      
      <div className={styles.currentScreen}>
        Pantalla actual: <strong>{currentScreen}</strong>
      </div>
    </div>
  );
}