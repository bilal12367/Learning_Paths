import { IsDate, isDate, IsEmail, IsStrongPassword } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ unique: true })
  @IsEmail()
  @Column()
  email: string;

  @Column()
  @IsStrongPassword()
  password: string;

  @Column({type: 'date'})
  @IsDate()
  dob: Date;

  @Column({ default: true })
  isActive: boolean;
}
