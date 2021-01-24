import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SocketIoAdapter} from './adapters/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let corsOrigins=['http://localhost:8081','http://localhost:3001'];
  app.enableCors();
  app.useWebSocketAdapter(new SocketIoAdapter(app, corsOrigins));
  await app.listen(3000);
}
bootstrap();
