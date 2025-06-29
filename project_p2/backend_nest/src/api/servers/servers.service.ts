import { Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Server } from './entities/server.entity';
import { In, Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';

interface IServersService {
  createServer(createServerDto: CreateServerDto): Promise<any>
}

@Injectable()
export class ServersService implements IServersService {

  constructor(
    @InjectRepository(Server) private readonly serverRepository: Repository<Server>,
    private readonly roleService: RolesService
  ) { }

  async createServer(createServerDto: CreateServerDto): Promise<any> {
    const obj = {
      server_name: createServerDto.server_name,
      image: createServerDto.server_logo,
      creator: createServerDto.creator,
    }

    const createdServer = await this.serverRepository.save(obj)
    await this.roleService.createDefaultRoles(createdServer.id, obj.creator)
    return createdServer
  }

  async getServerById(serverId: string) {
    const server = await this.serverRepository.findOne({ where: { id: serverId },relations: ['image'] })
    const roles = await this.roleService.getAllRolesOfServer(serverId)
    return { ...server, roles }
  }


  async getUserJoinedServers(userId: string) {
    const rolesOfUser = await this.roleService.getUserJoinedServers(userId);
    return rolesOfUser
  }
}
