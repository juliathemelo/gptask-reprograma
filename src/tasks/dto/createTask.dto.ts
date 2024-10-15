import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PriorityType } from '../entities/priority.type';
import { ProjectEntity } from 'src/project/entities/project.entity';

export class CreateTaskDto {
    @ApiProperty({
        description: 'Id criado automaticamente'
    })
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        description: 'Titulo da task (criado pela API gpt)'
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Resumo da task (criado pela API gpt)'
    })
    resume: string;

    @ApiProperty({
        description: 'status da task (criado pela API gpt, normalmente em backlog)'
    })
    @IsString()
    status: string;

    @ApiProperty({
        description: 'prioridade de cada task'
    })
    priority: PriorityType;

    @ApiProperty({
        description: 'projeto associado a essa task'
    })
    project: ProjectEntity;
}
