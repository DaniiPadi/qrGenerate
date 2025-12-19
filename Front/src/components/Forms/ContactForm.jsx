import React, { useState } from 'react';
import { User, Mail, Phone, Building, Link } from 'lucide-react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { validators } from '../../utils/validators';

const ContactForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        organization: '',
        url: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (validators.isEmpty(formData.firstName)) {
            newErrors.firstName = 'El nombre es requerido';
        }

        if (validators.isEmpty(formData.lastName)) {
            newErrors.lastName = 'El apellido es requerido';
        }

        if (formData.email && !validators.isValidEmail(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (formData.phone && !validators.isValidPhone(formData.phone)) {
            newErrors.phone = 'Teléfono inválido';
        }

        if (formData.url && !validators.isValidUrl(formData.url)) {
            newErrors.url = 'URL inválida';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit(formData);
    };

    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            organization: '',
            url: '',
        });
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Nombre"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Juan"
                    icon={User}
                    error={errors.firstName}
                    required
                />
                <Input
                    label="Apellido"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Pérez"
                    error={errors.lastName}
                    required
                />
            </div>

            <Input
                label="Teléfono"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+593 99 999 9999"
                icon={Phone}
                error={errors.phone}
            />

            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="juan.perez@ejemplo.com"
                icon={Mail}
                error={errors.email}
            />

            <Input
                label="Organización"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Nombre de la empresa"
                icon={Building}
                error={errors.organization}
            />

            <Input
                label="Sitio web"
                name="url"
                type="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://ejemplo.com"
                icon={Link}
                error={errors.url}
            />

            <div className="flex gap-4 pt-2">
                <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    loading={loading}
                    disabled={loading}
                >
                    Generar Código QR
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleReset}
                    disabled={loading}
                >
                    Limpiar
                </Button>
            </div>
        </form>
    );
};

export default ContactForm;
