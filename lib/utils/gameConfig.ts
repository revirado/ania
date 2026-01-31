export interface GameConfig {
  // Camera settings
  camera: {
    transitionDuration: number;
    screens: {
      observation: { x: 0, y: 0 };
      library: { x: -100, y: 0 };
      musicPlayer: { x: 100, y: 0 };
    };
  };
  
  // Mask settings
  mask: {
    angles: number;
    rotationSpeed: number;
    zoomLevels: number[];
  };
  
  // Library settings
  library: {
    searchDelay: number;
    maxResults: number;
    historySize: number;
  };
  
  // UI settings
  ui: {
    tooltipDelay: number;
    animationDuration: number;
    hintDisplayTime: number;
  };
  
  // Gameplay settings
  gameplay: {
    maxClues: number;
    requiredCluesToProgress: number;
    timeLimit: number | null; // null for no time limit
  };
}

export const defaultConfig: GameConfig = {
  camera: {
    transitionDuration: 800,
    screens: {
      observation: { x: 0, y: 0 },
      library: { x: -100, y: 0 },
      musicPlayer: { x: 100, y: 0 }
    }
  },
  
  mask: {
    angles: 8,
    rotationSpeed: 300,
    zoomLevels: [1, 1.5, 2, 3, 4]
  },
  
  library: {
    searchDelay: 500,
    maxResults: 5,
    historySize: 5
  },
  
  ui: {
    tooltipDelay: 300,
    animationDuration: 300,
    hintDisplayTime: 5000
  },
  
  gameplay: {
    maxClues: 20,
    requiredCluesToProgress: 10,
    timeLimit: null
  }
};

export class ConfigManager {
  private config: GameConfig;
  
  constructor(initialConfig?: Partial<GameConfig>) {
    this.config = { ...defaultConfig, ...initialConfig };
  }
  
  get<K extends keyof GameConfig>(key: K): GameConfig[K] {
    return this.config[key];
  }
  
  set<K extends keyof GameConfig>(key: K, value: GameConfig[K]): void {
    this.config[key] = value;
  }
  
  update(updates: Partial<GameConfig>): void {
    this.config = { ...this.config, ...updates };
  }
  
  reset(): void {
    this.config = { ...defaultConfig };
  }
  
  getAll(): GameConfig {
    return { ...this.config };
  }
}

// Singleton instance
export const configManager = new ConfigManager();