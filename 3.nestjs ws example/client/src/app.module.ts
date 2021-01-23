import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsClientModule } from './ws-client/ws-client.module';

@Module({
  imports: [WsClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
