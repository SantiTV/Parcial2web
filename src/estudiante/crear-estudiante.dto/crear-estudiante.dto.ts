/* eslint-disable prettier/prettier */

import { IsEmail, IsInt, IsString, Max, Min } from 'class-validator';

export class CrearEstudianteDTO {
  @IsString()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsInt()
  @Min(1)
  @Max(12)
  semestre: number;

  @IsString()
  programa: string;
}
