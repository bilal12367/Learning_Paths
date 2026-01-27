import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { Permission } from "./Permission";


@Entity('role_permissions')
export class RolePermission { 

    @PrimaryGeneratedColumn("uuid")
    id: number;

    // @OneToOne(() => Role)
    // @JoinColumn({name: 'roleId', referencedColumnName: 'id'})
    // role: Role;
    @Column()
    roleId: string;

    @Column()
    permissionId: string;

    @Column()
    association_id: string;

    @OneToMany(() => Permission, permission => permission.id)
    permissions: Permission[];

    
}