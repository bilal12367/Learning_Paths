import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RbacService } from "./rbac.service";



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
}