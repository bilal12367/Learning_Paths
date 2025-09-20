import { Module, OnModuleInit } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/Permission';
import { Role } from './entities/Role';
import { RolePermission } from './entities/RolePermission';
import { UserRole } from './entities/UserRole';
import { AuthModule } from '../auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role, RolePermission, UserRole])],
  providers: [RbacService],
  exports: [RbacService]
})
export class RbacModule { }
