import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/Role';
import { DeleteResult, In, Repository } from 'typeorm';
import { Permission } from './entities/Permission';
import { RolePermission } from './entities/RolePermission';
import { UserRole } from './entities/UserRole';
import { User } from '../entities/user.entity';

enum RoleEnum {
    USER = 'USER',
    ADMIN = 'ADMIN',
    ROOT = 'ROOT'
}

enum PermissionEnum {
    GENERAL_ACCESS = 'GENERAL_ACCESS',
    MANAGE_USERS = 'MANAGE_USERS',
    MANAGE_ROLES = 'MANAGE_ROLES',
    MANAGE_PERMISSIONS = 'MANAGE_PERMISSIONS'
}

@Injectable()
export class RbacService {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
        @InjectRepository(RolePermission) private readonly rolePermissionRepo: Repository<RolePermission>,
        @InjectRepository(UserRole) private readonly userRoleRepo: Repository<UserRole>,
    ) { }

    async createDefaultRolesAndPermissions() {
        const permissions: PermissionEnum[] = Object.values(PermissionEnum);

        const saved_permissions = await this.permissionRepository.save(
            permissions.map(name => {
                const permission = new Permission();
                permission.name = name;
                return permission;
            })
        );

        const roles: RoleEnum[] = Object.values(RoleEnum);
        const saved_roles = await this.roleRepository.save(
            roles.map(name => {
                const role = new Role();
                role.name = name;
                return role;
            })
        );
        const general_role_permissions = []

        for (const role of saved_roles) {
            if (role.name === RoleEnum.USER) {
                const perms = saved_permissions.filter((perm) => [PermissionEnum.GENERAL_ACCESS.valueOf()].includes(perm.name))
                general_role_permissions[RoleEnum.USER.valueOf()] = perms
            } else if (role.name === RoleEnum.ADMIN) {
                const perms = saved_permissions.filter((perm) => [PermissionEnum.GENERAL_ACCESS.valueOf(), PermissionEnum.MANAGE_USERS.valueOf()].includes(perm.name))
                general_role_permissions[RoleEnum.ADMIN.valueOf()] = perms
            } else if (role.name === RoleEnum.ROOT) {
                general_role_permissions[RoleEnum.ADMIN.valueOf()] = saved_permissions
            }

        }

        for (const rolePerm of general_role_permissions.entries()) {

        }
        await this.rolePermissionRepo.save(
            [
                {
                    serverId: 'global',
                }
            ]
        )

    }

    async assignGeneralAccessToUser(userId: string) {
        const general_user_role = await this.roleRepository.findOne({ where: { name: RoleEnum.USER }, select: { id: true } });

        if (general_user_role) {
            await this.userRoleRepo.create({
                roleId: general_user_role.id.toString(),
                userId: userId
            })
            return true
        } else {
            throw new HttpException("General Role Does not exists!!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    /* 

    */
    async checkAccess(userId: string, permissionId: string, permissionName: string, serverId: string) {
        const perm = await this.permissionRepository.findOne({ where: permissionId != null ? { id: parseInt(permissionId) } : { name: permissionName } })
        if (perm == null) {
            throw new HttpException('Permission Not Found!!', HttpStatus.NOT_FOUND)
        }
        const role_perm = await this.rolePermissionRepo.findOne({ where: { permissionId: perm.id.toString() }, select: { roleId: true } })
        if (role_perm == null) {
            throw new HttpException('Role Not Found!!', HttpStatus.NOT_FOUND)
        }
        const userRole = await this.userRoleRepo.findOne({ where: { roleId: role_perm.roleId, userId: userId } })
        if (userRole == null) {
            throw new HttpException("User doesn't have access!!", HttpStatus.UNAUTHORIZED)
        }
        return true
    }

    async removeAllAccessToUser(userId: string) {
        const rolesAssigned = await this.userRoleRepo.find({ where: { userId: userId }, select: { id: true } })
        if (rolesAssigned.length > 0) {
            const deleteResults: DeleteResult = await this.userRoleRepo.delete({ id: In([rolesAssigned.map((role) => role.id)]) })
            if (deleteResults.affected != rolesAssigned.length) {
                throw new HttpException("Some of roles, of user couldn't be deleted!!", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
        return true
    }

    async assignRole(userId: string, roleId: string) {
        const roleExists = await this.roleRepository.exists({ where: { id: parseInt(roleId) } })
        if(!roleExists) {
            throw new HttpException("Role doesn't exists!!", HttpStatus.NOT_FOUND)
        }
        await this.userRoleRepo.create({
            roleId: roleId,
            userId: userId
        })
        return true
    }
}
