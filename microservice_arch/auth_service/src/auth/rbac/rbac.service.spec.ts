import { Test, TestingModule } from '@nestjs/testing';
import { RbacService } from './rbac.service';
import { RbacModule } from './rbac.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/Permission';
import { Role } from './entities/Role';
import { RolePermission } from './entities/RolePermission';
import { UserRole } from './entities/UserRole';
import { User } from '../entities/user.entity';
import { UserVerification } from '../entities/user_verification.entity';

describe('RbacService', () => {
  let service: RbacService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.MYSQL_HOST || 'localhost',
          port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
          username: process.env.DB_USERNAME || 'root',
          password: process.env.DB_PASSWORD || 'root',
          database: process.env.DB_NAME || 'test',
          entities: [User, UserVerification, Permission, RolePermission, UserRole, Role],
          synchronize: true, // For dev only, auto-create tables
        }),
        TypeOrmModule.forFeature([Role, Permission, RolePermission, UserRole, User, UserVerification]),
      ],
      providers: [RbacService],
    }).compile();

    service = module.get<RbacService>(RbacService);
  });

  it('should delete all roles and permissions of associations', async () => {
      const affectedRows = await service.deleteAssociations('087f4935-9e39-41e1-88cd-282213b33bf6')
      console.log("Effected Rows: ", affectedRows);

      expect(affectedRows).toBeGreaterThan(0);
  });

  it('should create roles with permissions', async() => {
      const {insertResult, savedRole} = await service.createRoleWithAssignedPermissions(
          '087f4935-9e39-41e1-88cd-282213b33bf6',
          {name: 'Test Role', description: 'A role for testing'},
          ['perm-1', 'perm-2']
      );
  })
});
