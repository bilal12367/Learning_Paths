import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/api/users/users.service';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { IUserToken } from './auth.types';
import { LoginUserDto } from './dto/login.dto';



@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) { }

  async registerUser(createUserDto: CreateUserDto): Promise<IUserToken> {
    const regUser = await this.userService.create(createUserDto);
    const token = this.jwtService.generateToken({ id: regUser.id.toString() })
    return { email: regUser.email, isActive: regUser.isActive, token }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findOne(loginUserDto.email);
    
  }
}
