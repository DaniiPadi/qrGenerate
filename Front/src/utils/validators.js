export const validators = {
    isValidUrl: (url) => {
        try {
            new URL(url.startsWith('http') ? url : `https://${url}`);
            return true;
        } catch {
            return false;
        }
    },

    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    isValidPhone: (phone) => {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
    },

    isEmpty: (value) => {
        return !value || value.trim() === '';
    },
};
