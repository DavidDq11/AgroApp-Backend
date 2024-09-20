import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll(); // Ruta para obtener todos los usuarios
  }

  @Get(':username')
  async findOne(
    @Param('username') username: string,
  ): Promise<User | undefined> {
    return this.usersService.findOne(username); // Ruta para obtener un usuario por nombre de usuario
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto); // Utiliza el DTO para validar los datos de entrada
  }
}
