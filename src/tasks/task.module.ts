import { TaskEntity } from './entities/task.entity';
import { TaskController } from './adapters/inbound/task.controller';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from 'src/tasks/application/task.service';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), forwardRef(() => ProjectModule)],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService, TypeOrmModule]
})
export class TaskModule {}
