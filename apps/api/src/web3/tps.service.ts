import { Injectable, Logger } from '@nestjs/common';
import { Web3Service } from './web3.service';

@Injectable()
export class TpsService {
  logger = new Logger(TpsService.name);
  constructor(private readonly web3Service: Web3Service) {}

  async getTps() {
    // the build in RPC method has exactly what we need
    this.logger.debug('Fetching TPS');
    const result =
      await this.web3Service.connection.getRecentPerformanceSamples();

    const output = [] as { slot: number; tps: number }[];
    result.forEach((sample) => {
      output.push({
        slot: sample.slot,
        tps: sample.numTransactions / sample.samplePeriodSecs,
      });
    });

    return output;
  }
}
