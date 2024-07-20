import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// shim for bigint
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
