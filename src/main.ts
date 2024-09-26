import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  try {
    dotenv.config();
    const app = await NestFactory.create(AppModule);

    // Habilita CORS y permite solicitudes desde localhost y Vercel
    app.enableCors({
      origin: [
        process.env.FRONTEND_URL || 'https://agro-app-web.vercel.app', // Permitir producción
      ],
      methods: 'GET,POST,PUT,DELETE,OPTIONS',
      credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe()); // Habilita la validación global

    // Escucha en el puerto definido por Render o en el puerto 3001 por defecto
    await app.listen(process.env.PORT || 3001, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Error during application bootstrap:', error);
  }
}

bootstrap();
