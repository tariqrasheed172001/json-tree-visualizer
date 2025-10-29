'use client';
import { useTheme } from '@/components/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/Button';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 px-6 py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-gray-100 dark:via-blue-200 dark:to-gray-100 bg-clip-text text-transparent">
                            JSON Tree Visualizer
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        onClick={toggleTheme}
                        variant="icon"
                        aria-label="Toggle theme"
                        className="group"
                    >
                        {theme === 'light' ? (
                            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:rotate-[-15deg] transition-transform" />
                        ) : (
                            <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:rotate-12 transition-transform" />
                        )}
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Header;
