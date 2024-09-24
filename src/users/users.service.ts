import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>, // Inyectar el repositorio
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } }); // Busca un usuario por nombre de usuario
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(userData: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(userData); // Crea un nuevo usuario
    return this.usersRepository.save(user); // Guarda el usuario en la base de datos
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find(); // Retorna todos los usuarios
  }
}
