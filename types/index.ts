export interface TreeNode {
  id: string;
  label: string;
  type: "object" | "array" | "primitive";
  value?: unknown;
  path: string;
  children?: string[];
}

export interface TreeNodeData {
  nodeType: "object" | "array" | "primitive";
  value?: unknown;
  path: string;
}

export interface JsonTreeState {
  nodes: TreeNode[];
  selectedNode: string | null;
  searchResults: string[];
  currentSearch: string;
}
