import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';
import { BcryptModule } from './bcrypt.module';

describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
      imports: [BcryptModule]
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash a password correctly', async () => {
    const passwordHashed = await service.hash('password');
    expect(await service.compare('password', passwordHashed)).toBe(true);
  });

  //New
  it('should return false when comparing an incorrect password', async () => {
    const passwordHashed = await service.hash('password');
    expect(await service.compare('wrongpassword', passwordHashed)).toBe(false);
  });

  it('should hash different passwords to different hashes', async () => {
    const passwordHashed1 = await service.hash('password1');
    const passwordHashed2 = await service.hash('password2');
    expect(passwordHashed1).not.toEqual(passwordHashed2);
  });

  it('should hash the same password to different hashes', async () => {
    const passwordHashed1 = await service.hash('password');
    const passwordHashed2 = await service.hash('password');
    expect(passwordHashed1).not.toEqual(passwordHashed2);
  });

  it('should return false when comparing a hash with an empty password', async () => {
    const passwordHashed = await service.hash('password');
    expect(await service.compare('', passwordHashed)).toBe(false);
  });

  it('should return false when comparing a password with an empty hash', async () => {
    expect(await service.compare('password', '')).toBe(false);
  });

});
