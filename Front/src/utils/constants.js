export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const QR_TYPES = {
    URL: 'url',
    TEXT: 'text',
    VCARD: 'vcard',
};

export const MESSAGES = {
    SUCCESS: {
        QR_GENERATED: 'Código QR generado exitosamente',
        QR_DELETED: 'Código QR eliminado exitosamente',
        COPIED: 'Copiado al portapapeles',
        DOWNLOADED: 'Código QR descargado',
    },
    ERROR: {
        GENERATE_QR: 'Error al generar código QR',
        DELETE_QR: 'Error al eliminar código QR',
        FETCH_QR: 'Error al obtener código QR',
        NETWORK: 'Error de conexión. Verifica tu conexión a internet',
        VALIDATION: 'Por favor completa todos los campos requeridos',
    },
};
