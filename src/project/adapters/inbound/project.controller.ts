import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectDto } from 'src/project/dto/createProject.dto';
import { ProjectService } from 'src/project/application/project.service';
import { ProjectEntity } from 'src/project/entities/project.entity';

    @Controller('project')
    export class ProjectController {
        constructor(private readonly projectService: ProjectService) {

        }

        @Post()
        createClient(@Body() createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
            return this.projectService.createProject(createProjectDto);
        }

        @Get(":id")
        getTaskInformation(@Param('id') id: string): Promise<ProjectEntity> {
            return this.projectService.getTaskInformation(id);
        }
    }
