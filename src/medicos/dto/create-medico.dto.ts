import {
    IsString,
    IsNotEmpty,
    IsInt,
    Min
} from 'class-validator';

export class CreateMedicoDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsInt()
    @Min(1)
    specialityId: number;

    @IsInt()
    @Min(1)
    userId: number;
}