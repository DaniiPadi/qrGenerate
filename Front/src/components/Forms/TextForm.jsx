import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Textarea from '../UI/Textarea';
import Button from '../UI/Button';
import { validators } from '../../utils/validators';

const TextForm = ({ onSubmit, loading }) => {
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (validators.isEmpty(text)) {
            setError('El texto es requerido');
            return;
        }

        if (text.length > 2000) {
            setError('El texto no puede exceder 2000 caracteres');
            return;
        }

        onSubmit({ text });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Textarea
                label="Contenido de texto"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ingresa cualquier texto para generar código QR..."
                rows={6}
                error={error}
                required
            />
            <div className="text-xs text-gray-500 text-right">
                {text.length} / 2000 caracteres
            </div>
            <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={loading}
                disabled={loading}
            >
                Generar Código QR
            </Button>
        </form>
    );
};

export default TextForm;
