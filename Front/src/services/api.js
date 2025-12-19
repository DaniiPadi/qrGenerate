import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('Response Error:', error.response?.data || error.message);

        if (error.code === 'ECONNABORTED') {
            error.message = 'La petición tardó demasiado tiempo';
        } else if (error.code === 'ERR_NETWORK') {
            error.message = 'Error de conexión. Verifica tu internet';
        } else if (error.response) {
            error.message = error.response.data?.message || 'Error en el servidor';
        }

        return Promise.reject(error);
    }
);

export default api;
