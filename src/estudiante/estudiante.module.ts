/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from '../actividad/actividad.entity/actividad.entity';
import { EstudianteController } from './estudiante.controller';
import { Estudiante } from './estudiante.entity/estudiante.entity';
import { EstudianteService } from './estudiante.service';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Actividad])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [EstudianteService],
})
export class EstudianteModule {}
