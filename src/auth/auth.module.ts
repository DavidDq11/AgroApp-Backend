import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module'; // Asegúrate de que la ruta sea correcta

@Module({
  imports: [
    JwtModule.register({
      secret: 'tu_secreto', // Cambia esto por una clave secreta segura
      signOptions: { expiresIn: '60s' }, // Opciones de firma
    }),
    UsersModule, // Importa el módulo de usuarios
  ],
  providers: [AuthService],
  exports: [AuthService], // Exporta AuthService si es necesario
})
export class AuthModule {}
