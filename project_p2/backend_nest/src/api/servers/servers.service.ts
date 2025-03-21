import { Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Server } from './entities/server.entity';
import { Repository } from 'typeorm';

interface IServersService {
  createServer(createServerDto: CreateServerDto): Promise<any>
}

@Injectable()
export class ServersService implements IServersService {

  constructor(@InjectRepository(Server) private readonly serverRepository: Repository<Server>) { }

  async createServer(createServerDto: CreateServerDto): Promise<any> {
    console.log("Hello")
    return await this.serverRepository.save({
      creator: 'test',
      image: 'testimg',
      server_name: "Test Server Name",
    })
  }



}
