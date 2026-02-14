import { Body, Controller, Get, Param, ParseArrayPipe, Post, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RbacService } from "./rbac.service";
import { InsertResult } from "typeorm";
import { Role } from "./entities/Role";
import { Permission } from "./entities/Permission";
import { RolePermission } from "./entities/RolePermission";



@Controller('/rbac')
export class AuthRbacController {

    constructor(private readonly rbacService: RbacService ) {}

    
    /*  checkAccess
        If serverId isn't given it considers for global permissions.
          
    */
    @Get('/checkAccess')
    public async hasAccess(@Query() userId: string, @Query() permissionId: string, @Query() permissionName: string, @Query() serverId: string): Promise<boolean> {
        return await this.rbacService.checkAccess(userId, permissionId, permissionName, serverId);
    }

    @Get('/test')
    public async test(){
        // return await this.rbacService.assignInitialRBACToAssociation('123')
        return await this.rbacService.deleteAssociations('123')
    }

    @Post('/createRoles')
    public async createRoles(@Body() body: {roles: IRole[]}): Promise<Role[]> {
        if(!body.roles || body.roles.length === 0){
            throw new Error('roles are required')
        }
        return await this.rbacService.createRoles(body.roles)
    }

    @Post('/createPermissions')
    public async createPermissions(@Body() body: {permissions: IPermission[]}): Promise<Permission[]> {
        if(!body.permissions || body.permissions.length === 0){
            throw new Error('permissions are required')
        }
        return await this.rbacService.createPermissions(body.permissions)
    }

    @Get('/getRoles')
    public async getRoles(@Query('ids') roleIds: string[]): Promise<Role[]> {
        return await this.rbacService.getRoles(roleIds);
    }

    @Get('/getPermissions')
    public async getPermissions(@Query('ids') permissionIds: string[]): Promise<Permission[]> {
        return await this.rbacService.getPermissions(permissionIds);
    }



    @Post('/generalSetupToAssociation')
    public async generalSetupToAssociation(@Body() body: {associationId: string}): Promise<ServerRbacDto> {
        if(!body.associationId){
            throw new Error('associationId is required')
        }
        return await this.rbacService.assignInitialRBACToAssociation(body.associationId)
    }

    @Post("/createRoleWithAssignedPermissions")
    public async createRoleWithAssignedPermissions(@Body() body: {associationId: string, role: {name: string, description: string}, permissionIds: string[]}): Promise<{insertResult: InsertResult, savedRole: Role}> {
        if(!body.role || !body.permissionIds){
            throw new Error('roleName and permissionIds are required')
        }
        return await this.rbacService.createRoleWithAssignedPermissions(body.associationId, body.role, body.permissionIds)
    }

    @Post('/addAccessRolesToAssociation')
    public async addRolesToAssociation(@Body() body: {association_id: string, roleIds: string[]}) {
        await this.rbacService.associateRolesToAssociation(body.association_id, body.roleIds)
    }

    @Get('/getRolesAllowedOnAssociation')
    public async getRolesAllowedToAccessChannel(@Query('associationId') association_id: string): Promise<Role[]> {
        return await this.rbacService.getRolesAllowedToAssociation(association_id);
    }

    @Post('/assignPermissionsToRole')
    public async assignPermissionsToRole(@Body() body: {roleId: string, permssionIds: string[]}): Promise<RolePermission[]> {
        return await this.rbacService.assignPermissionsToRole(body.roleId, body.permssionIds)
    }

    // @Post('/assignPermissionsToRoles')
    // public async assignPermissionsToRoles(@Body() body: {})
}