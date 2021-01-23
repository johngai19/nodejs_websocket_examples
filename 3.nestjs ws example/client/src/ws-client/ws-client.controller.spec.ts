import { Test, TestingModule } from '@nestjs/testing';
import { WsClientController } from './ws-client.controller';

describe('WsClientController', () => {
  let controller: WsClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WsClientController],
    }).compile();

    controller = module.get<WsClientController>(WsClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
