import { Module } from '@nestjs/common';
import { WsClientService } from './ws-client.service';
import { WsClientController } from './ws-client.controller';

@Module({
  providers: [WsClientService],
  controllers: [WsClientController]
})
export class WsClientModule {}
