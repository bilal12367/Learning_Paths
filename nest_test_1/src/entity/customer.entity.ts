import { Column, Entity, ObjectId, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Customer {

    @ObjectIdColumn()
    id: ObjectId;

    @Column({name: 'first_name'})
    firstName: string

    @Column({name: 'last_name'})
    lastName: string

    @Column()
    email: string

    @Column()
    password: string
}