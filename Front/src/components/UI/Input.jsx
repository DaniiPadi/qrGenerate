import React from 'react';

const Input = ({
    label,
    error,
    icon: Icon,
    className = '',
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon className="w-5 h-5" />
                    </div>
                )}
                <input
                    className={`input-field ${Icon ? 'pl-11' : ''} ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
        </div>
    );
};

export default Input;
