import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';



@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}