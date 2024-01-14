import { Test, TestingModule } from '@nestjs/testing';
import { GDriveService } from './gdrive.service';

describe('GDriveService', () => {
  let gdrive: GDriveService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GDriveService],
    }).compile();

    gdrive = module.get<GDriveService>(GDriveService);
  });

  describe('root', () => {
    it('should upload provided file in GDrive.', async () => {
      expect(gdrive.uploadFile('files/test.txt', 'folder', 'token')).toBeDefined();
    });
  });
});
