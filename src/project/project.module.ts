import { ProjectController } from './adapters/inbound/project.controller';
import { ProjectEntity } from './entities/project.entity';
import { ProjectService } from './application/project.service';
import { Module, forwardRef  } from '@nestjs/common';
import { OpenAIService } from '../tasks/adapters/outbound/openai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from 'src/tasks/task.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), forwardRef(() => TaskModule), ClientModule],
  controllers: [ProjectController],
  providers: [ProjectService, OpenAIService],
  exports: [ProjectService, TypeOrmModule]
})
export class ProjectModule {}
