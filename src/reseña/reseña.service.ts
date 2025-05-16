/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividad } from 'src/actividad/actividad.entity/actividad.entity';
import { Estudiante } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { Reseña } from 'src/reseña/reseña.entity/reseña.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReseñaService {
  constructor(
    @InjectRepository(Reseña)
    private readonly resenaRepo: Repository<Reseña>,
    @InjectRepository(Actividad)
    private readonly actividadRepo: Repository<Actividad>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,
  ) {}

  async agregarReseña(
    data: Partial<Reseña> & { estudianteId: number; actividadId: number },
  ) {
    const actividad = await this.actividadRepo.findOne({
      where: { id: data.actividadId },
      relations: ['estudiantes'],
    });
    if (!actividad || actividad.estado !== 2)
      throw new BadRequestException('Actividad no finalizada');
    const inscrito = actividad.estudiantes.find(
      (e) => e.id === data.estudianteId,
    );
    if (!inscrito) throw new BadRequestException('Estudiante no participó');

    const estudiante = await this.estudianteRepo.findOne({
      where: { id: data.estudianteId },
    });
    if (!estudiante) throw new BadRequestException('Estudiante no encontrado');

    const reseña = this.resenaRepo.create({
      comentario: data.comentario,
      calificacion: data.calificacion,
      fecha: data.fecha,
      actividad,
      estudiante,
    });
    return this.resenaRepo.save(reseña);
  }
}
