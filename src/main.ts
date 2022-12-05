import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule ,DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Todo implementation')
      .setDescription('The todo info')
      .setVersion('1.0')
      .addTag('todo')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.PORT;
  await app.listen(PORT || 5000, () => {
    Logger.log(`Server started on PORT ${PORT}`);
  });
}
bootstrap();


