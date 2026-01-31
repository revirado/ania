import { GameScreen } from '@/types/game';

export class CameraManager {
  private currentScreen: GameScreen = 'observation';
  private transitionDuration: number = 800;
  private isTransitioning: boolean = false;
  
  private subscribers: ((screen: GameScreen) => void)[] = [];

  subscribe(callback: (screen: GameScreen) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  async changeScreen(screen: GameScreen): Promise<void> {
    if (this.isTransitioning || this.currentScreen === screen) {
      return;
    }

    this.isTransitioning = true;
    
    // Notificar inicio de transición
    this.notifySubscribers(screen);
    
    // Esperar la duración de la transición
    await new Promise(resolve => setTimeout(resolve, this.transitionDuration));
    
    this.currentScreen = screen;
    this.isTransitioning = false;
  }

  getCurrentScreen(): GameScreen {
    return this.currentScreen;
  }

  getTransitionDuration(): number {
    return this.transitionDuration;
  }

  isInTransition(): boolean {
    return this.isTransitioning;
  }

  private notifySubscribers(screen: GameScreen) {
    this.subscribers.forEach(callback => callback(screen));
  }
}

// Singleton instance
export const cameraManager = new CameraManager();