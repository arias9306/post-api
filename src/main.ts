import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwaggerDocs } from './app.swagger';

export const VERSION = 1;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = `api/v${VERSION}`;

  // TODO: disable cors in prod
  app.enableCors();

  initSwaggerDocs(app);

  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT ?? 3000;

  await app.listen(port, () => {
    Logger.log(
      `Listening at http://localhost:${port}/${globalPrefix}`,
      'Bootstrap',
    );
    Logger.log(`Listening at  http://localhost:${port}/docs`, 'Swagger');
  });
}
bootstrap();
