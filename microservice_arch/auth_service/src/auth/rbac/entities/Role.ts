import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("roles")
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    association_id?: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;
}