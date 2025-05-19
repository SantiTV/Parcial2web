/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadController } from './actividad.controller';
import { Actividad } from './actividad.entity/actividad.entity';
import { ActividadService } from './actividad.service';

@Module({
  imports: [TypeOrmModule.forFeature([Actividad])],
  controllers: [ActividadController],
  providers: [ActividadService],
  exports: [ActividadService],
})
export class ActividadModule {}
