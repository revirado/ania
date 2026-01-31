'use client';

import { GameStateManager } from '@/lib/game/GameState';
import ObservationDesk from './ObservationDesk';
import LibraryUI from './LibraryUI';
import MusicPlayer from './MusicPlayer';
import styles from './SceneManager.module.css';

interface SceneManagerProps {
  gameState: GameStateManager;
}

export default function SceneManager({ gameState }: SceneManagerProps) {
  const currentScreen = gameState.getCurrentScreen();

  const handleLibraryClose = () => {
    // Cambiar a pantalla de observación
    gameState.changeScreen('observation');
  };

  const handleMusicPlayerClose = () => {
    // Cambiar a pantalla de observación
    gameState.changeScreen('observation');
  };

  return (
    <div className={styles.sceneContainer}>
      {/* Fondo principal - imagen estática */}
      <div className={styles.background} />
      
      {/* Escena activa */}
      <div className={styles.activeScene}>
        {currentScreen === 'observation' && (
          <ObservationDesk gameState={gameState} />
        )}
        
        {currentScreen === 'library' && (
          <LibraryUI 
            onClose={handleLibraryClose}
            onSearch={(results) => {
              // Manejar resultados de búsqueda
              console.log('Resultados de búsqueda:', results);
            }}
          />
        )}
        
        {currentScreen === 'musicPlayer' && (
          <MusicPlayer onClose={handleMusicPlayerClose} />
        )}
      </div>
    </div>
  );
}