import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateTextQrDto {
    @IsString()
    @IsNotEmpty({ message: 'El texto es requerido' })
    @MinLength(1, { message: 'El texto debe tener al menos 1 caracter' })
    @MaxLength(2000, { message: 'El texto no puede exceder 2000 caracteres' })
    text: string;
}
