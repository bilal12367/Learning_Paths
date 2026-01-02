import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Table } from "typeorm";

@Entity('user_association')
class UserAssociation {

    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(() => User, user => user.id)
    userId: User;

    @Column()
    associationId: string;
}
