import { FileEntity } from "src/api/file/entities/file.entity";
import { User } from "src/api/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'servers'})
export class Server {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: string;

    @Column()
    server_name: string;

    @OneToOne(() => FileEntity, { eager: true })
    @JoinColumn()
    image: string;

    @Column()
    @ManyToOne(() => User)
    creator: string
}
