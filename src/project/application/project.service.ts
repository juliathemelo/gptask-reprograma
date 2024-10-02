import { CreateProjectDto } from '../dto/createProject.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenAIService } from '../../tasks/adapters/outbound/openai.service';
import { TaskService } from 'src/tasks/application/task.service';
import { CreateTaskDto } from 'src/tasks/dto/createTask.dto';
import { ProjectEntity } from '../entities/project.entity';
import { PriorityType } from 'src/tasks/entities/priority.type';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository(ProjectEntity)
        private readonly projectRepository: Repository<ProjectEntity>,
        private readonly taskService: TaskService,
        private readonly openAiService: OpenAIService
    ) {}

    async createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {

        const prompt = `Como Product Owner de uma empresa renomada, sua experiência é fundamental para ajudar o cliente a desestruturar uma tarefa do projeto dele baseado na metodologia SCRUM. Está é a tarefa ${createProjectDto.name}
        e ele precisa criar dividir ela em subtarefas.
        Com base na breve descrição da tarefa: "${createProjectDto.description}", você pode detalhar as subtarefas necessárias para que alcance seus objetivos, lembre-se de detalhar o máximo possível as tarefas. Essas tarefas serão transformadas em cards que serão utilizados na metodologia SCRUM, sendo todos eles iniciados no backlog.
        O cliente, gostaria de receber uma estrutura de saída similar a essas tasks, o numero de colaboradores atuais são: ${createProjectDto.colaborators} você deverá criar as subtasks nesse formato json, rigorosamente com esses nomes e seguindo esse formato de exemplo:
        [{
            "title": "<Aqui inserir o título>",
            "resume": "<Aqui a descrição detalhada da tarefa>",
            "status": "<status da tarefa, como ta sendo criada pode deixar em backlog>",
            "priority": "<aqui o grau de prioridade>"
        },
        {

            "title": "<Aqui inserir o título>",
            "resume": "<Aqui a descrição detalhada da tarefa>",
            "status": "<status da tarefa, como ta sendo criada pode deixar em backlog>",
            "priority": "<aqui o grau de prioridade (só pode ser alta, media ou baixa)>"
        }] limite de 6 tasks no máximo`

        const aiResponse = await this.openAiService.generateResponse(prompt);

        const newProject = this.projectRepository.create(createProjectDto);
        await this.projectRepository.save(newProject);

        const jsonMatch = aiResponse.match(/(\[.*\]|\{.*\})/s);

        if (jsonMatch) {
            const jsonString = jsonMatch[1]; 
            const parsedJson = JSON.parse(jsonString);
            await Promise.all(parsedJson.map(async (item: {title: string, resume: string, status: string, priority: PriorityType }) => {
                const createTaskDto: CreateTaskDto = {
                    id: randomUUID(),
                    title: item.title,
                    resume: item.resume,
                    status: item.status,
                    priority: item.priority,
                    project: newProject
                };

                await this.taskService.createTask(createTaskDto);
            }));
      
        } else {
            throw new NotFoundException(`Json error`);
        }

        return newProject;
    }

    async getTaskInformation(id: string): Promise<ProjectEntity> {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['tasks'], // Isso carrega as tarefas relacionadas
        });

        return project;
    }
}