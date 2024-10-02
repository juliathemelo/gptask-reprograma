import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateClientDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNumber()
    password: number;

    @IsNotEmpty()
    name: string;

    @IsOptional()
    projects: string;
}
