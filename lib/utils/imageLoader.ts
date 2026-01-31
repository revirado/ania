export class ImageLoader {
  private static instance: ImageLoader;
  private loadedImages: Map<string, HTMLImageElement> = new Map();
  private loadingPromises: Map<string, Promise<HTMLImageElement>> = new Map();

  private constructor() {}

  static getInstance(): ImageLoader {
    if (!ImageLoader.instance) {
      ImageLoader.instance = new ImageLoader();
    }
    return ImageLoader.instance;
  }

  loadImage(src: string): Promise<HTMLImageElement> {
    // Check if already loaded
    const cached = this.loadedImages.get(src);
    if (cached) {
      return Promise.resolve(cached);
    }

    // Check if already loading
    const loading = this.loadingPromises.get(src);
    if (loading) {
      return loading;
    }

    // Create new loading promise
    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.loadedImages.set(src, img);
        this.loadingPromises.delete(src);
        resolve(img);
      };
      
      img.onerror = (error) => {
        this.loadingPromises.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });

    this.loadingPromises.set(src, promise);
    return promise;
  }

  preloadImages(imageSources: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(imageSources.map(src => this.loadImage(src)));
  }

  getImage(src: string): HTMLImageElement | undefined {
    return this.loadedImages.get(src);
  }

  clearCache(): void {
    this.loadedImages.clear();
    this.loadingPromises.clear();
  }
}