"use client";

import { useState, useCallback } from "react";
import { Node, Edge, useNodesState, useEdgesState } from "reactflow";
import { validateJson, parseJsonToTree, SAMPLE_JSON } from "@/utils/jsonParser";

interface UseJsonTreeReturn {
  jsonInput: string;
  nodes: Node[];
  edges: Edge[];
  error: string | null;
  isLoading: boolean;
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
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const visualizeJson = useCallback(() => {
    setIsLoading(true);
    setError(null);

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
  }, [jsonInput, setNodes, setEdges]);

  const clearTree = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setJsonInput("");
    setError(null);
    setSelectedNodeId(null);
  }, [setNodes, setEdges]);

  const loadSampleJson = useCallback(() => {
    const sampleJsonString = JSON.stringify(SAMPLE_JSON, null, 2);
    setJsonInput(sampleJsonString);
  }, []);

  return {
    jsonInput,
    nodes,
    edges,
    error,
    isLoading,
    setJsonInput,
    visualizeJson,
    clearTree,
    loadSampleJson,
    selectedNodeId,
    setSelectedNodeId,
  };
}
