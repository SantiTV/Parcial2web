/* eslint-disable prettier/prettier */
import { IsInt, IsString, Max, Min } from 'class-validator';

export class CrearReseñaDTO {
  @IsInt()
  estudianteId: number;

  @IsInt()
  actividadId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  calificacion: number;

  @IsString()
  comentario: string;

  @IsString()
  fecha: string;
}
