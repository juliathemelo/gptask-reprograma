import { IsNotEmpty, IsString } from 'class-validator';
import { PriorityType } from '../entities/priority.type';
import { ProjectEntity } from 'src/project/entities/project.entity';

export class UpdateTaskDto {
    
    title: string;

    resume: string;

    @IsString()
    status: string;

    priority: PriorityType;
}
