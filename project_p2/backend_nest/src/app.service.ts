import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './api/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  getHello(): string {
    return 'Hello World!';
  }

  async saveuser(user: User): Promise<User> {
    const savedUser: User = await this.userRepository.save(user);
    if (!await this.userRepository.exists({ where: { id: savedUser.id } })) {
      throw new HttpException("User Did not saved !!", HttpStatus.INTERNAL_SERVER_ERROR);
    } 
    return savedUser;
  }
}
