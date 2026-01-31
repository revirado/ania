'use client';

import { useState, useEffect } from 'react';
import { MaskAngle } from '@/types/game';
import styles from './MaskObject.module.css';

interface MaskObjectProps {
  angles: MaskAngle[];
  currentAngle: number;
  onAngleChange: (angle: number) => void;
  onDetailClick?: (detailId: string) => void;
  isMagnifying: boolean;
}

export default function MaskObject({
  angles,
  currentAngle,
  onAngleChange,
  onDetailClick,
  isMagnifying
}: MaskObjectProps) {
  const [isRotating, setIsRotating] = useState(false);
  const [showRotationControls, setShowRotationControls] = useState(true);

  const handlePreviousAngle = () => {
    if (!isRotating) {
      setIsRotating(true);
      const newAngle = currentAngle === 0 ? angles.length - 1 : currentAngle - 1;
      onAngleChange(newAngle);
      setTimeout(() => setIsRotating(false), 300);
    }
  };

  const handleNextAngle = () => {
    if (!isRotating) {
      setIsRotating(true);
      const newAngle = currentAngle === angles.length - 1 ? 0 : currentAngle + 1;
      onAngleChange(newAngle);
      setTimeout(() => setIsRotating(false), 300);
    }
  };

  const handleMaskClick = (e: React.MouseEvent) => {
    if (isMagnifying && onDetailClick) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Buscar área clickeada
      const currentMask = angles[currentAngle];
      const clickedArea = currentMask.zoomableAreas.find(area => {
        return x >= area.x && x <= area.x + area.width &&
               y >= area.y && y <= area.y + area.height;
      });
      
      if (clickedArea) {
        onDetailClick(clickedArea.id);
      }
    }
  };

  return (
    <div className={styles.maskContainer}>
      <div 
        className={`${styles.maskImageContainer} ${isRotating ? styles.rotating : ''}`}
        onClick={handleMaskClick}
      >
        <img
          src={angles[currentAngle].image}
          alt={`Máscara - Vista ${currentAngle + 1}`}
          className={styles.maskImage}
          style={{
            cursor: isMagnifying ? 'zoom-in' : 'default',
            opacity: isMagnifying ? 0.8 : 1
          }}
        />
        
        {/* Áreas clickeables (solo visibles en modo lupa) */}
        {isMagnifying && angles[currentAngle].zoomableAreas.map(area => (
          <div
            key={area.id}
            className={styles.zoomableArea}
            style={{
              left: `${area.x}px`,
              top: `${area.y}px`,
              width: `${area.width}px`,
              height: `${area.height}px`,
            }}
            title={area.clue}
          />
        ))}
      </div>
      
      {/* Controles de rotación */}
      {showRotationControls && !isMagnifying && (
        <div className={styles.rotationControls}>
          <button 
            className={styles.rotateButton}
            onClick={handlePreviousAngle}
            disabled={isRotating}
            aria-label="Rotar izquierda"
          >
            ←
          </button>
          
          <div className={styles.angleIndicator}>
            Vista {currentAngle + 1} de {angles.length}
          </div>
          
          <button 
            className={styles.rotateButton}
            onClick={handleNextAngle}
            disabled={isRotating}
            aria-label="Rotar derecha"
          >
            →
          </button>
        </div>
      )}
      
      {/* Indicador de detalles descubiertos */}
      <div className={styles.cluesIndicator}>
        {angles[currentAngle].visibleDetails?.map(detail => (
          <span key={detail} className={styles.clueTag}>
            {detail}
          </span>
        ))}
      </div>
    </div>
  );
}