import { Node, Edge } from "reactflow";

export interface ParsedNodeData {
  type: "object" | "array" | "primitive";
  value: unknown;
  path: string;
}

// Sample JSON for placeholder
export const SAMPLE_JSON = {
  user: {
    name: "John Doe",
    age: 30,
    address: {
      street: "123 Main St",
      city: "New York",
      country: "USA",
    },
    hobbies: ["reading", "coding", "traveling"],
    active: true,
  },
  items: [
    {
      id: 1,
      name: "Product A",
      tags: ["electronics", "smart"],
    },
    {
      id: 2,
      name: "Product B",
      tags: ["clothing", "summer"],
    },
  ],
  metadata: {
    version: "1.0.0",
    timestamp: "2024-01-01T00:00:00Z",
    count: 5,
  },
};

export function validateJson(jsonString: string): {
  valid: boolean;
  error?: string;
  data?: unknown;
} {
  try {
    const parsed = JSON.parse(jsonString);
    return { valid: true, data: parsed };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Invalid JSON",
    };
  }
}

interface TreeNodeInfo {
  node: Node;
  children: string[];
  subtreeWidth: number;
}

export function parseJsonToTree(
  data: unknown,
  parentPath = "root"
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const nodeInfo = new Map<string, TreeNodeInfo>();
  const VERTICAL_SPACING = 150; // Vertical space between levels
  const HORIZONTAL_SPACING = 70; // Horizontal space between siblings
  const NODE_WIDTH = 100; // Width of each node for spacing calculations

  const createNode = (
    id: string,
    label: string,
    type: "object" | "array" | "primitive",
    value: unknown,
    path: string,
    position: { x: number; y: number }
  ): Node => ({
    id,
    type: "custom",
    position,
    data: {
      label,
      type,
      value,
      path,
    },
  });

  // First pass: create all nodes and edges
  const traverse = (obj: unknown, path: string, level: number): void => {
    let nodeLabel = "";
    let nodeType: "object" | "array" | "primitive" = "primitive";
    let nodeValue = obj;
    const children: string[] = [];

    // Determine node type and label
    if (Array.isArray(obj)) {
      nodeType = "array";
      nodeLabel = `Array [${obj.length}]`;
      nodeValue = undefined;
    } else if (obj !== null && typeof obj === "object") {
      nodeType = "object";
      const pathParts = path.includes(".") ? path.split(".") : path.split("[");
      const lastPart = pathParts[pathParts.length - 1];
      nodeLabel = lastPart?.replace("]", "") || "root";
      nodeValue = undefined;
    } else {
      nodeType = "primitive";
      const pathParts = path.split(/[\.\[\]]/).filter(Boolean);
      nodeLabel = pathParts[pathParts.length - 1] || path;
      nodeValue = obj;
    }

    const y = level * VERTICAL_SPACING;
    const tempNode = createNode(path, nodeLabel, nodeType, nodeValue, path, {
      x: 0,
      y,
    });
    nodes.push(tempNode);

    // Traverse children
    if (nodeType === "object" && typeof obj === "object" && obj !== null) {
      if (Array.isArray(obj)) {
        obj.forEach((item, idx) => {
          const childPath = `${path}[${idx}]`;
          children.push(childPath);
          traverse(item, childPath, level + 1);
          edges.push({
            id: `e-${path}-${childPath}`,
            source: path,
            target: childPath,
          });
        });
      } else {
        const recordObj = obj as Record<string, unknown>;
        Object.keys(recordObj).forEach((key) => {
          const childPath = `${path}.${key}`;
          children.push(childPath);
          traverse(recordObj[key], childPath, level + 1);
          edges.push({
            id: `e-${path}-${childPath}`,
            source: path,
            target: childPath,
          });
        });
      }
    }

    nodeInfo.set(path, { node: tempNode, children, subtreeWidth: 0 });
  };

  // Create the tree structure (first pass)
  traverse(data, parentPath, 0);

  // Second pass: calculate subtree widths
  const calculateWidths = (path: string) => {
    const info = nodeInfo.get(path);
    if (!info) return;
    if (info.children.length === 0) {
      info.subtreeWidth = NODE_WIDTH;
    } else {
      let totalWidth = 0;
      info.children.forEach((childPath) => {
        calculateWidths(childPath);
        totalWidth += nodeInfo.get(childPath)?.subtreeWidth || NODE_WIDTH;
      });
      const spacing = (info.children.length - 1) * HORIZONTAL_SPACING;
      info.subtreeWidth = Math.max(NODE_WIDTH, totalWidth + spacing);
    }
  };

  calculateWidths(parentPath);

  // Third pass: position nodes hierarchically (top-down)
  const positionNodesRecursive = (path: string, parentX: number): number => {
    const info = nodeInfo.get(path);
    if (!info) return NODE_WIDTH;

    if (info.children.length === 0) {
      // Leaf node
      const node = nodes.find((n) => n.id === path);
      if (node) {
        node.position.x = parentX;
      }
      return NODE_WIDTH;
    } else {
      // Calculate positions for all children first
      const childrenWidths: number[] = [];
      info.children.forEach((childPath) => {
        childrenWidths.push(calculateSubtreeWidth(childPath));
      });

      const totalChildrenWidth = childrenWidths.reduce((sum, w) => sum + w, 0);
      const spacing = (info.children.length - 1) * HORIZONTAL_SPACING;
      const totalWidth = totalChildrenWidth + spacing;

      // Position current node at center of its subtree
      const node = nodes.find((n) => n.id === path);
      if (node) {
        node.position.x = parentX;
      }

      // Position children equally distributed around parent
      let currentX = parentX - totalWidth / 2;
      info.children.forEach((childPath, index) => {
        const childWidth = childrenWidths[index];
        const childCenterX = currentX + childWidth / 2;
        positionNodesRecursive(childPath, childCenterX);
        currentX += childWidth + HORIZONTAL_SPACING;
      });

      return Math.max(NODE_WIDTH, totalWidth);
    }
  };

  const calculateSubtreeWidth = (path: string): number => {
    const info = nodeInfo.get(path);
    if (!info || info.children.length === 0) {
      return NODE_WIDTH;
    }

    let totalWidth = 0;
    info.children.forEach((childPath) => {
      totalWidth += calculateSubtreeWidth(childPath);
    });
    const spacing = (info.children.length - 1) * HORIZONTAL_SPACING;
    return Math.max(NODE_WIDTH, totalWidth + spacing);
  };

  // Position all nodes starting from root
  const rootInfo = nodeInfo.get(parentPath);
  if (rootInfo && rootInfo.children.length > 0) {
    positionNodesRecursive(parentPath, 0);
  } else {
    const rootNode = nodes.find((n) => n.id === parentPath);
    if (rootNode) {
      rootNode.position.x = 0;
    }
  }

  return { nodes, edges };
}

export function findNodeByPath(path: string, nodes: Node[]): Node | undefined {
  return nodes.find((node) => node.data.path === path);
}

export function getAllPaths(obj: unknown, prefix = ""): string[] {
  const paths: string[] = [];

  if (obj === null || typeof obj !== "object") {
    return [prefix];
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      paths.push(...getAllPaths(item, `${prefix}[${index}]`));
    });
  } else {
    const recordObj = obj as Record<string, unknown>;
    Object.keys(recordObj).forEach((key) => {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      paths.push(...getAllPaths(recordObj[key], currentPath));
    });
  }

  return paths;
}
