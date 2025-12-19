import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_URL || '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.setGlobalPrefix('api');
    await app.init();
    const instance = app.getHttpAdapter().getInstance();
    instance(req, res);
}
