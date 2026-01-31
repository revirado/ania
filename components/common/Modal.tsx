'use client';

import { ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  size = 'medium'
}: ModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={`${styles.modalContent} ${styles[size]}`}>
        {(title || showCloseButton) && (
          <div className={styles.modalHeader}>
            {title && <h2 className={styles.modalTitle}>{title}</h2>}
            {showCloseButton && (
              <button className={styles.closeButton} onClick={onClose}>
                ✕
              </button>
            )}
          </div>
        )}
        
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
}