/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividad } from 'src/actividad/actividad.entity/actividad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(Actividad)
    private readonly actividadRepo: Repository<Actividad>,
  ) {}

  async crearActividad(data: Partial<Actividad>) {
    if (!/^[a-zA-Z0-9 ]{15,}$/.test(data.titulo ?? ''))
      throw new BadRequestException('Título inválido');
    data.estado = 0;
    return this.actividadRepo.save(data);
  }

  async cambiarEstado(id: number, estado: number) {
    const actividad = await this.actividadRepo.findOne({
      where: { id },
      relations: ['estudiantes'],
    });
    if (!actividad) throw new BadRequestException('Actividad no encontrada');

    const inscritos = actividad.estudiantes.length;
    if (estado === 1 && inscritos < 0.8 * actividad.cupoMaximo)
      throw new BadRequestException('No hay 80% inscritos');
    if (estado === 2 && inscritos < actividad.cupoMaximo)
      throw new BadRequestException('Aún hay cupo');

    actividad.estado = estado;
    return this.actividadRepo.save(actividad);
  }

  async findAllActividadesByDate(fecha: string) {
    return this.actividadRepo.find({ where: { fecha } });
  }
}
