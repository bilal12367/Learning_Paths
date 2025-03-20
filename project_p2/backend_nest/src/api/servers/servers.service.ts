import { Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';

interface IServersService {
  createServer(serverName: string, image: string | null): Promise<any>
}

@Injectable()
export class ServersService  {
 
  
}
