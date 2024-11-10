import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwaggerDocs = (app: INestApplication): void => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Post API')
    .setDescription('Post Api with Authorization')
    .build();

  // TODO: Add Authentication

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);
};
