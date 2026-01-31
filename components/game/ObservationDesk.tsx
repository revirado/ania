'use client';

import { useState, useEffect } from 'react';
import { GameStateManager } from '@/lib/game/GameState';
import MaskObject from './MaskObject';
import MagnifyingGlass from './MagnifyingGlass';
import { MaskAngle, ZoomableArea } from '@/types/game';
import maskData from '@/data/maskImages.json';
import styles from './ObservationDesk.module.css';

interface ObservationDeskProps {
  gameState: GameStateManager;
}

export default function ObservationDesk({ gameState }: ObservationDeskProps) {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [selectedZoomArea, setSelectedZoomArea] = useState<ZoomableArea | undefined>();
  const [maskAngles, setMaskAngles] = useState<MaskAngle[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);

  // Cargar datos de la máscara
  useEffect(() => {
    const loadMaskData = () => {
      const angles = maskData.angles.map(angle => ({
        ...angle,
        image: angle.image.startsWith('/') ? angle.image : `/assets/images/mask/${angle.image}`
      }));
      setMaskAngles(angles);
    };
    loadMaskData();
  }, []);

  // Ocultar instrucciones después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleAngleChange = (angle: number) => {
    setCurrentAngle(angle);
    setSelectedZoomArea(undefined); // Reset zoom al cambiar ángulo
  };

  const handleDetailClick = (detailId: string) => {
    if (isMagnifying) {
      const currentMask = maskAngles[currentAngle];
      const area = currentMask.zoomableAreas.find(a => a.id === detailId);
      if (area) {
        setSelectedZoomArea(area);
        
        // Registrar el descubrimiento en el estado del juego
        gameState.addClue(detailId);
        
        console.log(`Detalle descubierto: ${area.clue}`);
      }
    }
  };

  const toggleMagnifyingGlass = () => {
    setIsMagnifying(!isMagnifying);
    if (isMagnifying) {
      setSelectedZoomArea(undefined);
    }
  };

  const handleCloseMagnifying = () => {
    setIsMagnifying(false);
    setSelectedZoomArea(undefined);
  };

  const getBackgroundImage = () => {
    return maskAngles[currentAngle]?.image || '';
  };

  if (maskAngles.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <p>Cargando máscara...</p>
      </div>
    );
  }

  return (
    <div className={styles.observationDesk}>
      {/* Instrucciones iniciales */}
      {showInstructions && (
        <div className={styles.instructionsOverlay}>
          <div className={styles.instructionsContent}>
            <h3>🔍 Bienvenido a tu Mesa de Observación</h3>
            <ul>
              <li>Usa las flechas para rotar la máscara</li>
              <li>Haz clic en la lupa para examinar detalles</li>
              <li>Busca símbolos y marcas en la superficie</li>
              <li>Usa la biblioteca para investigar tus hallazgos</li>
            </ul>
            <button 
              className={styles.closeInstructions}
              onClick={() => setShowInstructions(false)}
            >
              Comenzar Investigación
            </button>
          </div>
        </div>
      )}

      {/* Elementos de la mesa */}
      <div className={styles.deskElements}>
        {/* Máscara */}
        <div className={styles.maskSection}>
          <MaskObject
            angles={maskAngles}
            currentAngle={currentAngle}
            onAngleChange={handleAngleChange}
            onDetailClick={handleDetailClick}
            isMagnifying={isMagnifying}
          />
        </div>

        {/* Lupa interactiva */}
        <button 
          className={styles.magnifyingGlassButton}
          onClick={toggleMagnifyingGlass}
          aria-label="Examinar con lupa"
          title={isMagnifying ? "Volver a vista normal" : "Examinar detalles con lupa"}
        >
          <div className={styles.magnifyingGlassIcon}>
            🔍
          </div>
          <span className={styles.magnifyingGlassLabel}>
            {isMagnifying ? 'Modo Lupa' : 'Usar Lupa'}
          </span>
        </button>

        {/* Libros y papeles en la mesa */}
        <div className={styles.deskItems}>
          <div className={styles.notebook} title="Cuaderno de notas">
            📓
          </div>
          <div className={styles.inkwell} title="Tintero">
            🖋️
          </div>
          <div className={styles.candle} title="Vela">
            🕯️
          </div>
        </div>

        {/* Notas y observaciones */}
        <div className={styles.notesPanel}>
          <h4>📝 Observaciones Actuales</h4>
          <div className={styles.notesContent}>
            {maskAngles[currentAngle]?.visibleDetails?.map((detail, index) => (
              <div key={index} className={styles.noteItem}>
                <span className={styles.noteBullet}>•</span>
                <span className={styles.noteText}>{detail}</span>
              </div>
            ))}
            {(!maskAngles[currentAngle]?.visibleDetails || 
              maskAngles[currentAngle].visibleDetails.length === 0) && (
              <p className={styles.noNotes}>
                No hay observaciones registradas para esta vista.
                <br />
                <small>Usa la lupa para examinar detalles.</small>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal de lupa */}
      <MagnifyingGlass
        isActive={isMagnifying}
        zoomArea={selectedZoomArea}
        onClose={handleCloseMagnifying}
        backgroundImage={getBackgroundImage()}
      />

      {/* Información de la máscara */}
      <div className={styles.maskInfo}>
        <h3>Máscara Ritual Chiriguano-Chané</h3>
        <div className={styles.metadata}>
          <div className={styles.metadataItem}>
            <strong>Cultura:</strong> {maskData.metadata.culture}
          </div>
          <div className={styles.metadataItem}>
            <strong>Período estimado:</strong> {maskData.metadata.estimatedAge}
          </div>
          <div className={styles.metadataItem}>
            <strong>Material:</strong> {maskData.metadata.material}
          </div>
          <div className={styles.metadataItem}>
            <strong>Dimensiones:</strong> {maskData.metadata.dimensions}
          </div>
        </div>
        
        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: '30%' }} // Esto debería calcularse dinámicamente
            />
          </div>
          <div className={styles.progressText}>
            Investigación completada: 30%
          </div>
        </div>
      </div>
    </div>
  );
}