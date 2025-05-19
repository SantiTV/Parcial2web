/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CrearReseñaDTO } from 'src/reseña/crear-reseña.dto/crear-reseña.dto';
import { ReseñaService } from 'src/reseña/reseña.service';

@Controller('resenas')
export class ReseñaController {
  constructor(private readonly reseñaService: ReseñaService) {}

  @Post()
  crear(@Body() dto: CrearReseñaDTO) {
    return this.reseñaService.agregarReseña(dto);
  }
}
