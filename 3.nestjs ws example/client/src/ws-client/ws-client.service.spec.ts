import { Test, TestingModule } from '@nestjs/testing';
import { WsClientService } from './ws-client.service';

describe('WsClientService', () => {
  let service: WsClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsClientService],
    }).compile();

    service = module.get<WsClientService>(WsClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
