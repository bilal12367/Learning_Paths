import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'servers'})
export class Server {

    @PrimaryGeneratedColumn({type:"bigint"})
    @Column({unique: true})
    id: string;

    @Column()
    server_name: string;


}
