import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'), // Tu URL de la base de datos NeonTech
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        synchronize: false, // Desactiva en producción para no perder datos
        logging: true, // Habilitar logging para ver consultas
        migrationsRun: true, // Ejecutar migraciones automáticamente al inicio
        ssl: {
          rejectUnauthorized: false, // Asegura que SSL está configurado correctamente
        },
        extra: {
          connectionTimeoutMillis: 30000, // Tiempo de espera en conexiones largas
        },
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
