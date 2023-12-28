import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIService } from './openai.service';

describe('OpenAIService', () => {
  let service: OpenAIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenAIService,
      ],
    }).compile();

    service = module.get<OpenAIService>(OpenAIService);
  });

  it('should return AI response', async () => {
    const response = await service.ResumeEmail('Bonjour, comment tu vas ?', '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');
    console.log(response);
    expect(response).toBeDefined();
  });

  it('should return AI response in french', async () => {
    const response = await service.ResumeEmail('Bonjour, comment tu vas ?', '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', 'french');
    console.log(response);
    expect(response).toBeDefined();
  });

  it('should return AI response, suggesting a response', async () => {
    const response = await service.SuggestEmailResponse('Bonjour, comment tu vas ?', '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');
    console.log(response);
    expect(response).toBeDefined();
  });

  it('should return AI response, suggesting a response in spanish', async () => {
    const response = await service.SuggestEmailResponse('Bonjour, comment tu vas ?', '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', 'spanish');
    console.log(response);
    expect(response).toBeDefined();
  });

  it('should return AI response, but it will say there is no need to respond so no suggestion.', async () => {
    const response = await service.SuggestEmailResponse('You have been invited to join the "Epitech" organization on GitBook. Login with your email "christopher.artigentes@epitech.eu" or follow this link:', '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');
    console.log(response);
    expect(response).toBeDefined();
  });

  /*it('should resume a file', async () => {
    const response = await service.ResumeFile('./back-end/src/openai/test.txt', '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');
    console.log(response);
    expect(response).toBeDefined();
  });*/
});
