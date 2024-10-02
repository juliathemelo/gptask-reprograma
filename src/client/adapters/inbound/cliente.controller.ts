import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientEntity } from 'src/client/entities/client.entity';
import { ClientService } from 'src/client/application/client.service';
import { CreateClientDto } from 'src/client/dto/createClient.dto';

    @Controller('client')
    export class ClientController {
        constructor(private readonly clientService: ClientService) {

        }

        @Post()
        createClient(@Body() createClientDto: CreateClientDto): Promise<ClientEntity> {
            return this.clientService.createClient(createClientDto);
        }

        @Get(":id")
        getInformationClient(@Param('id') id: string): Promise<ClientEntity> {
            return this.clientService.getClientInformation(id);
        }
    }
