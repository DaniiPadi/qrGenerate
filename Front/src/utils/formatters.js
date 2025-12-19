import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatters = {
    formatDate: (date) => {
        return format(new Date(date), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: es });
    },

    formatUrl: (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }
        return url;
    },

    truncateText: (text, maxLength = 50) => {
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`;
    },

    downloadQRCode: (qrImage, filename = 'qr-code') => {
        const link = document.createElement('a');
        link.href = qrImage;
        link.download = `${filename}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error('Error al copiar:', error);
            return false;
        }
    },
};
