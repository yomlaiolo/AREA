import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIService } from './openai.service';
import { ConfigService } from '@nestjs/config';

describe('OpenAIService', () => {
  let service: OpenAIService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenAIService,
        ConfigService,
      ],
    }).compile();

    service = module.get<OpenAIService>(OpenAIService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should return AI response', async () => {
    const response = await service.ResumeEmail('Bonjour, comment tu vas ?', configService.get<string>('OPENAI_KEY'));
    console.log(response);
    expect(response).toBeDefined();
  });

  it('should return AI response in french', async () => {
    const response = await service.ResumeEmail('Bonjour, comment tu vas ?', configService.get<string>('OPENAI_KEY'), 'french');
    console.log(response);
    expect(response).toBeDefined();
  });

  it('should return AI response, suggesting a response', async () => {
    const response = await service.SuggestEmailResponse('Bonjour, comment tu vas ?', configService.get<string>('OPENAI_KEY'));
    console.log(response);
    expect(response).toBeDefined();
  });

  it('should return AI response, suggesting a response in spanish', async () => {
    const response = await service.SuggestEmailResponse('Bonjour, comment tu vas ?', configService.get<string>('OPENAI_KEY'), 'spanish');
    console.log(response);
    expect(response).toBeDefined();
  });

  it('should return AI response, but it will say there is no need to respond so no suggestion.', async () => {
    const response = await service.SuggestEmailResponse('You have been invited to join the "Epitech" organization on GitBook. Login with your email "christopher.artigentes@epitech.eu" or follow this link:', configService.get<string>('OPENAI_KEY'));
    console.log(response);
    expect(response).toContain('There is no need to respond to this email');
  });
});
