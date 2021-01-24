import { Test, TestingModule } from '@nestjs/testing';
import { SkClientService } from './sk-client.service';

describe('SkClientService', () => {
  let service: SkClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkClientService],
    }).compile();

    service = module.get<SkClientService>(SkClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
