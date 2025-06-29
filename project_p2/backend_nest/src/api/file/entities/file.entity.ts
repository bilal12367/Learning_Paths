import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'file'})
export class FileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    filename: string;

    @Column()
    mimetype: string;

    @Column()
    originalname: string;

    @Column()
    encoding: string;

    @Column()
    destination: string;

    @Column()
    size: number;

    @Column()
    path: string;
}