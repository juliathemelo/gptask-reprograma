import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ProjectEntity } from 'src/project/entities/project.entity';

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
    projects?: ProjectEntity[];
}
