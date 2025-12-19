import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlQrDto {
    @IsString()
    @IsNotEmpty({ message: 'La URL es requerida' })
    @IsUrl({}, { message: 'Debe ser una URL válida' })
    url: string;
}
