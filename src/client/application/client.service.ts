import { ClientEntity } from '../entities/client.entity';
import { CreateClientDto } from '../dto/createClient.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ClientService {

    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>
    ) {}

    async createClient(createClientDto: CreateClientDto): Promise<ClientEntity> {
        const newCustomer = this.clientRepository.create(createClientDto);
        await this.clientRepository.save(newCustomer);

        return newCustomer;
    }

    async getClientInformation(id: string): Promise<ClientEntity> {
        const customer = await this.clientRepository.findOne({ where: { id } });
        
        if (!customer) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }

        return customer;
    }
}