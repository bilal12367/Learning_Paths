
import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Generated("uuid")
    id: String;

    @Column({ name: "name" })
    name: String;

    @Column({ name: "age", type: "int" })
    age: Number;

    @Column({ name: "email", unique: true })
    email: String;

    @Column({ name: "pwd" })
    password: String;

    @Column({ name: "gender", type: 'char' })
    gender: String;

}