import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors } from '@nestjs/common';
import { ServersService } from './servers.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { Request } from 'express';
import { TestLogger } from 'src/config/logger.config';
import { TransactionInterceptor } from 'src/interceptors/transaction.interceptor';

@Controller('api/servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) { }

  @Post()
  @UseInterceptors(TransactionInterceptor)
  async createServer(@Req() req: Request): Promise<any> {
    const user = (req as any).user.id;
    const server = await this.serversService
        .createServer({ 
          creator: user, 
          server_logo: req.body.server_logo, 
          server_name: req.body.server_name 
        } as CreateServerDto)
    
    const createdServer = await this.serversService.getServerById(server.id)
    return createdServer;
  }

  
}
