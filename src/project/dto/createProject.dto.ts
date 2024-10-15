import { IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { ClientEntity } from 'src/client/entities/client.entity';

export class CreateProjectDto {

    @IsNotEmpty()
    @ApiProperty({
        description: 'Id criado automaticamente'
    })
    id: string;

    @ApiProperty(
        {
            description: 'criador do projeto, cliente,preenchido pelo id'
        }
    )
    owner: ClientEntity;

    @ApiProperty(
        {
            description: 'nome do projeto',
            example: 'criação de um container para a API django'
        }
    )
    @IsNotEmpty()
    name: string;

    @ApiProperty(
        {
            description: 'descrição do projeto',
            example: 'quero realizar a atividade de criar container para a aplicação backend django da API de alimento pelo docker'
        }
    )
    @IsNotEmpty()
    description: string;

    @ApiProperty(
        {
            description: 'numero de pessoas trabalhando no projeto',
            example: 3
        }
    )
    @IsNumber()
    colaborators: number;
 // Usa class-transformer para converter o objeto
    @ApiProperty(
    {
        description: 'tasks associadas a esse projeto (criadas pelo gpt)'
    }
    )
    tasks?: TaskEntity[];
}
