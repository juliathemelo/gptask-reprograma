import { ProjectController } from './adapters/inbound/project.controller';
import { ProjectEntity } from './entities/project.entity';
import { ProjectService } from './application/project.service';
import { Module } from '@nestjs/common';
import { OpenAIService } from '../tasks/adapters/outbound/openai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from 'src/tasks/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), TaskModule],
  controllers: [ProjectController],
  providers: [ProjectService, OpenAIService],
  exports: [ProjectService]
})
export class ProjectModule {}
