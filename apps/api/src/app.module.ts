import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoggingMiddleware } from './middleware/requestLogger.middleware';
import { TokenService } from './web3/token.service';
import { Web3Service } from './web3/web3.service';
import { TpsService } from './web3/tps.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WalletService } from './web3/wallet.service';

@Module({
  imports: [
    // use the default in memory cache built into NestJS for now
    // 1 minute TTL should be plenty live enough so don't spam the public RPC
    CacheModule.register({
      ttl: 60000, // 1 minute in MS
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService,
    Web3Service,
    TokenService,
    TpsService,
    WalletService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
