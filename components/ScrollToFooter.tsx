'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const ScrollToFooter = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.getElementById('footer');
            if (footer) {
                const footerTop = footer.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                // Show button if footer is not visible in viewport (with some threshold)
                setIsVisible(footerTop > windowHeight - 100);
            }
        };

        // Check initially
        handleScroll();

        // Listen to scroll events
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const scrollToFooter = () => {
        const footer = document.getElementById('footer');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToFooter}
            className="fixed bottom-6 pointer-cursor right-0 z-50 p-3 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/30"
            aria-label="Scroll to footer"
            title="Scroll to footer"
        >
            <ChevronDown className="w-3 h-3" />
        </button>
    );
};

export default ScrollToFooter;

