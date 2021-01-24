import { Module } from '@nestjs/common';
import { SkClientController } from './sk-client.controller';
import { SkClientService } from './sk-client.service';

@Module({
  controllers: [SkClientController],
  providers: [SkClientService]
})
export class SkClientModule {}
