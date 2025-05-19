/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CrearActividadDTO } from 'src/actividad/crear-actividad.dto/crear-actividad.dto';
import { ActividadService } from './actividad.service';

@Controller('actividades')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  crear(@Body() dto: CrearActividadDTO) {
    return this.actividadService.crearActividad(dto);
  }

  @Patch(':id/estado')
  cambiarEstado(@Param('id') id: number, @Body() data: { estado: number }) {
    return this.actividadService.cambiarEstado(id, data.estado);
  }

  @Get('fecha/:fecha')
  buscarPorFecha(@Param('fecha') fecha: string) {
    return this.actividadService.obtenerActividadesPorFecha(fecha);
  }
}
