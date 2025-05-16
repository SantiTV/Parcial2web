/* eslint-disable prettier/prettier */

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividad } from 'src/actividad/actividad.entity/actividad.entity';
import { Estudiante } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,
    @InjectRepository(Actividad)
    private readonly actividadRepo: Repository<Actividad>,
  ) {}

  async crearEstudiante(data: Partial<Estudiante>) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.correo ?? ''))
      throw new BadRequestException('Correo no válido');
    if (
      typeof data.semestre !== 'number' ||
      data.semestre < 1 ||
      data.semestre > 10
    )
      throw new BadRequestException('Semestre debe estar entre 1 y 10');
    return this.estudianteRepo.save(data);
  }

  async findEstudianteById(id: number) {
    const estudiante = await this.estudianteRepo.findOne({
      where: { id },
      relations: ['actividades'],
    });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');
    return estudiante;
  }

  async inscribirseActividad(estudianteID: number, actividadID: number) {
    const estudiante = await this.findEstudianteById(estudianteID);
    const actividad = await this.actividadRepo.findOne({
      where: { id: actividadID },
      relations: ['estudiantes'],
    });
    if (!actividad) throw new NotFoundException('Actividad no encontrada');
    if (actividad.estado !== 0)
      throw new BadRequestException('Actividad no abierta');
    if (actividad.estudiantes.length >= actividad.cupoMaximo)
      throw new BadRequestException('No hay cupo');
    if (actividad.estudiantes.find((e) => e.id === estudianteID))
      throw new BadRequestException('Ya inscrito');

    actividad.estudiantes.push(estudiante);
    await this.actividadRepo.save(actividad);
    return { mensaje: 'Inscripción exitosa' };
  }
}
