/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from './actividad.entity/actividad.entity';
import { ActividadService } from './actividad.service';

describe('ActividadService', () => {
  let service: ActividadService;
  let repo: jest.Mocked<Repository<Actividad>>;

  beforeEach(async () => {
    const repoMock = {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActividadService,
        {
          provide: getRepositoryToken(Actividad),
          useValue: repoMock,
        },
      ],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    repo = module.get(getRepositoryToken(Actividad));
  });

  describe('crearActividad()', () => {
    it('debería crear actividad válida (positivo)', async () => {
      const dto = {
        titulo: 'Actividad prueba',
        fecha: '2025-10-01',
        cupoMaximo: 10,
        estado: 0,
      };
      repo.save.mockResolvedValue(dto as Actividad);

      const result = await service.crearActividad(dto);
      expect(result.titulo).toBe('Actividad prueba');
    });

    it('debería lanzar error si el título tiene símbolos (negativo)', async () => {
      const dto = { titulo: 'Título@@@', fecha: '2025-10-01', cupoMaximo: 10 };
      await expect(service.crearActividad(dto)).rejects.toThrow(
        'El título no puede tener símbolos',
      );
    });
  });

  describe('cambiarEstado()', () => {
    it('debería cambiar estado a cerrado (positivo)', async () => {
      const actividad = {
        id: 1,
        titulo: 'Actividad prueba',
        fecha: '2025-10-01',
        cupoMaximo: 10,
        estado: 0,
        estudiantes: Array(8),
        resenas: [],
      };
      repo.findOne.mockResolvedValue(actividad as Actividad);
      repo.save.mockResolvedValue({ ...actividad, estado: 1 } as Actividad);

      const result = await service.cambiarEstado(1, 1);
      expect(result.estado).toBe(1);
    });

    it('debería fallar si no hay suficientes inscritos para cerrar (negativo)', async () => {
      const actividad = {
        id: 1,
        cupoMaximo: 10,
        estado: 0,
        estudiantes: Array(3),
      };
      repo.findOne.mockResolvedValue(actividad as Actividad);

      await expect(service.cambiarEstado(1, 1)).rejects.toThrow();
    });
  });
});
