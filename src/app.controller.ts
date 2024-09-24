import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LoginUserDto } from './users/login-user.dto';


@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() loginUserDto: LoginUserDto) { // Ahora Body está correctamente importado
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // Nueva ruta para la raíz
  @Get()
  getRoot(): string {
    return 'Root endpoint is working!';
  }
}
