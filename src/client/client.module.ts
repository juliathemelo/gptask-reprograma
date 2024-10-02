import { ClientController } from './adapters/inbound/cliente.controller';
import { ClientEntity } from './entities/client.entity';
import { ClientService } from './application/client.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService, TypeOrmModule]
})
export class ClientModule {}
