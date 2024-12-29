import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/api/users/users.service';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { IUserToken } from './auth.types';
import { LoginUserDto } from './dto/login.dto';
import { genSalt, hash, compare } from 'bcryptjs'
import { PasswordMismatchException, UserAlreadyExistsException, UserNotFoundException } from 'src/exceptions/auth_exceptions/auth.exceptions';
import { RegisterUserDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) { }

  async registerUser(createUserDto: RegisterUserDto): Promise<IUserToken> {
    if (await this.userService.exists(createUserDto.email)) {
      throw new UserAlreadyExistsException()
    }
    console.log(createUserDto)
    createUserDto.password = await this.hashPassword(createUserDto.password)
    const regUser = await this.userService.create(createUserDto);
    const token = this.jwtService.generateToken({ id: regUser.id.toString() })
    return { email: regUser.email, isActive: regUser.isActive, token }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<IUserToken> {
    const user = await this.userService.findOne(loginUserDto.email);
    if (!user) {
      throw new UserNotFoundException();
    }
    await this.comparePassword(user.password, loginUserDto.password)
    const token = this.jwtService.generateToken({ id: user.id.toString() });
    return { email: loginUserDto.email, token, isActive: user.isActive }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(7)
    const hashPassword = await hash(password, salt);
    return hashPassword;
  }

  async comparePassword(hashedPassword: string, password: string): Promise<boolean> {
    if (!await compare(password, hashedPassword)) {
      throw new PasswordMismatchException()
    }
    return true;
  }
}
