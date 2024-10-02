import { TaskEntity } from './entities/task.entity';
import { TaskController } from './adapters/inbound/task.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from 'src/tasks/application/task.service';
import { ProjectService } from 'src/project/application/project.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
