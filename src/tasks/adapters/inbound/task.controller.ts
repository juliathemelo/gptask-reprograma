import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/createTask.dto';
import { TaskService } from 'src/tasks/application/task.service';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { UpdateTaskDto } from 'src/tasks/dto/updateTask.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {

    }

    @ApiOperation({ summary: 'Criação de uma task' })
    @Post(":projectId")
    createClient(@Param('projectId') projectId: string, @Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        return this.taskService.createIndividualTask(projectId, createTaskDto);
    }

    @ApiOperation({ summary: 'Atualização da task manualmente caso necessario' })
    @Patch(":id")
    updateTaskInformation(@Param('id') id: string,@Body() updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
        return this.taskService.updateTaskInformation(id, updateTaskDto);
    }

    @ApiOperation({ summary: 'operação de deletar uma task' })
    @Delete(":id")
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.taskService.deleteTask(id);
    }

    @ApiOperation({ summary: 'operação de deletar todas as tasks' })
    @Delete("all/:id")
    deleteAllTask(@Param('id') id: string): Promise<void> {
        return this.taskService.deleteAllTasks(id);
    }
}