import { GameScreen, GameState, UIElement } from '@/types/game';

export class GameStateManager {
  private currentScreen: GameScreen = 'observation';
  private gameState: GameState = 'playing';
  private discoveredClues: Set<string> = new Set();
  private uiElements: Map<string, UIElement> = new Map();
  private currentMaskAngle: number = 0;
  private isMagnifying: boolean = false;

  constructor() {
    this.initializeUI();
  }

  private initializeUI() {
    // Elementos UI iniciales
    this.addUIElement({
      id: 'magnifyingGlass',
      type: 'image',
      x: 300,
      y: 400,
      width: 80,
      height: 80,
      image: '/assets/images/ui/magnifying-glass.png',
      onClick: () => this.toggleMagnifyingGlass(),
      visible: true,
      clickable: true
    });
  }

  changeScreen(screen: GameScreen) {
    this.currentScreen = screen;
    this.updateUIVisibility();
  }

  addClue(clueId: string) {
    this.discoveredClues.add(clueId);
  }

  addUIElement(element: UIElement) {
    this.uiElements.set(element.id, element);
  }

  toggleMagnifyingGlass() {
    this.isMagnifying = !this.isMagnifying;
  }

  getCurrentScreen(): GameScreen {
    return this.currentScreen;
  }

  getGameState(): GameState {
    return this.gameState;
  }

  private updateUIVisibility() {
    // Lógica para mostrar/ocultar elementos según pantalla
  }
}