import searchData from '@/data/searchResults.json';
import { SearchResult } from '@/types/game';

export class SearchEngine {
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s]/g, '') // Remove special chars
      .trim();
  }

  search(query: string): SearchResult[] {
    const normalizedQuery = this.normalizeText(query);
    const results: SearchResult[] = [];

    searchData.forEach(item => {
      const normalizedTitle = this.normalizeText(item.title);
      const normalizedContent = this.normalizeText(item.content);
      
      if (
        normalizedTitle.includes(normalizedQuery) ||
        normalizedContent.includes(normalizedQuery)
      ) {
        results.push(item);
      }
    });

    return results.slice(0, 5); // Limitar resultados
  }
}