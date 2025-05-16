/* eslint-disable prettier/prettier */

import 'reflect-metadata';
import { Actividad } from 'src/actividad/actividad.entity/actividad.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  programa: string;

  @Column()
  semestre: number;

  @ManyToMany(() => Actividad, (actividad) => actividad.estudiantes)
  @JoinTable()
  actividades: Actividad[];
}
