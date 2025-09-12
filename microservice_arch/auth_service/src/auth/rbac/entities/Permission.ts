import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('permissions')
export class Permission {
    
    @PrimaryGeneratedColumn("identity")
    id: number;

    @Column()
    serverId: string;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;
}

