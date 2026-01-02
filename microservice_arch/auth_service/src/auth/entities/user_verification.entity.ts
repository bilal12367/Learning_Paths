import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('user_verification')
export class UserVerification {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    userId: string;

    @Column({ unique: true })
    email: string;

    @Column()
    token: string;

    @Column({ type: 'enum', enum: ['pending', 'completed', 'uninitialized'], default: 'uninitialized' })
    verification_status: 'pending' | 'completed' | 'uninitialized';

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    verifiedAt: Date;
}