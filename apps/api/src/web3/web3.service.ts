import { Injectable } from '@nestjs/common';
import { clusterApiUrl, Connection } from '@solana/web3.js';

// singleton service for the web3 connection
@Injectable()
export class Web3Service {
  public connection: Connection;
  protected logger;

  constructor() {
    this.connection = new Connection(clusterApiUrl('mainnet-beta'));
  }
}
