import React, { useState } from 'react';
import { Link } from 'lucide-react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { validators } from '../../utils/validators';

const UrlForm = ({ onSubmit, loading }) => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (validators.isEmpty(url)) {
            setError('La URL es requerida');
            return;
        }

        if (!validators.isValidUrl(url)) {
            setError('Por favor ingresa una URL válida');
            return;
        }

        onSubmit({ url });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                label="URL del sitio web"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="ejemplo.com o https://ejemplo.com"
                icon={Link}
                error={error}
                required
            />
            <p className="text-xs text-gray-500">
                Si no incluyes http://, agregaremos https:// automáticamente.
            </p>
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

export default UrlForm;
