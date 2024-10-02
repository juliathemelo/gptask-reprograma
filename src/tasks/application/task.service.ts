import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/createTask.dto';
import { ProjectService } from 'src/project/application/project.service';
import { UpdateTaskDto } from '../dto/updateTask.dto';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) {}

    async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {

        const newTask = this.taskRepository.create(createTaskDto);
        await this.taskRepository.save(createTaskDto);

        return newTask;
    }

    async updateTaskInformation(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
        const task = await this.taskRepository.findOne({ where: { id } });
        
        if (!task) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        if (updateTaskDto.title !== undefined) {
            task.title = updateTaskDto.title;
        }
    
        if (updateTaskDto.resume !== undefined) {
            task.resume = updateTaskDto.resume;
        }
    
        if (updateTaskDto.status !== undefined) {
            task.status = updateTaskDto.status;
        }
    
        if (updateTaskDto.priority !== undefined) {
            task.priority = updateTaskDto.priority;
        }
    
        await this.taskRepository.save(task);
    
        return task;
    }

    async deleteTask(id: string): Promise<void> {
        const task = await this.taskRepository.findOne({ where: { id } });
        await this.taskRepository.remove(task)
    }

    async deleteAllTasks(projectId: string): Promise<void> {
        const tasks = await this.taskRepository.find({ where: { project: { id: projectId } } });

        if (tasks.length === 0) {
            throw new NotFoundException(`No tasks found for project with ID ${projectId}`);
        }

        await this.taskRepository.remove(tasks)
    }
}