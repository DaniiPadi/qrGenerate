import { IsString, IsNotEmpty, IsOptional, IsEmail, IsUrl } from 'class-validator';

export class CreateVCardQrDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    firstName: string;

    @IsString()
    @IsNotEmpty({ message: 'El apellido es requerido' })
    lastName: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsEmail({}, { message: 'Debe ser un email válido' })
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    organization?: string;

    @IsUrl({}, { message: 'Debe ser una URL válida' })
    @IsOptional()
    url?: string;
}
