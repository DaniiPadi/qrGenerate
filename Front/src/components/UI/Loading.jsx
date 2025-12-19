import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ message = 'Cargando...' }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
            <p className="text-gray-600">{message}</p>
        </div>
    );
};

export default Loading;
