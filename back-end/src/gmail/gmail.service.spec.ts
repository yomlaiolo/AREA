import { Test, TestingModule } from '@nestjs/testing';
import { GMailService } from './gmail.service';

describe('GMailService', () => {
  let gmail: GMailService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GMailService],
    }).compile();

    gmail = module.get<GMailService>(GMailService);
  });

  describe('root', () => {
    it('should upload provided file in GDrive.', async () => {
      expect(gmail.receiveMail('token', 'hervea.shared@gmail.com')).toBeDefined();
    });
    it ('should send email', async () => {
      expect(gmail.sendEmail('hervea.shared@gmail.com', 'artigasfchristopher@gmail.com', 'Test AREA', 'Hello, tu reçois le mail mon gaté ?', 'token')).toBeDefined();
    });
  });
});
