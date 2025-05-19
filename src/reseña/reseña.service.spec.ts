/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from '../actividad/actividad.entity/actividad.entity';
import { Estudiante } from '../estudiante/estudiante.entity/estudiante.entity';
import { Reseña } from './reseña.entity/reseña.entity';
import { ReseñaService } from './reseña.service';

describe('ResenaService', () => {
  let service: ReseñaService;
  let resenaRepo: jest.Mocked<Repository<Reseña>>;
  let actividadRepo: jest.Mocked<Repository<Actividad>>;
  let estudianteRepo: jest.Mocked<Repository<Estudiante>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReseñaService,
        {
          provide: getRepositoryToken(Reseña),
          useValue: { save: jest.fn() },
        },
        {
          provide: getRepositoryToken(Actividad),
          useValue: { findOne: jest.fn() },
        },
        {
          provide: getRepositoryToken(Estudiante),
          useValue: { findOne: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<ReseñaService>(ReseñaService);
    resenaRepo = module.get(getRepositoryToken(Reseña));
    actividadRepo = module.get(getRepositoryToken(Actividad));
    estudianteRepo = module.get(getRepositoryToken(Estudiante));
  });

  describe('agregarReseña()', () => {
    it('debería agregar reseña si actividad está finalizada (positivo)', async () => {
      const dto = {
        estudianteId: 1,
        actividadId: 1,
        comentario: 'Excelente',
        calificacion: 5,
      };

      actividadRepo.findOne.mockResolvedValue({
        id: 1,
        estado: 2,
        estudiantes: [{ id: 1 }],
      } as any);

      estudianteRepo.findOne.mockResolvedValue({ id: 1 } as any);
      resenaRepo.save.mockResolvedValue({
        id: 1,
        fecha: new Date().toISOString(),
        estudiante: { id: dto.estudianteId } as Estudiante,
        actividad: { id: dto.actividadId } as Actividad,
        comentario: dto.comentario,
        calificacion: dto.calificacion,
      } as Reseña);

      const result = await service.agregarReseña(dto);
      expect(result.calificacion).toBe(5);
    });

    it('debería lanzar error si actividad no está finalizada (negativo)', async () => {
      actividadRepo.findOne.mockResolvedValue({
        id: 1,
        estado: 0,
        estudiantes: [{ id: 1 }],
      } as any);

      const dto = {
        estudianteId: 1,
        actividadId: 1,
        comentario: 'Mala',
        calificacion: 1,
      };

      await expect(service.agregarReseña(dto)).rejects.toThrow(
        'La actividad no está finalizada',
      );
    });
  });
});
