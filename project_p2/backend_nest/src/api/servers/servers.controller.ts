import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ServersService } from './servers.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { Request } from 'express';
import { TestLogger } from 'src/config/logger.config';

@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Post()
  async createServer(@Req() req: Request): Promise<any> {
    const user = (req as any).user;
    req.body as CreateServerDto
    console.log(req.body)
    this.serversService.createServer(req.body as CreateServerDto)
  }
}
