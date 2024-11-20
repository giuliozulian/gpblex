'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';
import { getSearchResults } from "@/lib/wordpress";

interface SearchResult {
  id: string;
  title: string;
  uri: string;
  contentType: {
    node: {
      name: string;
    }
  }
}

interface SearchResponse {
  contentNodes: {
    nodes: SearchResult[];
  }
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(query, 300);

  useEffect(() => {
    const performSearch = async () => {

      if (debouncedSearch.length < 3) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await getSearchResults(debouncedSearch);

        setResults(searchResults || []);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedSearch]);

  return (
      <div className="relative">
        <div className="relative">
          <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca..."
              className="w-full px-4 py-2 border rounded-lg"
              min={3}
          />
          {query.length > 0 && (
              <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
          )}
        </div>

        {isLoading && (
            <div className="absolute top-full left-0 right-0 bg-neutral-600 shadow-lg rounded-lg mt-2 p-4 z-50">
              Caricamento...
            </div>
        )}

        {!isLoading && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-neutral-600 shadow-lg rounded-lg mt-2 z-50">
              <div className="max-h-96 overflow-y-auto">
                {results.map((result) => (
                    <Link
                        key={result.id}
                        href={result.uri}
                        className="block p-4 border-b last:border-b-0 hover:bg-neutral-700 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="font-medium">{result.title}</h3>
                          <span className="text-xs text-gray-400 mt-1">
                            {result.contentType.node.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                ))}
              </div>
            </div>
        )}

        {!isLoading && query.length >= 3 && results.length === 0 && (
            <div className="absolute top-full left-0 right-0 bg-neutral-600 shadow-lg rounded-lg mt-2 p-4 z-50">
              Nessun risultato trovato
            </div>
        )}
      </div>
  );
}
