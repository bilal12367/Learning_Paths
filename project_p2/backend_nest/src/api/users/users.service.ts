import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InvalidTokenException, TokenNotFoundException, UserNotFoundException } from 'src/exceptions/auth_exceptions/auth.exceptions';
import { RegisterUserDto } from '../auth/dto/register.dto';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly jwtService: JwtService) { }

  async create(createUserDto: RegisterUserDto): Promise<CreateUserDto> {
    const user = await this.userRepository.save({ ...createUserDto, userName: createUserDto.username });
    return CreateUserDto
      .build()
      .setId(user.id)
      .setUserName(user.username)
      .setEmail(user.email)
      .setPassword(user.password)
      .setIsActive(user.isActive);
  }

  async verifyUser(cookies: any): Promise<User> {
    if (!cookies.token) {
    throw new TokenNotFoundException()
    }
    const { id } = this.jwtService.verifyToken(cookies.token)
    if (!await this.userRepository.exists({ where: { id: parseInt(id) } })) {
      throw new InvalidTokenException()
    }
    return await this.userRepository.findOne({ where: { id: parseInt(id) } })
  }

  async exists(email: string): Promise<boolean> {
    return await this.userRepository.exists({ where: { email } })
  }

  async existsById(userId: string): Promise<boolean> {
    return await this.userRepository.exists({ where: { id: parseInt(userId) } })
  }

  async findAll() {
    return await this.userRepository.find({});
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } })
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
