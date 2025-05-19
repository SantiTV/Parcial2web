/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estudiante } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { EstudianteService } from './estudiante.service';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let mockRepo: { save: jest.Mock; findOne: jest.Mock };

  beforeEach(async () => {
    mockRepo = {
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        { provide: getRepositoryToken(Estudiante), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
  });

  it('debería crear estudiante exitosamente', async () => {
    const dto = {
      nombre: 'Ana',
      correo: 'ana@uniandes.edu.co',
      semestre: 6,
      programa: 'ISI',
    };
    mockRepo.save.mockResolvedValue(dto);
    const result = await service.crearEstudiante(dto);
    expect(result).toEqual(dto);
  });

  it('debería fallar con correo inválido', async () => {
    const dto = { nombre: 'Ana', correo: 'ana', semestre: 6, programa: 'ISI' };
    await expect(service.crearEstudiante(dto)).rejects.toThrow();
  });
});
