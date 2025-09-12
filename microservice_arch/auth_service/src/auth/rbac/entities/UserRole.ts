import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { User } from "src/auth/entities/user.entity";



@Entity('user_roles')
export class UserRole {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(() => Role, role => role.id)
    roles: Role[];

    @OneToOne(() => User)
    @JoinColumn({name: 'userId', referencedColumnName: 'id'})
    user: User;
}