export type GameScreen = 'observation' | 'library' | 'musicPlayer';
export type GameState = 'menu' | 'playing' | 'paused' | 'gameOver';

export interface SearchResult {
  id: string;
  query: string;
  title: string;
  content: string;
  image?: string;
  unlockables?: string[];
}

export interface MaskAngle {
  id: string;
  image: string;
  zoomableAreas: ZoomableArea[];
  visibleDetails?: string[];
}

export interface ZoomableArea {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  detailImage: string;
  clue: string;
}

export interface UIElement {
  id: string;
  type: 'button' | 'image' | 'text' | 'modal';
  x: number;
  y: number;
  width: number;
  height: number;
  image?: string;
  text?: string;
  onClick?: () => void;
  visible: boolean;
  clickable: boolean;
  animation?: {
    type: 'pulse' | 'shake' | 'fade';
    active: boolean;
    duration: number;
  };
}