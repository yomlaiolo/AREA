import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './websocket/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Area')
    .setDescription('Area API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  const server = new SocketIoAdapter(app);
  console.log(server.createIOServer(8080));
  app.useWebSocketAdapter(server.createIOServer(8080));

  await app.listen(8080);
}
bootstrap();
