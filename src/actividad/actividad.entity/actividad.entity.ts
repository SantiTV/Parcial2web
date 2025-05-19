/* eslint-disable prettier/prettier */

import 'reflect-metadata';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estudiante } from '../../estudiante/estudiante.entity/estudiante.entity';
import { Reseña } from '../../reseña/reseña.entity/reseña.entity';

@Entity()
export class Actividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  fecha: string;

  @Column()
  cupoMaximo: number;

  @Column()
  estado: number;

  @ManyToMany(() => Estudiante, (estudiante) => estudiante.actividades)
  estudiantes: Estudiante[];

  @OneToMany(() => Reseña, (resena) => resena.actividad)
  resenas: Reseña[];
}
