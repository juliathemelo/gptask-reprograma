import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectDto } from 'src/project/dto/createProject.dto';
import { ProjectService } from 'src/project/application/project.service';
import { ProjectEntity } from 'src/project/entities/project.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {

    }


    @ApiOperation({ summary: 'Criação de um projeto a partir de um cliente' })
    @Post(":id")
    createClient(@Param('clientId') clientId: string, @Body() createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        return this.projectService.createProject(clientId, createProjectDto);
    }

    @ApiOperation({ summary: 'Consulta do projeto' })
    @Get(":id")
    getTaskInformation(@Param('id') id: string): Promise<ProjectEntity> {
        return this.projectService.getTaskInformation(id);
    }

    @ApiOperation({ summary: 'Deletar um projeto' })
    @Delete(":id")
    deleteProject(@Param('id') id: string): Promise<void> {
        return this.projectService.deleteProject(id);
    }
}
