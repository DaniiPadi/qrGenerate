import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUrlQrDto } from './dto/create-url-qr.dto';
import { CreateTextQrDto } from './dto/create-text-qr.dto';
import { CreateVCardQrDto } from './dto/create-vcard-qr.dto';
import * as QRCode from 'qrcode';

@Injectable()
export class QrService {
    constructor(private prisma: PrismaService) { }

    private async generateQRImage(data: string): Promise<string> {
        try {
            const qrImage = await QRCode.toDataURL(data, {
                errorCorrectionLevel: 'M',
                type: 'image/png',
                width: 300,
                margin: 2,
            });
            return qrImage;
        } catch (error) {
            throw new InternalServerErrorException('Error al generar el código QR');
        }
    }

    private formatUrl(url: string): string {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }
        return url;
    }

    private generateVCard(dto: CreateVCardQrDto): string {
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${dto.firstName} ${dto.lastName}
N:${dto.lastName};${dto.firstName};;;
${dto.organization ? `ORG:${dto.organization}` : ''}
${dto.phone ? `TEL:${dto.phone}` : ''}
${dto.email ? `EMAIL:${dto.email}` : ''}
${dto.url ? `URL:${dto.url}` : ''}
END:VCARD`;
        return vcard;
    }

    async generateUrlQr(dto: CreateUrlQrDto) {
        try {
            const formattedUrl = this.formatUrl(dto.url);
            const qrImage = await this.generateQRImage(formattedUrl);

            const qrCode = await this.prisma.qrCode.create({
                data: {
                    type: 'url',
                    content: formattedUrl,
                    qrImage,
                    metadata: { originalUrl: dto.url },
                },
            });

            return {
                success: true,
                message: 'Código QR de URL generado exitosamente',
                data: qrCode,
            };
        } catch (error) {
            throw new InternalServerErrorException('Error al generar QR de URL');
        }
    }

    async generateTextQr(dto: CreateTextQrDto) {
        try {
            const qrImage = await this.generateQRImage(dto.text);

            const qrCode = await this.prisma.qrCode.create({
                data: {
                    type: 'text',
                    content: dto.text,
                    qrImage,
                },
            });

            return {
                success: true,
                message: 'Código QR de texto generado exitosamente',
                data: qrCode,
            };
        } catch (error) {
            throw new InternalServerErrorException('Error al generar QR de texto');
        }
    }

    async generateVCardQr(dto: CreateVCardQrDto) {
        try {
            const vCardContent = this.generateVCard(dto);
            const qrImage = await this.generateQRImage(vCardContent);

            const qrCode = await this.prisma.qrCode.create({
                data: {
                    type: 'vcard',
                    content: vCardContent,
                    qrImage,
                    metadata: {
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                        phone: dto.phone,
                        email: dto.email,
                        organization: dto.organization,
                        url: dto.url,
                    },
                },
            });

            return {
                success: true,
                message: 'Código QR de contacto generado exitosamente',
                data: qrCode,
            };
        } catch (error) {
            throw new InternalServerErrorException('Error al generar QR de contacto');
        }
    }

    async findOne(id: string) {
        const qrCode = await this.prisma.qrCode.findUnique({
            where: { id },
        });

        if (!qrCode) {
            throw new NotFoundException(`Código QR con ID ${id} no encontrado`);
        }

        return {
            success: true,
            data: qrCode,
        };
    }

    async findAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const [qrCodes, total] = await Promise.all([
            this.prisma.qrCode.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.qrCode.count(),
        ]);

        return {
            success: true,
            data: qrCodes,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async remove(id: string) {
        const qrCode = await this.prisma.qrCode.findUnique({
            where: { id },
        });

        if (!qrCode) {
            throw new NotFoundException(`Código QR con ID ${id} no encontrado`);
        }

        await this.prisma.qrCode.delete({
            where: { id },
        });

        return {
            success: true,
            message: 'Código QR eliminado exitosamente',
        };
    }

    async getHealth() {
        try {
            await this.prisma.$queryRaw`SELECT 1`;
            return {
                status: 'ok',
                database: 'connected',
                timestamp: new Date().toISOString(),
            };
        } catch (error) {
            return {
                status: 'error',
                database: 'disconnected',
                timestamp: new Date().toISOString(),
            };
        }
    }
}
