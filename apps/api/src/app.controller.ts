import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tps')
  getTps() {
    return this.appService.getTps();
  }

  @Get('market-cap')
  getMarketCap() {
    return this.appService.getMarketCap();
  }

  @Get('wallets')
  getWallets() {
    return this.appService.getWallets();
  }
}
