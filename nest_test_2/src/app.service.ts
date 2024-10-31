import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './modules/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }
  getHello(): string {
    return 'Hello World!';
  }

  async registerUser(body: RegisterBody): Promise<User> {
    return await this.userRepository.save(body)
  }
}
