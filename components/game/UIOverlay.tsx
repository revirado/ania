'use client';

import { useState } from 'react';
import { GameScreen, UIElement } from '@/types/game';
import { GameStateManager } from '@/lib/game/GameState';
import styles from './UIOverlay.module.css';

interface UIOverlayProps {
  gameState: GameStateManager;
  onScreenChange: (screen: GameScreen) => void;
}

export default function UIOverlay({ gameState, onScreenChange }: UIOverlayProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  
  const currentScreen = gameState.getCurrentScreen();

  const handleNavigation = (screen: GameScreen) => {
    onScreenChange(screen);
  };

  const handleQuickSave = () => {
    // Implementar guardado rápido
    console.log('Juego guardado');
    // Mostrar feedback visual
  };

  const handleLoadGame = () => {
    // Implementar carga
    console.log('Cargando partida...');
  };

  return (
    <div className={styles.uiOverlay}>
      {/* Barra superior */}
      <div className={styles.topBar}>
        <div className={styles.gameTitle}>
          ANIA - Investigación Antropológica
        </div>
        
        <div className={styles.gameStatus}>
          <span className={styles.statusItem}>
            📝 Pistas descubiertas: <strong>3/12</strong>
          </span>
          <span className={styles.statusItem}>
            🔍 Observaciones: <strong>5</strong>
          </span>
          <span className={styles.statusItem}>
            📚 Entradas bibliográficas: <strong>8</strong>
          </span>
        </div>
      </div>
      
      {/* Barra lateral izquierda - Navegación */}
      <div className={styles.leftSidebar}>
        <button 
          className={`${styles.navButton} ${currentScreen === 'observation' ? styles.active : ''}`}
          onClick={() => handleNavigation('observation')}
          title="Mesa de Observación"
        >
          🔍 Observación
        </button>
        
        <button 
          className={`${styles.navButton} ${currentScreen === 'library' ? styles.active : ''}`}
          onClick={() => handleNavigation('library')}
          title="Biblioteca de Referencia"
        >
          📚 Biblioteca
        </button>
        
        <button 
          className={`${styles.navButton} ${currentScreen === 'musicPlayer' ? styles.active : ''}`}
          onClick={() => handleNavigation('musicPlayer')}
          title="Gramófono Musical"
        >
          🎵 Música
        </button>
        
        <div className={styles.sidebarDivider} />
        
        <button 
          className={styles.navButton}
          onClick={() => setShowNotebook(true)}
          title="Cuaderno de Notas"
        >
          📓 Notas
        </button>
        
        <button 
          className={styles.navButton}
          onClick={handleQuickSave}
          title="Guardar Progreso"
        >
          💾 Guardar
        </button>
        
        <button 
          className={styles.navButton}
          onClick={() => setShowMenu(true)}
          title="Menú del Juego"
        >
          ⚙️ Menú
        </button>
      </div>
      
      {/* Barra inferior */}
      <div className={styles.bottomBar}>
        <div className={styles.quickActions}>
          <button className={styles.actionButton} title="Tomar foto de evidencia">
            📸
          </button>
          <button className={styles.actionButton} title="Abrir mapa de investigación">
            🗺️
          </button>
          <button className={styles.actionButton} title="Ver progreso">
            📊
          </button>
        </div>
        
        <div className={styles.hints}>
          <p className={styles.hintText}>
            {currentScreen === 'observation' && '🔍 Haz clic en la lupa para examinar detalles'}
            {currentScreen === 'library' && '📚 Busca palabras clave relacionadas con lo observado'}
            {currentScreen === 'musicPlayer' && '🎵 Da cuerda al gramófono para música ambiental'}
          </p>
        </div>
        
        <div className={styles.gameTime}>
          ⏱️ Tiempo de investigación: <strong>00:15:23</strong>
        </div>
      </div>
      
      {/* Menú modal */}
      {showMenu && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Menú del Juego</h2>
            <div className={styles.modalButtons}>
              <button className={styles.modalButton} onClick={handleQuickSave}>
                💾 Guardar Partida
              </button>
              <button className={styles.modalButton} onClick={handleLoadGame}>
                📂 Cargar Partida
              </button>
              <button className={styles.modalButton}>
                🎚️ Ajustes
              </button>
              <button className={styles.modalButton}>
                🏠 Volver al Menú Principal
              </button>
              <button className={styles.modalButton}>
                ❓ Ayuda
              </button>
              <button 
                className={`${styles.modalButton} ${styles.closeButton}`}
                onClick={() => setShowMenu(false)}
              >
                ✕ Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Cuaderno modal */}
      {showNotebook && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>📓 Cuaderno de Investigación</h2>
            <div className={styles.notebookContent}>
              <div className={styles.notebookSection}>
                <h3>Pistas Descubiertas</h3>
                <ul>
                  <li>Sello de la Secretaría de Arqueología de Salta</li>
                  <li>Símbolos tribales identificados</li>
                  <li>Material: Madera de algarrobo tallada</li>
                </ul>
              </div>
              
              <div className={styles.notebookSection}>
                <h3>Hipótesis</h3>
                <textarea 
                  className={styles.hypothesisInput}
                  placeholder="Escribe tus hipótesis aquí..."
                  rows={4}
                />
              </div>
              
              <div className={styles.notebookSection}>
                <h3>Próximos Pasos</h3>
                <ul>
                  <li>Investigar más sobre los símbolos encontrados</li>
                  <li>Buscar información sobre rituales Chiriguano-Chané</li>
                  <li>Examinar el reverso de la máscara</li>
                </ul>
              </div>
            </div>
            <button 
              className={styles.closeNotebookButton}
              onClick={() => setShowNotebook(false)}
            >
              Cerrar Cuaderno
            </button>
          </div>
        </div>
      )}
    </div>
  );
}