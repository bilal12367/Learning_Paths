import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


/**
 * This table decides which association (channel, resource, action) should have access over role.
 */
@Entity('role_association')
export class RoleAssociation {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    association_id: string; // Server/Channel/Resource/Action etc.

    @Column()
    role_id: string; // Which roles have accoss over what resources etc.

}