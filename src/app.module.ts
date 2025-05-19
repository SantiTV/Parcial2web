/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadModule } from './actividad/actividad.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ReseñaModule } from './reseña/reseña.module';

@Module({
  imports: [
    // Configuración para PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Cambia si usas Docker o servidor
      port: 5432, // Puerto por defecto de PostgreSQL
      username: 'postgres', // 👈 Coloca tu usuario
      password: 'postgres', // 👈 Coloca tu contraseña
      database: 'prueba2', // 👈 Coloca el nombre de tu base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ⚠️ Solo en desarrollo. Desactívalo en producción.
    }),
    EstudianteModule,
    ActividadModule,
    ReseñaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
