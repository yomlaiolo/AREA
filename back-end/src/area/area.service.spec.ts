import { Test, TestingModule } from '@nestjs/testing';
import { AreaService } from './area.service';
import { getModelToken } from '@nestjs/mongoose';

describe('AreaService', () => {
  let areaService: AreaService;
  let areaModelMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AreaService,
        {
          provide: getModelToken('Area'),
          useValue: {
            find: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    areaService = module.get<AreaService>(AreaService);
    areaModelMock = module.get(getModelToken('Area'));
  });

  describe('launchAllAreas', () => {
    it('should call launchArea for each area', async () => {
      const areas = [
        { action: 'action1', reaction: 'reaction1', _id: '1' },
        { action: 'action2', reaction: 'reaction2', _id: '2' },
      ];
      areaModelMock.exec.mockResolvedValue(areas);

      const launchAreaSpy = jest.spyOn(areaService, 'launchArea');

      await areaService.launchAllAreas();

      expect(launchAreaSpy).toHaveBeenCalledTimes(areas.length);
      expect(launchAreaSpy).toHaveBeenCalledWith('action1', 'reaction1', '1');
      expect(launchAreaSpy).toHaveBeenCalledWith('action2', 'reaction2', '2');
    });

    it('should handle errors thrown by launchArea', async () => {
      const areas = [
        { action: 'action1', reaction: 'reaction1', _id: '1' },
        { action: 'action2', reaction: 'reaction2', _id: '2' },
      ];
      areaModelMock.exec.mockResolvedValue(areas);

      const launchAreaSpy = jest.spyOn(areaService, 'launchArea');
      launchAreaSpy.mockImplementation(() => {
        throw new Error('Test error');
      });

      const consoleErrorSpy = jest.spyOn(console, 'error');

      await areaService.launchAllAreas();

      expect(consoleErrorSpy).toHaveBeenCalledTimes(areas.length);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error in launchArea:', expect.any(Error));
    });
  });
});