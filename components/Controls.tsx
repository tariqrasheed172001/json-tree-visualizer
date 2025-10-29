'use client';

import { Copy, Download, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from './Button';

interface ControlsProps {
    onClear: () => void;
    onCopyPath?: () => void;
    onDownload?: () => void;
    onExportImage?: () => void;
    selectedPath?: string | null;
}

export function Controls({ onClear, onCopyPath, onDownload, onExportImage, selectedPath }: ControlsProps) {
    const handleCopy = () => {
        if (selectedPath) {
            navigator.clipboard.writeText(selectedPath);
        }
        onCopyPath?.();
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex gap-1.5 dark:bg-gray-800 p-1 rounded-lg">
                <Button
                    onClick={onClear}
                    icon={Trash2}
                    variant="gradient"
                    gradientFrom="from-red-600"
                    gradientTo="to-rose-600"
                    gradientHoverFrom="hover:from-red-700"
                    gradientHoverTo="hover:to-rose-700"
                    title="Clear All"
                    className="shadow-none rounded-md"
                >
                    Clear
                </Button>

                {selectedPath && (
                    <Button
                        onClick={handleCopy}
                        icon={Copy}
                        variant="gradient"
                        gradientFrom="from-blue-600"
                        gradientTo="to-cyan-600"
                        gradientHoverFrom="hover:from-blue-700"
                        gradientHoverTo="hover:to-cyan-700"
                        title={`Copy path: ${selectedPath}`}
                        className="rounded-md"
                    >
                        Copy
                    </Button>
                )}

                {onDownload && (
                    <Button
                        onClick={onDownload}
                        icon={Download}
                        variant="gradient"
                        gradientFrom="from-indigo-600"
                        gradientTo="to-violet-600"
                        gradientHoverFrom="hover:from-indigo-700"
                        gradientHoverTo="hover:to-violet-700"
                        title="Download JSON"
                        className="rounded-md"
                    >
                        JSON
                    </Button>
                )}
            </div>

            {onExportImage && (
                <Button
                    onClick={onExportImage}
                    icon={ImageIcon}
                    variant="gradient"
                    gradientFrom="from-emerald-600"
                    gradientTo="to-teal-600"
                    gradientHoverFrom="hover:from-emerald-700"
                    gradientHoverTo="hover:to-teal-700"
                    title="Export as Image"
                >
                    Image
                </Button>
            )}
        </div>
    );
}

