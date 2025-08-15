import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { KafkaService } from 'src/kafka/kafka.service';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService, 
    private readonly kafkaService: KafkaService
  ) {}

  async registerUser(user: { email: string, password: string, username: string}) {
    // Create a user instance and save it to the database
    let { email, password, username } = user;
    if (!email || !password || !username) {
      throw new Error('Email, password, and username are required');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    user.password = await bcrypt.hash(password, 10);
    
    const newUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);
    const token = await this.generateToken(savedUser);
    this.kafkaService.sendUserCreatedEvent('user-created', {
      userId: savedUser.id.toString(),
      username: savedUser.username,
      time: new Date().toISOString()
    })
    return { username: savedUser.username, email: savedUser.email, token };
  }

  async loginUser(user: {email: string, password: string}) {
    const { email, password } = user;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    const foundUser = await this.userRepository.findOne({ where: { email } });
    if (!foundUser) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const token = await this.generateToken(foundUser);
    this.kafkaService.sendUserLoggedEvent('user-logged-in', {
      userId: foundUser.id.toString(),
      username: foundUser.username,
      time: new Date().toISOString()
    })
    return { username: foundUser.username, email: foundUser.email, token };
  }

  async generateToken(user: User) {
    return this.jwtService.sign({ id: user.id, username: user.username, email: user.email }, {
      secret: 'your_secret_key', // Use an environment variable in production
      expiresIn: '1h', // Token expiry time
    });
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: 'your_secret_key' });
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
