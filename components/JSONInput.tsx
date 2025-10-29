'use client';

/**
 * JSONInput Component
 * 
 * Provides a textarea for JSON input with validation, error display,
 * and action buttons for visualization and loading sample data.
 */

import { ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
import { Button } from './Button';

interface JSONInputProps {
    value: string;
    onChange: (value: string) => void;
    onVisualize: () => void;
    onLoadSample?: () => void;
    error: string | null;
    isLoading: boolean;
}


// Error message component
const ErrorMessage = ({ message }: { message: string }) => (
    <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-l-4 border-red-500 rounded-lg">
        <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
                {message}
            </p>
        </div>
    </div>
);

/**
 * JSON Input component for entering and validating JSON data
 * @param value - Current JSON input value
 * @param onChange - Handler for input changes
 * @param onVisualize - Handler for visualize button click
 * @param onLoadSample - Optional handler for loading sample JSON
 * @param error - Error message to display if validation fails
 * @param isLoading - Loading state for visualization process
 */
export function JSONInput({ value, onChange, onVisualize, onLoadSample, error, isLoading }: JSONInputProps) {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className='flex justify-between'>
                <div className="flex justify-between items-start">
                    <div>
                        <label className="text-lg font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <span>JSON Input</span>
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-0">Paste or type your JSON data</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {onLoadSample && (
                        <Button
                            onClick={onLoadSample}
                            icon={Upload}
                            variant="gradient"
                            gradientFrom="from-purple-600"
                            gradientTo="to-pink-600"
                            gradientHoverFrom="hover:from-purple-700"
                            gradientHoverTo="hover:to-pink-700"
                        >
                            Sample
                        </Button>
                    )}
                    <Button
                        onClick={onVisualize}
                        disabled={!value.trim() || isLoading}
                        isLoading={isLoading}
                        variant="gradient"
                        gradientFrom="from-blue-600"
                        gradientTo="to-indigo-600"
                        gradientHoverFrom="hover:from-blue-700"
                        gradientHoverTo="hover:to-indigo-700"
                        fullWidth
                    >
                        Visualize
                    </Button>
                </div>
            </div>

            <textarea
                value={value}
                onChange={handleChange}
                placeholder="Paste or type your JSON here...&#10;&#10;Example: {&#10;  &quot;name&quot;: &quot;value&quot;,&#10;  &quot;items&quot;: [1, 2, 3]&#10;}"
                className="flex-1 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 shadow-inner"
            />

            {error && <ErrorMessage message={error} />}
        </div>
    );
}

