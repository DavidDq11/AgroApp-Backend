import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importar la entidad User
  providers: [UsersService], // Registrar el servicio de usuarios
  controllers: [UsersController], // Registrar el controlador de usuarios
  exports: [UsersService], // Exportar el servicio para que otros módulos lo usen
})
export class UsersModule {}
