// encryption.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UtilService } from './EncryptService';

describe('EncryptionService', () => {
  let service: UtilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilService],
    }).compile();

    service = module.get<UtilService>(UtilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash the password', async () => {
    const password = 'password123';
    const hashedPassword = await service.encryptPassword(password);
    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toEqual(password); // Ensure the password is hashed
    expect(await service.comparePassword(password, hashedPassword)).toBeTruthy();
  });
  it('should return false when passwords do not match', async () => {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash('anotherpassword', 10);

    expect(await service.comparePassword(password, hashedPassword)).toBe(false);
  });
});
