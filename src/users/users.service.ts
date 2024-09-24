import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneOrFail({ where: { username } });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneOrFail({ where: { email } });
  }

  async create(userData: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltOrRounds); // Encripta aquí

    console.log('Password encriptada antes de guardar:', hashedPassword); // Imprime para verificar

    // Crea un nuevo objeto con la contraseña encriptada
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword, // Reemplaza la contraseña con la encriptada
    });

    return this.usersRepository.save(user); // Guarda en la base de datos
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
