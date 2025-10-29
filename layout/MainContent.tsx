'use client';

import { useCallback, useRef } from 'react';
import { JSONInput } from '@/components/JSONInput';
import { TreeVisualizer, TreeVisualizerRef } from '@/components/TreeVisualizer';
import { SearchBar } from '@/components/SearchBar';
import { Controls } from '@/components/Controls';
import { useJsonTree } from '@/hooks/useJsonTree';
import { useSearch } from '@/hooks/useSearch';

const EmptyState = () => (
    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <p className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Ready to Visualize</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Paste or type your JSON data and click Visualize to create an interactive tree</p>
        </div>
    </div>
);

export default function MainContent() {
    const treeVisualizerRef = useRef<TreeVisualizerRef>(null);
    const {
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
    } = useJsonTree();

    const { searchResults, matchedNodeIds, performSearch, clearSearch } = useSearch(nodes);

    const handleSearch = useCallback((query: string) => {
        performSearch(query);
    }, [performSearch]);

    const handleClearAll = useCallback(() => {
        clearTree();
        clearSearch();
        setSelectedNodeId(null);
    }, [clearTree, clearSearch, setSelectedNodeId]);

    const handleCopyPath = useCallback(() => {
        const selectedNode = nodes.find(n => n.id === selectedNodeId);
        if (selectedNode?.data?.path) {
            navigator.clipboard.writeText(selectedNode.data.path);
        }
    }, [nodes, selectedNodeId]);

    const handleDownload = useCallback(() => {
        const blob = new Blob([jsonInput], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'json-tree-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [jsonInput]);

    const selectedPath =
        nodes.find((n) => n.id === selectedNodeId)?.data?.path || null;

    const handleExportImage = useCallback(() => {
        treeVisualizerRef.current?.exportImage();
    }, []);

    return (
        <div className="flex-1 flex gap-4 p-4 overflow-hidden h-screen">
            <div className="w-1/3 h-[calc(100vh-120px)] flex flex-col bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-5">
                <JSONInput
                    value={jsonInput}
                    onChange={setJsonInput}
                    onVisualize={visualizeJson}
                    onLoadSample={loadSampleJson}
                    error={error}
                    isLoading={isLoading}
                    isTyping={isTyping}
                />
            </div>

            <div className="flex-1 flex flex-col bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/50">
                    <div className="flex items-start gap-3">
                        <div className="flex-1">
                            <SearchBar
                                onSearch={handleSearch}
                                searchResults={searchResults}
                                totalMatches={searchResults.length}
                            />
                        </div>
                        <Controls
                            onClear={handleClearAll}
                            onCopyPath={handleCopyPath}
                            onDownload={handleDownload}
                            onExportImage={handleExportImage}
                            selectedPath={selectedPath}
                        />
                    </div>
                </div>

                <div className="flex-1 relative">
                    {nodes.length > 0 ? (
                        <TreeVisualizer
                            ref={treeVisualizerRef}
                            nodes={nodes}
                            edges={edges}
                            onNodeClick={setSelectedNodeId}
                            selectedNodeId={selectedNodeId}
                            searchMatches={matchedNodeIds}
                        />
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </div>
        </div>
    );
}
