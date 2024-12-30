import { User } from "src/api/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity({ name: "user_otps" })
export class UserOtp {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ManyToOne(() => User, (user) => user.id)
    user_Id: number;

    @Column()
    otp: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}