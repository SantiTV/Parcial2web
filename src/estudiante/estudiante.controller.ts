/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CrearEstudianteDTO } from 'src/estudiante/crear-estudiante.dto/crear-estudiante.dto';
import { EstudianteService } from './estudiante.service';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  crear(@Body() dto: CrearEstudianteDTO) {
    return this.estudianteService.crearEstudiante(dto);
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: number) {
    return this.estudianteService.obtenerEstudiante(id);
  }

  @Post(':estudianteId/inscribirse/:actividadId')
  inscribir(
    @Param('estudianteId') estudianteId: number,
    @Param('actividadId') actividadId: number,
  ) {
    return this.estudianteService.inscribirseAActividad(
      estudianteId,
      actividadId,
    );
  }
}
