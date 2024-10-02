import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientEntity } from './client/entities/client.entity';
import { ClientModule } from './client/client.module';
import { Module } from '@nestjs/common';
import { ProjectEntity } from './project/entities/project.entity';
import { ProjectModule } from './project/project.module';
import { TaskEntity } from './tasks/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './tasks/task.module';

dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.SUPABASE_DB_HOST,
      port: parseInt(process.env.SUPABASE_DB_PORT, 10),
      username: process.env.SUPABASE_DB_USER,
      password: process.env.SUPABASE_DB_PASSWORD,
      database: process.env.SUPABASE_DB_NAME,
      entities: [ClientEntity, ProjectEntity, TaskEntity],
      synchronize: true,
      logging: true,
    }), ClientModule, ProjectModule, TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
