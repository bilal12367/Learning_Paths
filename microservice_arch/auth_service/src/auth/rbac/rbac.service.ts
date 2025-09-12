import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/Role';
import { Repository } from 'typeorm';
import { Permission } from './entities/Permission';
import { RolePermission } from './entities/RolePermission';
import { UserRole } from './entities/UserRole';

@Injectable()
export class RbacService {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
        @InjectRepository(RolePermission) private readonly rolePermissionRepo: Repository<RolePermission>,
        @InjectRepository(UserRole) private readonly userRoleRepo: Repository<UserRole>
    ) {}

    async createDefaultRolesAndPermissions() {
        const permissions: string[] = ['VIEW_DASHBOARD', 'EDIT_PROFILE', 'CREATE_SERVER', 'SEARCH_SEREVER', 'REQUEST_SERVER']
        
        await this.permissionRepository.save(
            permissions.map(name => {
                const permission = new Permission();
                permission.name = name;
                return permission;
            })
        );

        const roles: string[] = ['USER', 'ADMIN', 'ROOT'];
        await this.roleRepository.save(
            roles.map(name => {
                const role = new Role();
                role.name = name;
                return role;
            })
        );
        
    }
    
}
