import { Injectable, Logger } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

@Injectable()
export class WalletService {
  logger = new Logger(WalletService.name);

  constructor(private readonly web3Service: Web3Service) {}

  // some random wallets from the rich list
  readonly walletAddresses = [
    '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
    '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
    'Q6XprfkF8RQQKoQVG33xT88H7wi8Uk1B1CC7YAs69Gi',
    '6b4aypBhH337qSzzkbeoHWzTLt4DjG2aG8GkrrTQJfQA',
    '7mhcgF1DVsj5iv4CxZDgp51H6MBBwqamsH1KnqXhSRc5',
  ];

  async getwalletBalances() {
    this.logger.debug('Fetching wallet balances');
    const wallets = await Promise.all(
      this.walletAddresses.map(async (address) => {
        const balance = await this.web3Service.connection.getBalance(
          new PublicKey(address),
        );
        return {
          address,
          balance: Number(balance) / LAMPORTS_PER_SOL,
        };
      }),
    );
    return wallets;
  }
}
