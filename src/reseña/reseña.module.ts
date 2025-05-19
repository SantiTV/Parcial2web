/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReseñaController } from './reseña.controller';
import { Reseña } from './reseña.entity/reseña.entity';
import { ReseñaService } from './reseña.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reseña])],
  providers: [ReseñaService],
  controllers: [ReseñaController],
  exports: [ReseñaService],
})
export class ResenaModule {}
export class ReseñaModule {}
