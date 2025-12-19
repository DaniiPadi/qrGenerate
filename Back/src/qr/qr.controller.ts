import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { QrService } from './qr.service';
import { CreateUrlQrDto } from './dto/create-url-qr.dto';
import { CreateTextQrDto } from './dto/create-text-qr.dto';
import { CreateVCardQrDto } from './dto/create-vcard-qr.dto';
import { QueryQrDto } from './dto/query-qr.dto';

@Controller('qr')
export class QrController {
    constructor(private readonly qrService: QrService) { }

    @Post('url')
    generateUrlQr(@Body(ValidationPipe) dto: CreateUrlQrDto) {
        return this.qrService.generateUrlQr(dto);
    }

    @Post('text')
    generateTextQr(@Body(ValidationPipe) dto: CreateTextQrDto) {
        return this.qrService.generateTextQr(dto);
    }

    @Post('vcard')
    generateVCardQr(@Body(ValidationPipe) dto: CreateVCardQrDto) {
        return this.qrService.generateVCardQr(dto);
    }

    @Get()
    findAll(@Query(ValidationPipe) query: QueryQrDto) {
        return this.qrService.findAll(query.page, query.limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.qrService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.qrService.remove(id);
    }

    @Get('health/check')
    getHealth() {
        return this.qrService.getHealth();
    }
}
