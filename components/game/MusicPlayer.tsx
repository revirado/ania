'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './MusicPlayer.module.css';

interface MusicPlayerProps {
  onClose?: () => void;
}

export default function MusicPlayer({ onClose }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCranking, setIsCranking] = useState(false);
  const [crankProgress, setCrankProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleCrank = () => {
    if (!isCranking) {
      setIsCranking(true);
      
      // Simular dar cuerda
      const interval = setInterval(() => {
        setCrankProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsCranking(false);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        if (crankProgress > 0) {
          audioRef.current.play().catch(console.error);
        } else {
          alert('¡Primero debes dar cuerda al gramófono!');
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleClose = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
    }
    if (onClose) onClose();
  };

  return (
    <div className={styles.musicPlayerContainer}>
      <div className={styles.playerHeader}>
        <h2>🎵 Gramófono Antiguo</h2>
        <button className={styles.closeButton} onClick={handleClose}>
          Volver a la Mesa
        </button>
      </div>
      
      <div className={styles.playerContent}>
        <div className={styles.gramophoneVisual}>
          {/* Imagen del gramófono */}
          <div className={styles.gramophoneImage} />
          
          {/* Manivela interactiva */}
          <div 
            className={`${styles.crank} ${isCranking ? styles.cranking : ''}`}
            onClick={handleCrank}
            title="Dar cuerda al gramófono"
          >
            <div className={styles.crankHandle} />
            <div className={styles.crankBase} />
          </div>
          
          {/* Indicador de cuerda */}
          <div className={styles.windIndicator}>
            <div className={styles.windLabel}>Cuerda:</div>
            <div className={styles.windBar}>
              <div 
                className={styles.windProgress}
                style={{ width: `${crankProgress}%` }}
              />
            </div>
            <div className={styles.windPercentage}>{crankProgress}%</div>
          </div>
        </div>
        
        <div className={styles.playerControls}>
          <button 
            className={`${styles.controlButton} ${isPlaying ? styles.playing : ''}`}
            onClick={handlePlayPause}
            disabled={crankProgress === 0}
          >
            {isPlaying ? '⏸️ Pausar' : '▶️ Reproducir'}
          </button>
          
          <div className={styles.musicInfo}>
            <h3>Música de Fondo para la Investigación</h3>
            <p className={styles.currentTrack}>
              Melodía Etérea - Música para la Reflexión
            </p>
            <p className={styles.instructions}>
              {crankProgress === 0 
                ? 'Da cuerda a la manivela para poder reproducir música'
                : isCranking
                ? 'Dando cuerda...'
                : '¡Listo! Ahora puedes reproducir la música'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Audio oculto */}
      <audio 
        ref={audioRef}
        loop
        src="/assets/sounds/ambient-music.mp3" // Añade tu archivo de audio
        preload="auto"
      />
      
      <div className={styles.playerFooter}>
        <small>
          La música ambiental puede ayudar en la concentración durante tu investigación.
          <br />
          <em>Nota: Este es un prototipo. La música final será añadida posteriormente.</em>
        </small>
      </div>
    </div>
  );
}