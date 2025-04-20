import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
import { RoleAssignment } from './entities/role.assignment.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>,
        @InjectRepository(RoleAssignment) private readonly roleAssignment: Repository<RoleAssignment>
    ) { }


    async createDefaultRoles(serverId: string, userId: string) {
        await this.roleRepository.insert([
            {
                name: 'USER',
                description: 'Basic User',
                server: serverId
            },
            {
                name: 'ADMIN',
                description: 'Admin',
                server: serverId
            },
            {
                name: 'ROOT',
                description: 'Root has all permissions!!',
                server: serverId
            },
        ])

        const rootRole = await this.roleRepository.findOne({
            where: {
                name: 'ROOT',
                server: serverId
            }
        })

        await this.roleAssignment.save({
            role: rootRole.id,
            user: userId,
            server: serverId
        })
        return 
    }

    async getAllRolesOfServer(serverId: string) {
        return await this.roleRepository.find({ where: { server: serverId } })
    }
}
