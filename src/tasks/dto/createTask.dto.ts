import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PriorityType } from '../entities/priority.type';
import { ProjectEntity } from 'src/project/entities/project.entity';

export class CreateTaskDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    title: string;

    resume: string;

    @IsString()
    status: string;

    priority: PriorityType;

    project: ProjectEntity;
}
