'use client';

import { useCallback, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    Node,
    Edge,
    Connection,
    addEdge,
    useReactFlow,
    NodeTypes,
    ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import { useTreeVisualizer, useSearchMatch } from '@/hooks/useTreeVisualizer';
import { useImageExport } from '@/hooks/useImageExport';
import { getNodeColor } from '@/utils/treeHelpers';

export interface TreeVisualizerRef {
    exportImage: () => Promise<void>;
}

interface TreeVisualizerProps {
    nodes: Node[];
    edges: Edge[];
    onNodeClick?: (nodeId: string) => void;
    selectedNodeId?: string | null;
    searchMatches?: string[];
}

const nodeTypes: NodeTypes = {
    custom: CustomNode,
};

const TreeVisualizerInner = forwardRef<TreeVisualizerRef, TreeVisualizerProps>(({
    nodes,
    edges,
    onNodeClick,
    selectedNodeId,
    searchMatches = []
}, ref) => {
    const { fitView } = useReactFlow();
    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    const { flowNodes, flowEdges, onNodesChange, onEdgesChange, setFlowNodes, setFlowEdges } = useTreeVisualizer({
        nodes,
        edges,
        selectedNodeId,
        searchMatches,
    });

    const { exportImage } = useImageExport(reactFlowWrapper);

    const prevNodesLengthRef = useRef(0);
    const prevNodesIdsRef = useRef<string>('');

    useEffect(() => {
        const currentIds = flowNodes.map(n => n.id).join(',');
        const isNewData = prevNodesIdsRef.current !== currentIds && prevNodesIdsRef.current !== '';
        const isInitialLoad = flowNodes.length > 0 && prevNodesLengthRef.current === 0;

        if (isInitialLoad || isNewData) {
            setTimeout(() => {
                fitView({ padding: 0.3, duration: 500 });
            }, 100);
        }

        prevNodesLengthRef.current = flowNodes.length;
        prevNodesIdsRef.current = currentIds;
    }, [flowNodes, fitView]);

    useSearchMatch(searchMatches, setFlowNodes, fitView);

    const onConnect = useCallback(
        (params: Connection) => setFlowEdges((eds: Edge[]) => addEdge(params, eds)),
        [setFlowEdges]
    );

    const handleNodeClick = useCallback(
        (event: React.MouseEvent, node: Node) => {
            event.stopPropagation();
            onNodeClick?.(node.id);
        },
        [onNodeClick]
    );

    useImperativeHandle(ref, () => ({
        exportImage,
    }), [exportImage]);

    return (
        <div ref={reactFlowWrapper} className="w-full h-full bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <ReactFlow
                nodes={flowNodes}
                edges={flowEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={handleNodeClick}
                nodeTypes={nodeTypes}
                className="bg-transparent"
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                }}
                proOptions={{ hideAttribution: true }}
                panOnDrag={[1, 2]}
                selectionOnDrag={true}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={true}
            >
                <Background
                    color="#e0e7ff"
                    gap={16}
                    size={1}
                />
                <Controls
                    showZoom={true}
                    showFitView={true}
                    showInteractive={false}
                />
                <MiniMap
                    nodeColor={(node) => getNodeColor(node)}
                    maskColor="rgba(0, 0, 0, 0.1)"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                />
            </ReactFlow>
        </div>
    );
});

TreeVisualizerInner.displayName = 'TreeVisualizerInner';

export const TreeVisualizer = forwardRef<TreeVisualizerRef, TreeVisualizerProps>((props, ref) => {
    return (
        <ReactFlowProvider>
            <TreeVisualizerInner {...props} ref={ref} />
        </ReactFlowProvider>
    );
});

TreeVisualizer.displayName = 'TreeVisualizer';

