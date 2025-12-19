import api from './api';

export const qrService = {
    async generateUrlQR(url) {
        try {
            const { data } = await api.post('/qr/url', { url });
            return data;
        } catch (error) {
            throw new Error(error.message || 'Error al generar QR de URL');
        }
    },

    async generateTextQR(text) {
        try {
            const { data } = await api.post('/qr/text', { text });
            return data;
        } catch (error) {
            throw new Error(error.message || 'Error al generar QR de texto');
        }
    },

    async generateVCardQR(contactData) {
        try {
            const { data } = await api.post('/qr/vcard', contactData);
            return data;
        } catch (error) {
            throw new Error(error.message || 'Error al generar QR de contacto');
        }
    },

    async getQRById(id) {
        try {
            const { data } = await api.get(`/qr/${id}`);
            return data;
        } catch (error) {
            throw new Error(error.message || 'Error al obtener código QR');
        }
    },

    async getAllQRs(page = 1, limit = 10) {
        try {
            const { data } = await api.get(`/qr?page=${page}&limit=${limit}`);
            return data;
        } catch (error) {
            throw new Error(error.message || 'Error al obtener lista de QR');
        }
    },

    async deleteQR(id) {
        try {
            const { data } = await api.delete(`/qr/${id}`);
            return data;
        } catch (error) {
            throw new Error(error.message || 'Error al eliminar código QR');
        }
    },

    async healthCheck() {
        try {
            const { data } = await api.get('/qr/health/check');
            return data;
        } catch (error) {
            throw new Error('API no disponible');
        }
    },
};
