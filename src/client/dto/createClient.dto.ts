import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ProjectEntity } from 'src/project/entities/project.entity';

export class CreateClientDto {

    @ApiProperty({
        description: 'Id criado automaticamente'
    })
    @IsNotEmpty()
    id: string;

    @ApiProperty(
        {
            description: 'email de cadastro do usuário',
            example: 'novocliente@hotmail.com'
        }
    )
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty(
        {
            description: 'senha do usuário',
            example: '12345'
        }
    )
    @IsNumber()
    password: number;

    @ApiProperty(
        {
            description: 'nome do usuário',
            example: 'novocliente'
        }
    )
    @IsNotEmpty()
    name: string;

    @ApiProperty(
        {
            description: 'projetos pertencentes a esse usuário',
            example: '[idProjeto1]'
        }
    )
    @IsOptional()
    projects?: ProjectEntity[];
}
