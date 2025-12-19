import React, { useState } from 'react';
import TabNavigation from './TabNavigation';
import QRDisplay from './QRDisplay';
import UrlForm from '../Forms/UrlForm';
import TextForm from '../Forms/TextForm';
import ContactForm from '../Forms/ContactForm';
import { qrService } from '../../services/qrService';
import Card from '../UI/Card';
import toast from 'react-hot-toast';

const QRGenerator = () => {
    const [activeTab, setActiveTab] = useState('url');
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState(null);

    const handleGenerate = async (data) => {
        setLoading(true);
        try {
            let response;
            if (activeTab === 'url') {
                response = await qrService.generateUrlQR(data.url);
            } else if (activeTab === 'text') {
                response = await qrService.generateTextQR(data.text);
            } else if (activeTab === 'contact') {
                response = await qrService.generateVCardQR(data);
            }

            if (response && response.success) {
                setQrData(response.data);
                toast.success('Código QR generado exitosamente');
            }
        } catch (error) {
            toast.error(error.message || 'Error al generar código QR');
        } finally {
            setLoading(false);
        }
    };

    const renderForm = () => {
        switch (activeTab) {
            case 'url':
                return <UrlForm onSubmit={handleGenerate} loading={loading} />;
            case 'text':
                return <TextForm onSubmit={handleGenerate} loading={loading} />;
            case 'contact':
                return <ContactForm onSubmit={handleGenerate} loading={loading} />;
            default:
                return null;
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <Card>
                    <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
                    <div className="mt-6">
                        {renderForm()}
                    </div>
                </Card>
            </div>

            <div>
                <QRDisplay qrData={qrData} type={activeTab} />
            </div>
        </div>
    );
};

export default QRGenerator;
