import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { UserOtp } from "./user_otp.entity";
import { SentMessageInfo } from "nodemailer";
import { User } from "src/api/users/entities/user.entity";


@Entity({ name: 'user_email_verification' })
export class UserEmailVerification {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({unique: true})
    @ManyToOne(type => User)
    @JoinColumn()
    userId: number;

    @Column()
    emailVerified: boolean;

    @ManyToOne(type => UserOtp)
    @JoinColumn()
    otpId: number;

    @Column()
    emailInfo: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}