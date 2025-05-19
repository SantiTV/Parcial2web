/* eslint-disable prettier/prettier */

import { Actividad } from 'src/actividad/actividad.entity/actividad.entity';
import { Estudiante } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Ensure Entity is a decorator function
@Entity()
export class Reseña {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  comentario: string;

  @Column()
  calificacion: number;

  @Column()
  fecha: string;

  @ManyToOne(() => Estudiante, (estudiante: Estudiante) => estudiante.id)
  estudiante: Estudiante;

  @ManyToOne(() => Actividad, (actividad) => actividad.resenas)
  actividad: Actividad;
}
