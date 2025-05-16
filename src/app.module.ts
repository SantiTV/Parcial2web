/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ActividadModule } from './actividad/actividad.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ReseñaModule } from './reseña/reseña.module';

@Module({
  imports: [EstudianteModule, ActividadModule, ReseñaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
