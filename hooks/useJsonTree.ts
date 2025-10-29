"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Node, Edge, useNodesState, useEdgesState } from "reactflow";
import { validateJson, parseJsonToTree, SAMPLE_JSON } from "@/utils/jsonParser";

interface UseJsonTreeReturn {
  jsonInput: string;
  nodes: Node[];
  edges: Edge[];
  error: string | null;
  isLoading: boolean;
  isTyping: boolean;
  setJsonInput: (value: string) => void;
  visualizeJson: () => void;
  clearTree: () => void;
  loadSampleJson: () => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
}

export function useJsonTree(): UseJsonTreeReturn {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const visualizeJson = useCallback(() => {
    setIsLoading(true);
    setError(null);

    // Clear existing tree first to prevent conflicts
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);

    // Small delay to ensure cleanup completes before new tree generation
    setTimeout(() => {
      try {
        const validation = validateJson(jsonInput);

        if (!validation.valid) {
          setError(validation.error || "Invalid JSON");
          setIsLoading(false);
          return;
        }

        const { nodes: parsedNodes, edges: parsedEdges } = parseJsonToTree(
          validation.data,
          "root"
        );

        setNodes(parsedNodes);
        setEdges(parsedEdges);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }, 50);
  }, [jsonInput, setNodes, setEdges]);

  const clearTree = useCallback(() => {
    // Clear any ongoing typing
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    setIsTyping(false);

    setNodes([]);
    setEdges([]);
    setJsonInput("");
    setError(null);
    setSelectedNodeId(null);
  }, [setNodes, setEdges]);

  const loadSampleJson = useCallback(() => {
    // Clear any existing typing
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    const sampleJsonString = JSON.stringify(SAMPLE_JSON, null, 2);
    setError(null);
    setJsonInput("");
    setIsTyping(true);

    let currentIndex = 0;
    const typingSpeed = 8; // milliseconds per character
    const pauseOnNewline = 15; // extra pause on newlines
    const pauseOnSpecialChars = 20; // extra pause on special characters like brackets

    const typeCharacter = () => {
      if (currentIndex < sampleJsonString.length) {
        const char = sampleJsonString[currentIndex];
        const nextChar = sampleJsonString[currentIndex + 1];

        // Calculate delay based on character type
        let delay = typingSpeed;
        if (char === "\n" || (char === "\r" && nextChar === "\n")) {
          delay = typingSpeed + pauseOnNewline;
        } else if (["{", "}", "[", "]", ":", ","].includes(char)) {
          delay = typingSpeed + pauseOnSpecialChars;
        }

        setJsonInput((prev) => prev + char);
        currentIndex++;

        typingTimeoutRef.current = setTimeout(typeCharacter, delay);
      } else {
        setIsTyping(false);
        typingTimeoutRef.current = null;
      }
    };

    // Start typing after a small delay
    typingTimeoutRef.current = setTimeout(typeCharacter, 100);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return {
    jsonInput,
    nodes,
    edges,
    error,
    isLoading,
    isTyping,
    setJsonInput,
    visualizeJson,
    clearTree,
    loadSampleJson,
    selectedNodeId,
    setSelectedNodeId,
  };
}
