import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('GPTask')
    .setDescription('API do projeto final reprograma, com o objetivo de facilitar a criação de atividades de uma determinada tarefa')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('gptask', app, document);

  await app.listen(3000);
}
bootstrap();
