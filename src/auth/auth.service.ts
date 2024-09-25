import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/login-user.dto';

//
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email); // Cambia aquí para buscar por email
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Credentials are invalid');
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // Lanzar error si las credenciales son inválidas
    }

    const payload = { username: user.username, sub: user.id }; // Ajusta esto según tu estructura de usuario
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('Correo ya registrado en el sistema');
    }

    // Mueve la encriptación al método `create` del servicio de usuarios.
    const newUser = await this.usersService.create(createUserDto);

    return newUser;
  }
}
