'use client';

import { useState, ChangeEvent } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    searchResults?: string[];
    totalMatches?: number;
}

const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const WarningIcon = () => (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const getMatchText = (count: number): string => {
    return `${count} result${count !== 1 ? 's' : ''} found`;
};

export function SearchBar({ onSearch, totalMatches }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search by path (e.g., user.name, items[0])"
                    className="w-full pl-10 pr-4 py-1.5 text-xs border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
            </div>

            {totalMatches !== undefined && query.trim() && (
                <div className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                    {totalMatches > 0 ? (
                        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                            <CheckIcon />
                            {getMatchText(totalMatches)}
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
                            <WarningIcon />
                            No matches found
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

