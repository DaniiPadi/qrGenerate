import React, { useState, useEffect } from 'react';
import { Trash2, Calendar, Eye } from 'lucide-react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Loading from '../UI/Loading';
import { qrService } from '../../services/qrService';
import { formatters } from '../../utils/formatters';
import toast from 'react-hot-toast';

const QRHistory = () => {
    const [qrList, setQrList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);

    const fetchQRHistory = async () => {
        setLoading(true);
        try {
            const response = await qrService.getAllQRs(page, 10);
            if (response.success) {
                setQrList(response.data);
                setPagination(response.pagination);
            }
        } catch (error) {
            toast.error('Error al cargar el historial');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQRHistory();
    }, [page]);

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este código QR?')) return;

        try {
            await qrService.deleteQR(id);
            toast.success('Código QR eliminado');
            fetchQRHistory();
        } catch (error) {
            toast.error('Error al eliminar código QR');
        }
    };

    if (loading) {
        return <Loading message="Cargando historial..." />;
    }

    if (qrList.length === 0) {
        return (
            <Card className="text-center py-12">
                <p className="text-gray-500">No hay códigos QR generados todavía</p>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Historial de códigos QR
            </h2>

            <div className="grid gap-4">
                {qrList.map((qr) => (
                    <Card key={qr.id} className="hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-4">
                            <img
                                src={qr.qrImage}
                                alt="QR Code"
                                className="w-20 h-20 rounded-lg"
                            />

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                                        {qr.type.toUpperCase()}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                        <Calendar className="w-3 h-3" />
                                        {formatters.formatDate(qr.createdAt)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 truncate">
                                    {formatters.truncateText(qr.content, 60)}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    icon={Trash2}
                                    className="text-red-500 border-red-200 hover:bg-red-50"
                                    onClick={() => handleDelete(qr.id)}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Pagination controls could be added here if needed */}
        </div>
    );
};

export default QRHistory;
