import { Node } from "reactflow";

export function getNodeColor(node: Node): string {
  if (node.selected) return "#3b82f6";
  if (node.type === "array") return "#22c55e";
  if (node.type === "primitive") return "#f97316";
  return "#6366f1";
}

export interface ViewInitializationOptions {
  fitView: (options: any) => void;
  nodesLength: number;
}

export function useViewInitialization({
  fitView,
  nodesLength,
}: ViewInitializationOptions) {
  const hasInitialized = { current: false };
  const prevNodesLength = { current: nodesLength };

  const initializeView = () => {
    if (!hasInitialized.current || prevNodesLength.current !== nodesLength) {
      hasInitialized.current = true;
      prevNodesLength.current = nodesLength;

      setTimeout(() => {
        fitView({ padding: 0.3, duration: 500 });
      }, 100);
    }
  };

  return { initializeView };
}
