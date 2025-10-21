import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/Role';
import { DeleteResult, In, Repository } from 'typeorm';
import { Permission } from './entities/Permission';
import { RolePermission } from './entities/RolePermission';
import { UserRole } from './entities/UserRole';
import { User } from '../entities/user.entity';
import { InsertResult } from 'typeorm/browser';

enum RoleEnum {
    USER = 'USER',
    ADMIN = 'ADMIN',
    ROOT = 'ROOT'
}

enum PermissionEnum {
    GENERAL_ACCESS = 'GENERAL_ACCESS',
    MANAGE_USERS = 'MANAGE_USERS',
    MANAGE_ADMINS = 'MANAGE_ADMINS',
    MANAGE_ROLES = 'MANAGE_ROLES',
    MANAGE_PERMISSIONS = 'MANAGE_PERMISSIONS'
}

const role_perm_map = {
    "USER": [PermissionEnum.GENERAL_ACCESS.valueOf()],
    "ADMIN": [PermissionEnum.GENERAL_ACCESS.valueOf(), PermissionEnum.MANAGE_USERS.valueOf(), PermissionEnum.MANAGE_ROLES.valueOf()],
    "ROOT": [PermissionEnum.GENERAL_ACCESS.valueOf(), PermissionEnum.MANAGE_USERS.valueOf(), PermissionEnum.MANAGE_ROLES.valueOf(), PermissionEnum.MANAGE_PERMISSIONS.valueOf()],
}

@Injectable()
export class RbacService {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
        @InjectRepository(RolePermission) private readonly rolePermissionRepo: Repository<RolePermission>,
        @InjectRepository(UserRole) private readonly userRoleRepo: Repository<UserRole>,
    ) { }


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
    async checkAccess(userId: string, permissionId: string, permissionName: string, association_id: string) {
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

    async assignRole(userId: string, roleId: string, association_id: string) {
        const roleExists = await this.roleRepository.exists({ where: { id: parseInt(roleId) } })
        if (!roleExists) {
            throw new HttpException("Role doesn't exists!!", HttpStatus.NOT_FOUND)
        }
        await this.userRoleRepo.create({
            roleId: roleId,
            userId: userId,
            association_id
        })
        return true
    }

    // async assignPermissionsToRole(roleId: string, permissionIds: string[], serverId: string): Promise<RolePermission[]> {
    //     const roleExists = await this.rolePermissionRepo.exists({ where: { id: roleId } })
    //     if (!roleExists) {
    //         throw new HttpException("Role doesn't exists!!", HttpStatus.NOT_FOUND)
    //     }
    //     var permissionsEntities: Permission[] = await this.permissionRepository.find({
    //         select: { id: true },
    //         where: { id: In(permissionIds) }
    //     })
    //     const permissionsToInsertForRole: IRolePermission[] = []

    //     permissionsEntities.forEach((perm: Permission) => {
    //         permissionsToInsertForRole.push({
    //             permissionId: perm.id.toString(),
    //             roleId: roleId,
    //             serverId: serverId
    //         })
    //     })

    //     await this.rolePermissionRepo.insert(permissionsToInsertForRole)

    //     const permissionsCurrentRoleHas = await this.rolePermissionRepo.find({
    //         where: {
    //             association_id: serverId,
    //             roleId: roleId
    //         }
    //     })

    //     return permissionsCurrentRoleHas
    // }

    async assignInitialRBACToAssociation(association_id: string) {
        const distinctPermissions: { permissions_name: string }[] = await this.permissionRepository
            .createQueryBuilder("permissions")
            .select("permissions.name")
            .distinct(true)
            .getRawMany()
        const distinctRoles: { roles_name: string }[] = await this.roleRepository
            .createQueryBuilder("roles")
            .select("roles.name")
            .distinct(true)
            .getRawMany()

        const permissionsToInsert: any[] = []
        const rolesToInsert: any[] = []
        for (const perm of distinctPermissions) {
            permissionsToInsert.push({
                name: perm.permissions_name,
                association_id,
                description: perm.permissions_name
            })
        }
        for (const role of distinctRoles) {
            rolesToInsert.push({
                name: role.roles_name,
                description: role.roles_name,
                association_id
            })
        }
        await this.permissionRepository.insert(permissionsToInsert)
        await this.roleRepository.insert(rolesToInsert)

        const perms = await this.permissionRepository.find({ where: { association_id } })
        const roles = await this.roleRepository.find({ where: { association_id } })

        for (const role of roles) {
            var permsForRole = role_perm_map[role.name]
            permsForRole = perms.filter((perm) => { if (permsForRole.includes(perm.name)) { return true } else { return false } })

            await this.rolePermissionRepo.insert(permsForRole.map((perm) => ({ roleId: role.id, permissionId: perm.id, association_id })))
        }

        const role_permission_mapping = await this.rolePermissionRepo.find({ where: { association_id } })

        return { perms, roles, role_permission_mapping }
    }

    async deleteAssociations(association_id: string) {
        await this.permissionRepository.delete({ association_id })
        await this.roleRepository.delete({ association_id })
        await this.rolePermissionRepo.delete({ association_id })

    }
}
