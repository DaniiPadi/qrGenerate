import React, { useState } from 'react';
import { Download, Copy, Check, QrCode as QrCodeIcon } from 'lucide-react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import { formatters } from '../../utils/formatters';
import toast from 'react-hot-toast';

const QRDisplay = ({ qrData, type }) => {
    const [copied, setCopied] = useState(false);

    const handleDownload = () => {
        if (qrData?.qrImage) {
            formatters.downloadQRCode(qrData.qrImage, `qr-${type}`);
            toast.success('Código QR descargado');
        }
    };

    const handleCopy = async () => {
        if (qrData?.content) {
            const success = await formatters.copyToClipboard(qrData.content);
            if (success) {
                setCopied(true);
                toast.success('Copiado al portapapeles');
                setTimeout(() => setCopied(false), 2000);
            } else {
                toast.error('Error al copiar');
            }
        }
    };

    if (!qrData) {
        return (
            <Card className="text-center py-16 bg-gray-50">
                <QrCodeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                    Completa el formulario para generar tu código QR
                </p>
            </Card>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <Card className="bg-gray-50">
                <div className="text-center">
                    <img
                        src={qrData.qrImage}
                        alt="Código QR generado"
                        className="w-full max-w-[300px] h-auto mx-auto rounded-xl shadow-lg bg-white p-4"
                    />
                    <p className="text-sm text-gray-600 mt-4">
                        Escanea este código QR con tu dispositivo
                    </p>
                </div>
            </Card>

            <div className="flex gap-4">
                <Button
                    onClick={handleDownload}
                    variant="primary"
                    icon={Download}
                    className="flex-1"
                >
                    Descargar
                </Button>
                <Button
                    onClick={handleCopy}
                    variant="secondary"
                    icon={copied ? Check : Copy}
                    className="flex-1"
                >
                    {copied ? 'Copiado' : 'Copiar datos'}
                </Button>
            </div>

            {qrData.content && (
                <Card>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Datos del código QR:
                    </h3>
                    <div className="bg-gray-100 rounded-lg p-3 text-xs text-gray-600 max-h-32 overflow-y-auto">
                        <pre className="whitespace-pre-wrap break-words">
                            {qrData.content}
                        </pre>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default QRDisplay;
