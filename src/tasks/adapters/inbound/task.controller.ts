import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/createTask.dto';
import { TaskService } from 'src/tasks/application/task.service';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { UpdateTaskDto } from 'src/tasks/dto/updateTask.dto';


    @Controller('tasks')
    export class TaskController {
        constructor(private readonly taskService: TaskService) {

        }

        @Post()
        createClient(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
            return this.taskService.createTask(createTaskDto);
        }

        @Patch(":id")
        updateTaskInformation(@Param('id') id: string,@Body() updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
            return this.taskService.updateTaskInformation(id, updateTaskDto);
        }

        @Delete(":id")
        deleteTask(@Param('id') id: string): Promise<void> {
            return this.taskService.deleteTask(id);
        }

        @Delete("all/:id")
        deleteAllTask(@Param('id') id: string): Promise<void> {
            return this.taskService.deleteAllTasks(id);
        }
    }