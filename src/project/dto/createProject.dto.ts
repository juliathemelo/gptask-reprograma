import { IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTaskDto } from 'src/tasks/dto/createTask.dto';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { ClientEntity } from 'src/client/entities/client.entity';

export class CreateProjectDto {
    @IsNotEmpty()
    id: string;

    owner: ClientEntity;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNumber()
    colaborators: number;
 // Usa class-transformer para converter o objeto
    tasks?: TaskEntity[];
}
