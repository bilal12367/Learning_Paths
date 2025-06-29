import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { RoleEntity } from './role.entity';
import { Server } from 'src/api/servers/entities/server.entity';
import { User } from 'src/api/users/entities/user.entity';


@Entity('role_assignments')
export class RoleAssignment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => RoleEntity)
    @Column()
    role: string;

    @ManyToOne(() => Server)
    @Column({ name: 'server_id' })
    server: string;

    @ManyToOne(() => User)
    @Column({ name: 'user_id' })
    user: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}