import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { User } from "../../entities/user.entity";



@Entity('user_roles')
export class UserRole {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // @OneToMany(() => Role, role => role.id)
    // roles: Role[];

    @Column()
    userId: string;

    @Column()
    roleId: string;

    @Column()
    association_id: string;

    @OneToOne(() => User)
    @JoinColumn({name: 'userId', referencedColumnName: 'id'})
    user: User;
}