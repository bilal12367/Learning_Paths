import { Module, OnModuleInit } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/Permission';
import { Role } from './entities/Role';
import { RolePermission } from './entities/RolePermission';
import { UserRole } from './entities/UserRole';
import { AuthModule } from '../auth.module';
import { AuthRbacController } from './rbac.controller';
import { RoleAssociation } from './entities/RoleAssociation';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role, RolePermission, UserRole, RoleAssociation])],
  providers: [RbacService],
  controllers: [AuthRbacController],
  exports: [RbacService]
})
export class RbacModule { }
