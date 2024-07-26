import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

// shim for bigint
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = 3001;
  const logger = new Logger('bootstrap');

  await app.listen(port, () => {
    logger.log(`Listening on port ${port}`);
  });
}
bootstrap();
