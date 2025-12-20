import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('permissions')
export class Permission {
    
    @PrimaryGeneratedColumn()
    id: number;

    
    @Column()
    association_id?: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;
}

