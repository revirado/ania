'use client';

import { useState, useCallback } from 'react';
import { SearchResult } from '@/types/game';
import { SearchEngine } from '@/lib/game/SearchEngine';
import styles from './LibraryUI.module.css';

interface LibraryUIProps {
  onSearch?: (results: SearchResult[]) => void;
  onClose?: () => void;
}

export default function LibraryUI({ onSearch, onClose }: LibraryUIProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const searchEngine = new SearchEngine();

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Simular búsqueda asíncrona
    setTimeout(() => {
      const results = searchEngine.search(searchQuery);
      setSearchResults(results);
      
      if (results.length > 0) {
        setSelectedResult(results[0]);
        
        // Agregar a historial si no existe
        if (!searchHistory.includes(searchQuery.toLowerCase())) {
          setSearchHistory(prev => [searchQuery, ...prev.slice(0, 4)]);
        }
      }
      
      setIsSearching(false);
      
      if (onSearch) {
        onSearch(results);
      }
    }, 500);
  }, [searchQuery, searchHistory, onSearch]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleHistoryClick = (query: string) => {
    setSearchQuery(query);
    // Auto-búsqueda después de un pequeño delay
    setTimeout(() => handleSearch(), 100);
  };

  return (
    <div className={styles.libraryContainer}>
      <div className={styles.libraryHeader}>
        <h2>📚 Biblioteca de Referencia Antropológica</h2>
        <button className={styles.closeLibraryButton} onClick={onClose}>
          Volver a la Mesa
        </button>
      </div>
      
      <div className={styles.libraryContent}>
        {/* Panel de búsqueda */}
        <div className={styles.searchPanel}>
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Buscar en la biblioteca (ej: Salta, tribus, símbolos...)"
              className={styles.searchInput}
            />
            <button 
              className={styles.searchButton}
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
          
          {/* Historial de búsqueda */}
          {searchHistory.length > 0 && (
            <div className={styles.searchHistory}>
              <h4>Búsquedas recientes:</h4>
              <div className={styles.historyTags}>
                {searchHistory.map((query, index) => (
                  <button
                    key={index}
                    className={styles.historyTag}
                    onClick={() => handleHistoryClick(query)}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Resultados de búsqueda */}
        <div className={styles.resultsContainer}>
          <div className={styles.resultsList}>
            <h3>Resultados ({searchResults.length})</h3>
            
            {searchResults.length === 0 && !isSearching && (
              <div className={styles.noResults}>
                <p>No se encontraron resultados. Intenta con otras palabras clave.</p>
                <p className={styles.suggestions}>
                  Sugerencias: "Chiriguano", "máscaras rituales", "Salta", "símbolos"
                </p>
              </div>
            )}
            
            {searchResults.map((result) => (
              <div 
                key={result.id}
                className={`${styles.resultItem} ${selectedResult?.id === result.id ? styles.selected : ''}`}
                onClick={() => setSelectedResult(result)}
              >
                <h4>{result.title}</h4>
                <p className={styles.resultExcerpt}>
                  {result.content.substring(0, 150)}...
                </p>
              </div>
            ))}
          </div>
          
          {/* Detalle del resultado seleccionado */}
          <div className={styles.resultDetail}>
            {selectedResult ? (
              <>
                <h3>{selectedResult.title}</h3>
                
                {selectedResult.image && (
                  <div className={styles.resultImage}>
                    <img src={selectedResult.image} alt={selectedResult.title} />
                  </div>
                )}
                
                <div className={styles.resultContent}>
                  {selectedResult.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                
                {selectedResult.unlockables && selectedResult.unlockables.length > 0 && (
                  <div className={styles.unlockables}>
                    <h4>Nuevos conocimientos desbloqueados:</h4>
                    <ul>
                      {selectedResult.unlockables.map((item, index) => (
                        <li key={index}>🔓 {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.noSelection}>
                <p>Selecciona un resultado para ver los detalles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}