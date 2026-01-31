'use client';

import { useState } from 'react';
import { ZoomableArea } from '@/types/game';
import styles from './MagnifyingGlass.module.css';

interface MagnifyingGlassProps {
  isActive: boolean;
  zoomArea?: ZoomableArea;
  onClose: () => void;
  backgroundImage: string;
}

export default function MagnifyingGlass({
  isActive,
  zoomArea,
  onClose,
  backgroundImage
}: MagnifyingGlassProps) {
  const [zoomLevel, setZoomLevel] = useState(2);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (!isActive) return null;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

  return (
    <div className={styles.magnifyingOverlay}>
      <div className={styles.magnifyingHeader}>
        <h3>Modo Lupa de Investigación</h3>
        <div className={styles.zoomControls}>
          <button onClick={handleZoomOut}>-</button>
          <span>{zoomLevel.toFixed(1)}x</span>
          <button onClick={handleZoomIn}>+</button>
        </div>
      </div>
      
      <div 
        className={styles.magnifyingViewport}
        onMouseMove={handleMouseMove}
      >
        {/* Vista principal con zoom */}
        <div 
          className={styles.zoomedView}
          style={{
            backgroundImage: `url(${zoomArea?.detailImage || backgroundImage})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: `${zoomLevel * 100}%`,
          }}
        />
        
        {/* Marco de lupa */}
        <div className={styles.glassFrame} />
        
        {/* Información del detalle */}
        {zoomArea && (
          <div className={styles.detailInfo}>
            <h4>Detalle Encontrado</h4>
            <p>{zoomArea.clue}</p>
            <small>Haz clic en otros detalles para inspeccionarlos</small>
          </div>
        )}
      </div>
      
      <div className={styles.magnifyingFooter}>
        <button 
          className={styles.closeButton}
          onClick={onClose}
        >
          Volver a la Mesa de Observación
        </button>
        
        <div className={styles.instructions}>
          <p>Mueve el ratón para explorar • Usa +/- para ajustar el zoom</p>
        </div>
      </div>
    </div>
  );
}