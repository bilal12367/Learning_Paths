import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserVerification } from './entities/user_verification.entity';
import { KafkaService } from 'src/kafka/kafka.service';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserVerification) private readonly userVerificationRepository: Repository<UserVerification>,
    private readonly jwtService: JwtService, 
    private readonly kafkaService: KafkaService
  ) {}

  async registerUser(user: { email: string, password: string, username: string}) {
    // Create a user instance and save it to the database
    let { email, password, username } = user;
    if (!email || !password || !username) {
      throw new HttpException('Email, password, and username are required', HttpStatus.BAD_REQUEST);
    }
    if (password.length < 6) {
      throw new HttpException('Password must be at least 6 characters long', HttpStatus.BAD_REQUEST);
    }
    user.password = await bcrypt.hash(password, 10);
    
    const newUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);
    
    // const savedUser: any = user;
    savedUser.id = Math.floor(Math.random() * 10000); // Simulating an ID for the example
    
    const token = await this.generateToken(savedUser);
    this.kafkaService.sendEvent('user-created', {
      userId: savedUser.id.toString(),
      username: savedUser.username,
      time: new Date().toISOString()
    })
    return { username: savedUser.username, email: savedUser.email, token };
  }

  async loginUser(user: {email: string, password: string}) {
    const { email, password } = user;
    if (!email || !password) {
      throw new HttpException('Email and password are required', HttpStatus.BAD_REQUEST);
    }
    
    const foundUser = await this.userRepository.findOne({ where: { email } });
    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    const token = await this.generateToken(foundUser);
    this.kafkaService.sendEvent('user-logged-in', {
      userId: foundUser.id.toString(),
      username: foundUser.username,
      time: new Date().toISOString()
    })
    return { username: foundUser.username, email: foundUser.email, token };
  }

  async generateToken(user: User) {
    console.log("JWT Secret: ", process.env.JWT_SECRET);
    return this.jwtService.sign({ id: user.id, username: user.username, email: user.email }, {
      secret: process.env.JWT_SECRET, // Use an environment variable in production
      expiresIn: '1h', // Token expiry time
    });
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
  async userVerification(token: string) {
    try {
      const decoded = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      const user = await this.userRepository.findOne({ where: { id: decoded.id } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }
      return await this.userVerificationRepository.save({userId: decoded.id, email: decoded.email, token, verification_status: 'pending', createdAt: new Date()});
    } catch (error) {
      throw new HttpException('Verification failed: ' + error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async getUserVerificationData(userId: string) {
    const verification = await this.userVerificationRepository.findOne({ where: { userId } });
    if (!verification) {
      throw new HttpException('User verification details not found!!', HttpStatus.UNAUTHORIZED);
    }
    return verification;
  }

}
