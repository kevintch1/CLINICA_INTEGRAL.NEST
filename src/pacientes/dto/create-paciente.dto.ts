import { IsString, IsNotEmpty, IsEmail, IsDateString, MaxLength } from 'class-validator';

export class CreatePacienteDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsDateString()
    birthDate: string;

    @IsString()
    @IsNotEmpty()
    address: string;
}