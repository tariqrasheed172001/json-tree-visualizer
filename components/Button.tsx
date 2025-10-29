'use client';

/**
 * Reusable Button Component
 * 
 * A flexible button component that supports multiple variants, sizes, and states.
 * Used throughout the application for consistent UI/UX.
 * 
 * @example
 * <Button variant="gradient" icon={Upload} gradientFrom="from-purple-600" gradientTo="to-pink-600">
 *   Sample
 * </Button>
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'gradient' | 'icon';
    size?: 'sm' | 'md' | 'lg';
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    isLoading?: boolean;
    loadingText?: string;
    gradientFrom?: string;
    gradientTo?: string;
    gradientHoverFrom?: string;
    gradientHoverTo?: string;
    children?: ReactNode;
    fullWidth?: boolean;
}

/**
 * Button component with multiple variants and configurations
 * @param variant - Button style variant (primary, secondary, gradient, icon)
 * @param size - Button size (sm, md, lg)
 * @param icon - Optional Lucide icon component
 * @param iconPosition - Position of icon relative to text (left or right)
 * @param isLoading - Shows loading spinner when true
 * @param loadingText - Custom loading text (default: "Processing...")
 * @param gradientFrom - Tailwind gradient start color class
 * @param gradientTo - Tailwind gradient end color class
 * @param gradientHoverFrom - Tailwind gradient hover start color class
 * @param gradientHoverTo - Tailwind gradient hover end color class
 * @param fullWidth - Makes button full width of container
 */
export function Button({
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    isLoading = false,
    loadingText,
    gradientFrom,
    gradientTo,
    gradientHoverFrom,
    gradientHoverTo,
    children,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const sizeClasses = {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-xs',
        lg: 'px-4 py-2 text-sm',
    };

    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100',
        gradient: gradientFrom && gradientTo
            ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} ${gradientHoverFrom || ''} ${gradientHoverTo || ''} text-white`
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white',
        icon: 'p-2.5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 border border-gray-300 dark:border-gray-600',
    };

    const needsGap = (Icon && children) || (children && typeof children !== 'string');
    const gapClass = needsGap ? 'gap-2' : '';

    const baseClasses = `
        font-semibold
        rounded-lg
        transition-all
        duration-200
        flex
        items-center
        justify-center
        ${gapClass}
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        disabled:transform-none
        ${fullWidth ? 'w-full' : ''}
    `;

    const shadowClasses = variant === 'icon'
        ? 'shadow-md hover:shadow-lg'
        : 'shadow-md hover:shadow-lg transform hover:scale-105';

    const combinedClasses = `
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${baseClasses}
        ${shadowClasses}
        ${className}
    `.trim().replace(/\s+/g, ' ');

    const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 18;

    return (
        <button
            className={combinedClasses}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{loadingText || 'Processing...'}</span>
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon size={iconSize} />}
                    {children && (typeof children === 'string' ? <span>{children}</span> : children)}
                    {Icon && iconPosition === 'right' && <Icon size={iconSize} />}
                </>
            )}
        </button>
    );
}

