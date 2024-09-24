import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module'; // Asegúrate de que la ruta sea correcta
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // Importa el ConfigModule
    JwtModule.registerAsync({
      imports: [ConfigModule], // Asegúrate de importar el ConfigModule
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // Usa ConfigService para obtener la variable de entorno
        signOptions: { expiresIn: '60s' }, // Opciones de firma
      }),
    }),
    UsersModule, // Importa el módulo de usuarios
  ],
  providers: [AuthService],
  exports: [AuthService], // Exporta AuthService si es necesario
})
export class AuthModule {}
