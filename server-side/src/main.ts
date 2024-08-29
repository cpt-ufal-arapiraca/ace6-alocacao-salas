import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }),);

  const config = new DocumentBuilder()
    .setTitle('Sistema de Alocação de Salas')
    .setDescription('Esta documentação abrangente serve como um guia essencial para desenvolvedores que utilizam nossa API. Ela abrange informações cruciais para profissionais de back-end, front-end e QA (garantia de qualidade) envolvidos na integração com a API. Aqui, você encontrará detalhes sobre como utilizar a API, incluindo endpoints disponíveis, parâmetros de solicitação aceitos, exemplos de respostas e outros aspectos técnicos. Esta documentação será uma referência indispensável para a integração eficaz da equipe de desenvolvimento com nossas tecnologias.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(5555);
}
bootstrap();
