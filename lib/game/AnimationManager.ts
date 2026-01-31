type AnimationType = 'fadeIn' | 'fadeOut' | 'slideIn' | 'slideOut' | 'pulse' | 'shake';
type EasingFunction = 'linear' | 'easeInOut' | 'easeIn' | 'easeOut';

export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: EasingFunction;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate';
}

export class AnimationManager {
  private animations: Map<string, AnimationConfig> = new Map();
  private activeAnimations: Map<string, boolean> = new Map();

  constructor() {
    this.initializeDefaultAnimations();
  }

  private initializeDefaultAnimations() {
    this.animations.set('fadeIn', {
      duration: 300,
      easing: 'easeOut'
    });

    this.animations.set('fadeOut', {
      duration: 300,
      easing: 'easeIn'
    });

    this.animations.set('slideIn', {
      duration: 400,
      easing: 'easeOut'
    });

    this.animations.set('slideOut', {
      duration: 400,
      easing: 'easeIn'
    });

    this.animations.set('pulse', {
      duration: 1000,
      iterations: Infinity,
      easing: 'easeInOut',
      direction: 'alternate'
    });

    this.animations.set('shake', {
      duration: 500,
      iterations: 3,
      easing: 'easeInOut'
    });
  }

  getAnimationStyle(type: AnimationType, customConfig?: Partial<AnimationConfig>): React.CSSProperties {
    const baseConfig = this.animations.get(type) || { duration: 300 };
    const config = { ...baseConfig, ...customConfig };

    const keyframes = this.getKeyframes(type);
    const animationName = `custom-${type}`;

    return {
      animation: `${animationName} ${config.duration}ms ${config.easing || 'ease'} ${config.delay || 0}ms ${config.iterations || 1} ${config.direction || 'normal'}`,
      animationFillMode: 'both'
    };
  }

  private getKeyframes(type: AnimationType): string {
    const styleSheet = document.styleSheets[0];
    const animationName = `custom-${type}`;

    // Check if keyframes already exist
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      const rule = styleSheet.cssRules[i];
      if (rule instanceof CSSKeyframesRule && rule.name === animationName) {
        return animationName;
      }
    }

    // Create keyframes
    let keyframes = '';
    
    switch (type) {
      case 'fadeIn':
        keyframes = `
          @keyframes ${animationName} {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `;
        break;
        
      case 'fadeOut':
        keyframes = `
          @keyframes ${animationName} {
            from { opacity: 1; }
            to { opacity: 0; }
          }
        `;
        break;
        
      case 'pulse':
        keyframes = `
          @keyframes ${animationName} {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `;
        break;
        
      case 'shake':
        keyframes = `
          @keyframes ${animationName} {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
        `;
        break;
    }

    if (keyframes) {
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }

    return animationName;
  }

  addCustomAnimation(name: string, config: AnimationConfig) {
    this.animations.set(name, config);
  }

  removeAnimation(name: string) {
    this.animations.delete(name);
  }

  startAnimation(elementId: string, animationType: AnimationType) {
    this.activeAnimations.set(elementId, true);
    // Logic to start animation on DOM element
  }

  stopAnimation(elementId: string) {
    this.activeAnimations.delete(elementId);
    // Logic to stop animation on DOM element
  }

  isAnimating(elementId: string): boolean {
    return this.activeAnimations.get(elementId) || false;
  }
}

// Singleton instance
export const animationManager = new AnimationManager();