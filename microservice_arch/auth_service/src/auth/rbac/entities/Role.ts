import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("roles")
export class Role {

    @PrimaryGeneratedColumn("identity")
    id: number;

    @Column()
    serverId: string;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;
}