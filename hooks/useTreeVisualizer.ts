"use client";

/**
 * useTreeVisualizer Hook
 *
 * Manages ReactFlow node and edge state, handles updates, initialization,
 * and selection changes. Keeps positions preserved when possible.
 */

import { useCallback, useEffect, useRef } from "react";
import {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  OnNodesChange,
  OnEdgesChange,
} from "reactflow";

interface UseTreeVisualizerOptions {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId?: string | null;
  searchMatches?: string[];
}

interface UseTreeVisualizerReturn {
  flowNodes: Node[];
  flowEdges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  setFlowNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
  setFlowEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
}

/**
 * Hook to manage ReactFlow node and edge state
 * Handles node updates, edge updates, and selection changes
 * @param nodes - Array of ReactFlow nodes
 * @param edges - Array of ReactFlow edges
 * @param selectedNodeId - ID of currently selected node
 */
export function useTreeVisualizer({
  nodes,
  edges,
  selectedNodeId,
}: UseTreeVisualizerOptions): UseTreeVisualizerReturn {
  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(nodes);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(edges);

  const hasInitialized = useRef(false);
  const prevNodesLength = useRef(nodes.length);
  const prevNodesRef = useRef<string>("");

  const hasNodesChanged = useCallback(
    (prevNodes: Node[]) => {
      return (
        prevNodes.length !== nodes.length ||
        nodes.some((node) => !prevNodes.find((pn) => pn.id === node.id))
      );
    },
    [nodes]
  );

  const hasSelectionChanged = useCallback(
    (prevNodes: Node[]) => {
      return prevNodes.some((node) => {
        const isSelected = node.id === selectedNodeId;
        return node.selected !== isSelected;
      });
    },
    [selectedNodeId]
  );

  const updateNodes = useCallback(
    (prevNodes: Node[]) => {
      if (hasNodesChanged(prevNodes)) {
        hasInitialized.current = false;
        prevNodesLength.current = nodes.length;
        return nodes.map((node) => {
          const existingNode = prevNodes.find((n) => n.id === node.id);
          return {
            ...node,
            position: existingNode?.position || node.position,
            selected: node.id === selectedNodeId,
          };
        });
      } else {
        if (!hasSelectionChanged(prevNodes)) {
          return prevNodes;
        }
        return prevNodes.map((node) => ({
          ...node,
          selected: node.id === selectedNodeId,
        }));
      }
    },
    [nodes, selectedNodeId, hasNodesChanged, hasSelectionChanged]
  );

  const prevEdgesRef = useRef<string>("");

  useEffect(() => {
    const edgesKey =
      edges.length === 0
        ? ""
        : edges.map((e) => `${e.id}-${e.source}-${e.target}`).join(",");

    // Only update if edges actually changed
    if (edgesKey !== prevEdgesRef.current) {
      prevEdgesRef.current = edgesKey;
      if (edges.length === 0) {
        // Clear edges
        setFlowEdges([]);
      } else {
        // Update edges
        const updatedEdges = edges.map((edge) => ({
          ...edge,
          type: "smoothstep",
          animated: true,
        }));
        setFlowEdges(updatedEdges);
      }
    }
  }, [edges, setFlowEdges]);

  useEffect(() => {
    const nodesKey = nodes.length === 0 ? "" : nodes.map((n) => n.id).join(",");
    if (nodesKey !== prevNodesRef.current) {
      prevNodesRef.current = nodesKey;
      // If nodes are cleared, set empty array directly to avoid calling updateNodes with empty array
      if (nodes.length === 0) {
        setFlowNodes([]);
      } else {
        setFlowNodes(updateNodes);
      }
    }
  }, [nodes, setFlowNodes, updateNodes]);

  return {
    flowNodes,
    flowEdges,
    onNodesChange,
    onEdgesChange,
    setFlowNodes,
    setFlowEdges,
  };
}

/**
 * Hook to handle search match highlighting and auto-pan to matched nodes
 * @param searchMatches - Array of node IDs that match the search query
 * @param setFlowNodes - Function to update ReactFlow nodes state
 * @param fitView - ReactFlow function to fit view to nodes
 */
export function useSearchMatch(
  searchMatches: string[],
  setFlowNodes: (updater: (nodes: Node[]) => Node[]) => void,
  fitView: (options: {
    nodes: { id: string }[];
    padding: number;
    duration: number;
    minZoom: number;
    maxZoom: number;
  }) => void
) {
  const prevFirstMatch = useRef<string | null>(null);
  const firstMatch = searchMatches.length > 0 ? searchMatches[0] : null;

  useEffect(() => {
    if (firstMatch && prevFirstMatch.current !== firstMatch) {
      prevFirstMatch.current = firstMatch;

      setFlowNodes((prevNodes: Node[]) => {
        if (!prevNodes.find((n) => n.id === firstMatch)) return prevNodes;
        return prevNodes.map((node) => ({
          ...node,
          selected: node.id === firstMatch,
        }));
      });

      setTimeout(() => {
        fitView({
          nodes: [{ id: firstMatch }],
          padding: 0.5,
          duration: 800,
          minZoom: 0.5,
          maxZoom: 2,
        });
      }, 100);
    }
  }, [firstMatch, setFlowNodes, fitView]);
}
