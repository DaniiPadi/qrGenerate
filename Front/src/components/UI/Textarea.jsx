import React from 'react';

const Textarea = ({
    label,
    error,
    className = '',
    rows = 4,
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
            <textarea
                rows={rows}
                className={`input-field resize-none ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
        </div>
    );
};

export default Textarea;
