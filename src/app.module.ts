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
        url: configService.get<string>('DATABASE_URL'), // Asegúrate que 'DATABASE_URL' esté bien configurada en Vercel/Render
        entities: [__dirname + '/**/*.entity.{js,ts}'], // Especifica las entidades del proyecto
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'], // Rutas para tus migraciones
        synchronize: false, // Asegúrate de que esto esté desactivado en producción
        logging: true, // Muestra las consultas SQL en la consola
        migrationsRun: true, // Ejecuta migraciones automáticamente al iniciar la aplicación
        ssl:
          configService.get('NODE_ENV') === 'production'
            ? { rejectUnauthorized: false }
            : false, // Habilita SSL solo en producción
        extra: {
          connectionTimeoutMillis: 30000, // Ajuste del tiempo de espera para conexiones
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
