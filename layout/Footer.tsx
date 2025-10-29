'use client';

const Footer = () => {
    return (
        <footer className="px-6 py-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">About</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            Visualize complex JSON structures as interactive tree diagrams. Perfect for understanding data hierarchies and debugging JSON files.
                        </p>
                    </div>

                    {/* Column 2: Features */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">Features</h3>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li className="flex items-center gap-1.5">
                                <span className="text-green-600 dark:text-green-400">✓</span>
                                Interactive tree visualization
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="text-green-600 dark:text-green-400">✓</span>
                                Real-time search & highlight
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="text-green-600 dark:text-green-400">✓</span>
                                Dark mode support
                            </li>
                            <li className="flex items-center gap-1.5">
                                <span className="text-green-600 dark:text-green-400">✓</span>
                                Export & copy functionality
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Tech Stack */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium">Next.js</span>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md text-xs font-medium">React Flow</span>
                            <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 rounded-md text-xs font-medium">Tailwind</span>
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-md text-xs font-medium">TypeScript</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center md:text-left">
                            © 2025 JSON Tree Visualizer
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                            <span className="inline-flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                System operational
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;