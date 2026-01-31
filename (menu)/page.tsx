'use client';

import { useRouter } from 'next/navigation';
import styles from './MenuPage.module.css';

export default function MenuPage() {
  const router = useRouter();

  const startGame = () => {
    router.push('/game');
  };

  return (
    <div className={styles.menuContainer}>
      <h1 className={styles.title}>ANIA</h1>
      <p className={styles.subtitle}>El Misterio de la Máscara Chiriguano-Chané</p>
      
      <div className={styles.buttonContainer}>
        <button className={styles.menuButton} onClick={startGame}>
          Comenzar Investigación
        </button>
        <button className={styles.menuButton}>
          Continuar Investigación
        </button>
        <button className={styles.menuButton}>
          Biblioteca de Referencia
        </button>
        <button className={styles.menuButton}>
          Créditos
        </button>
        <button className={styles.menuButton}>
          Salir
        </button>
      </div>
      
      <div className={styles.instructions}>
        <p>Desarrollado por [Tu Nombre]</p>
        <p>Un simulador antropológico interactivo</p>
      </div>
    </div>
  );
}