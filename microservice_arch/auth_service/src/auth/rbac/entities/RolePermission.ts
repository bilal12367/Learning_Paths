import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { Permission } from "./Permission";


@Entity('role_permissions')
export class RolePermission { 

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => Role)
    @JoinColumn({name: 'roleId', referencedColumnName: 'id'})
    role: Role;

    @OneToMany(() => Permission, permission => permission.id)
    permissions: Permission[];

    
}