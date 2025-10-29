'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface CustomNodeData {
    label: string;
    type: 'object' | 'array' | 'primitive';
    value?: unknown;
    path: string;
}

// Icon Components
const ObjectIcon = () => (
    <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
    </svg>
);

const ArrayIcon = () => (
    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2A5 5 0 0011 9H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const PrimitiveIcon = () => (
    <svg className="w-3 h-3 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
);

function CustomNode({ data }: NodeProps<CustomNodeData>) {
    const { label, type, value } = data;

    // Get color classes based on node type
    const getNodeColors = (): string => {
        const colorMap: Record<string, string> = {
            object: 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700',
            array: 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700',
            primitive: 'bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-700',
        };
        return colorMap[type] || 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700';
    };

    // Get string representation of value for primitive nodes
    const getValueString = (): string => {
        if (value === null) return 'null';
        if (typeof value === 'string') return `"${value}"`;
        if (typeof value === 'boolean') return value ? 'true' : 'false';
        return String(value);
    };

    // Render appropriate icon based on type
    const renderTypeIcon = () => {
        const iconMap: Record<string, React.ReactNode> = {
            object: <ObjectIcon />,
            array: <ArrayIcon />,
            primitive: <PrimitiveIcon />,
        };
        return iconMap[type] || null;
    };

    // Render value display for primitive nodes
    const renderValue = () => {
        if (type !== 'primitive' || value === undefined) return null;

        return (
            <div className="text-[10px] px-2 py-0.5 bg-white/50 dark:bg-black/20 rounded-md text-gray-700 dark:text-gray-300 mt-1 inline-block">
                {getValueString()}
            </div>
        );
    };

    const nodeClasses = `
        px-3 py-2 shadow-lg rounded-xl border-2 ${getNodeColors()} 
        min-w-[120px] max-w-[200px] 
        transition-all duration-200 hover:shadow-xl hover:scale-105
    `.trim();

    return (
        <div className={nodeClasses}>
            <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-blue-500" />

            <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                    {renderTypeIcon()}
                    <div className="font-bold text-xs break-words text-gray-800 dark:text-gray-200">
                        {label}
                    </div>
                </div>
                {renderValue()}
            </div>

            <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-blue-500" />
        </div>
    );
}

export default memo(CustomNode);

