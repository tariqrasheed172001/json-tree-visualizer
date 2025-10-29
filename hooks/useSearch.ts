"use client";

import { useState, useCallback, useMemo } from "react";
import { Node } from "reactflow";

interface UseSearchReturn {
  searchQuery: string;
  searchResults: string[];
  matchedNodeIds: string[];
  setSearchQuery: (query: string) => void;
  performSearch: (query: string) => void;
  clearSearch: () => void;
}

export function useSearch(nodes: Node[]): UseSearchReturn {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const matchedNodeIds = useMemo(() => {
    if (!searchQuery) return [];

    return nodes
      .filter((node) => {
        const path = node.data?.path || "";
        return path.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .map((node) => node.id);
  }, [nodes, searchQuery]);

  const performSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);

      const results = nodes
        .filter((node) => {
          const path = node.data?.path || "";
          return path.toLowerCase().includes(query.toLowerCase());
        })
        .map((node) => node.data?.path || "");

      setSearchResults(results);
    },
    [nodes]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  return {
    searchQuery,
    searchResults,
    matchedNodeIds,
    setSearchQuery,
    performSearch,
    clearSearch,
  };
}
