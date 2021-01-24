import { Test, TestingModule } from '@nestjs/testing';
import { SkClientController } from './sk-client.controller';

describe('SkClientController', () => {
  let controller: SkClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkClientController],
    }).compile();

    controller = module.get<SkClientController>(SkClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
