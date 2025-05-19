/* eslint-disable prettier/prettier */
import { IsDateString, IsInt, IsString, Min } from 'class-validator';

export class CrearActividadDTO {
  @IsString()
  titulo: string;

  @IsDateString()
  fecha: string;

  @IsInt()
  @Min(1)
  cupoMaximo: number;

  @IsInt()
  estado: number;
}
