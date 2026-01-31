export class TextNormalizer {
  static normalize(text: string): string {
    if (!text) return '';
    
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9\s]/g, ' ') // Replace special chars with space
      .replace(/\s+/g, ' ') // Multiple spaces to single space
      .trim();
  }

  static removeArticles(text: string): string {
    const articles = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del'];
    const words = text.split(' ');
    return words
      .filter(word => !articles.includes(word.toLowerCase()))
      .join(' ');
  }

  static getKeywords(text: string): string[] {
    const normalized = this.normalize(text);
    const withoutArticles = this.removeArticles(normalized);
    return [...new Set(withoutArticles.split(' ').filter(word => word.length > 2))];
  }

  static similarity(text1: string, text2: string): number {
    const norm1 = this.normalize(text1);
    const norm2 = this.normalize(text2);
    
    if (norm1 === norm2) return 1;
    if (norm1.length === 0 || norm2.length === 0) return 0;
    
    // Simple similarity based on common words
    const words1 = new Set(norm1.split(' '));
    const words2 = new Set(norm2.split(' '));
    
    const intersection = [...words1].filter(word => words2.has(word)).length;
    const union = words1.size + words2.size - intersection;
    
    return intersection / union;
  }

  static isFuzzyMatch(text1: string, text2: string, threshold: number = 0.7): boolean {
    return this.similarity(text1, text2) >= threshold;
  }
}