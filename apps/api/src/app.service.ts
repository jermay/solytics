import { Injectable } from '@nestjs/common';
import { TokenService } from './web3/token.service';
import { TpsService } from './web3/tps.service';
import { WalletService } from './web3/wallet.service';

@Injectable()
export class AppService {
  // While some of these services are pretty small it keeps the codebase clean
  // not every function should be a service it just turned out that way
  constructor(
    private readonly tokenService: TokenService,
    private readonly tpsService: TpsService,
    private readonly walletService: WalletService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getTps() {
    const result = await this.tpsService.getTps();
    return result;
  }

  async getMarketCap() {
    const result = await this.tokenService.getAllMarketCap();
    return result;
  }

  async getWallets() {
    const result = await this.walletService.getwalletBalances();
    return result;
  }
}
