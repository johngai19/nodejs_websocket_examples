import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SkClientModule } from './sk-client/sk-client.module';

@Module({
  imports: [SkClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
