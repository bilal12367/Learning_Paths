import { HttpException, HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/Role';
import { DeleteResult, In, InsertResult, Repository } from 'typeorm';
import { Permission } from './entities/Permission';
import { RolePermission } from './entities/RolePermission';
import { UserRole } from './entities/UserRole';
import { RoleAssociation } from './entities/RoleAssociation';

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
    MANAGE_PERMISSIONS = 'MANAGE_PERMISSIONS',
    MANAGE_CHANNELS = 'MANAGE_CHANNEL',
    DELETE_CHANNEL = 'DELETE_CHANNEL'
}

const role_perm_map = {
    "USER": [PermissionEnum.GENERAL_ACCESS.valueOf()],
    "ADMIN": [PermissionEnum.GENERAL_ACCESS.valueOf(), PermissionEnum.MANAGE_USERS.valueOf(), PermissionEnum.MANAGE_ROLES.valueOf()],
    "ROOT": [PermissionEnum.GENERAL_ACCESS.valueOf(), PermissionEnum.MANAGE_USERS.valueOf(), PermissionEnum.MANAGE_ROLES.valueOf(), PermissionEnum.MANAGE_PERMISSIONS.valueOf()],
}

@Injectable()
export class RbacService {

    private readonly logger = new Logger(RbacService.name);

    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
        @InjectRepository(RolePermission) private readonly rolePermissionRepo: Repository<RolePermission>,
        @InjectRepository(UserRole) private readonly userRoleRepo: Repository<UserRole>,
        @InjectRepository(RoleAssociation) private readonly roleAssociationRepo: Repository<RoleAssociation>,
    ) { }

    async createRoles(roles: IRole[]): Promise<Role[]> {
        this.logger.debug("Roles: ",roles)
        const insertResults = await this.roleRepository.insert(
            roles.map((role) => ({
                name: role.name,
                description: role.description,
                association_id: 'test'
            }))
        )
        const roleIds: string[] = insertResults.identifiers.map((iden: {id: number}) => iden.id.toString());
        
        return await this.roleRepository.findBy({ id: In(roleIds.map((roleId) => parseInt(roleId))) });
    }

    async createPermissions(permissions: IPermission[]): Promise<InsertResult> {
        return await this.permissionRepository.insert(
            permissions.map((permission) => ({
                name: permission.name,
                description: permission.description,
                association_id: 'test'
            }))
        )
    }

    /**
     * This method assigns permissions to a role.
     * @param roleId - Id of role to which permissions are to be assigned.
     * @param permissionIds  - Array of permission Ids to be assigned to role.
     * @returns - InsertResult
     */
    async assignPermissionsToRole(roleId: string, permissionIds: string[]): Promise<RolePermission[]> {

        await this.rolePermissionRepo.insert(
            permissionIds.map((permissionId) => ({
                roleId: roleId,
                permissionId: permissionId
            }))
        )
        return await this.rolePermissionRepo.find({
            where: {
                roleId: roleId,
                permissionId: In(permissionIds)
            }
        })
    }

    async getPermissionsOnRole(roleId: string): Promise<Permission[]> {
        const rolePermissions: RolePermission[] = await this.rolePermissionRepo.find({ where: { roleId: roleId } })
        rolePermissions.map((rolePerm) => rolePerm.permissionId);
        return await this.permissionRepository.findBy({ id: In(rolePermissions.map((rolePerm) => parseInt(rolePerm.permissionId))) })
    }

    async getRoles(roleIds: string[]): Promise<Role[]> {
        return await this.roleRepository.findBy({ id: In(roleIds.map((roleId) => parseInt(roleId))) })
    }

    async getPermissions(permissionIds: string[]): Promise<Permission[]> {
        return await this.permissionRepository.findBy({ id: In(permissionIds.map((permissionId) => parseInt(permissionId))) })
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
    async checkAccess(userId: string, permissionId: string, permissionName: string, association_id: string) {
        const perm = await this.permissionRepository
                        .findOne({ 
                            where: permissionId != null ? 
                            { id: parseInt(permissionId) } : 
                            { name: permissionName } 
        })
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

    async addRolesToAssociation(association_id: string, roles: IRole[]) { 
        const insertResult: InsertResult = await this.roleRepository.insert(
            roles.map((role) => ({
                name: role.name,
                description: role.description,
                association_id
            }))
        )
        return insertResult
    }

    /**
     * This method associates resources to roles.
     * If a resource should be accessed by particular role. You'll add it here.
     * @param association_id - Id of resource/channel/action etc.
     * @param roleIds - Role id of a association.
     */
    async associateRolesToAssociation(association_id: string, roleIds: String[]): Promise<RoleAssociation[]> {
        // this.logger.debug("RoleIds: "+roleIds, "Associating Roles to associations: "+association_id)
        await this.roleAssociationRepo.insert(
            roleIds.map((role_id: string) => ({role_id: role_id, association_id}))
        )
        return await this.roleAssociationRepo.find({ where: {role_id: In(roleIds) }})
    }

    async getRolesAllowedToAssociation(association_id: string): Promise<Role[]> {
        const roleAssociations: RoleAssociation[] = await this.roleAssociationRepo.findBy({
            association_id
        })
        const role_ids = roleAssociations.map((roleAssociation: RoleAssociation) => roleAssociation.role_id)
        return await this.roleRepository.find({where: { id: In(role_ids)}});
    }

    async createRoleWithAssignedPermissions(association_id: string, role: { name: string, description: string }, permissionIds: string[]) { 
        const newRole: Role = this.roleRepository.create({
            name: role.name,
            description: role.description,
            association_id
        })
        const savedRole = await this.roleRepository.save(newRole)
        const rolePermissionMappings: { roleId: string, permissionId: string }[] = []
        for (const permId of permissionIds) {
            rolePermissionMappings.push({
                roleId: savedRole.id.toString(),
                permissionId: permId
            })
        } 
        const insertResult: InsertResult = await this.rolePermissionRepo.insert(
            rolePermissionMappings.map((mapping) => ({
                roleId: mapping.roleId,
                permissionId: mapping.permissionId,
                association_id
            }))
        )
        return { savedRole, insertResult }
    }

    async addPermissionsToAssociation(association_id: string, permissions: { name: string, description: string }[]) { 
        const insertResult: InsertResult = await this.permissionRepository.insert(
            permissions.map((permission) => ({
                name: permission.name,
                description: permission.description,
                association_id
            }))
        )
        
        return insertResult
    }

    async mapPermissionsToRolesInAssociation(association_id: string, roleId: string, permissionIds: string[]) { 
        const rolePermissionMappings: { roleId: string, permissionId: string }[] = []
        for (const permId of permissionIds) {
            rolePermissionMappings.push({
                roleId: roleId,
                permissionId: permId
            })
        } 
        const insertResult: InsertResult = await this.rolePermissionRepo.insert(
            rolePermissionMappings.map((mapping) => ({
                roleId: mapping.roleId,
                permissionId: mapping.permissionId,
                association_id
            }))
        )
        return insertResult
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

    async getRolesOfUser(userId: string): Promise<UserRole[]> {
        const rolesAssigned = await this.userRoleRepo.find({ where: { userId: userId } })
        return rolesAssigned
    }

    async getPermissionsOfRole(roleId: string): Promise<RolePermission[]> {
        const permissionsAssigned = await this.rolePermissionRepo.find({ where: { roleId: roleId } })
        return permissionsAssigned
    }

    async getAllRolesOfAssociation(association_id: string): Promise<Role[]> {
        const roles = await this.roleRepository.find({ where: { association_id } })
        return roles
    }

    async getAllPermissionsOfAssociation(association_id: string): Promise<Permission[]> {
        const permissions = await this.permissionRepository.find({ where: { association_id } })
        return permissions
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

    async assignInitialRBACToAssociation(association_id: string) : Promise<ServerRbacDto> {
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

    /**
     * Deletes all roles and permissions of an association
     * @param association_id 
     * @returns Returns Affected Rows Count
     */
    async deleteAssociations(association_id: string): Promise<number> {
        var affectedRows = 0
        affectedRows += (await this.permissionRepository.delete({ association_id })).affected || 0
        
        affectedRows += (await this.roleRepository.delete({ association_id })).affected || 0
        affectedRows += (await this.rolePermissionRepo.delete({ association_id })).affected || 0
        return affectedRows
    }
}
