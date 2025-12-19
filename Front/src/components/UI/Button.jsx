import React from 'react';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    className = '',
    disabled = false,
    loading = false,
    icon: Icon,
    type = 'button',
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md',
        outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseClasses} ${variants[variant]} ${className}`}
            {...props}
        >
            {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : Icon && (
                <Icon className="w-5 h-5" />
            )}
            {children}
        </button>
    );
};

export default Button;
