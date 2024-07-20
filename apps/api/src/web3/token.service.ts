import { Injectable, Logger } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { getMint } from '@solana/spl-token';
import { TokenInitDTO } from './dto/token.dto';
import { PublicKey } from '@solana/web3.js';
import { CoinRankingPriceDTO } from './dto/coinranking.dto';

@Injectable()
export class TokenService {
  logger = new Logger(TokenService.name);

  constructor(private readonly web3Service: Web3Service) {}

  // tried to stick with Solana only tokens as some of the
  // biggest on the market list like Lidao don't have a large supply
  // on Solana
  static readonly tokenInit: TokenInitDTO[] = [
    {
      uuid: 'Fahjz3RoJ',
      symbol: 'W',
      name: 'Wormhole',
      address: '85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ',
      iconUrl: 'https://cdn.coinranking.com/GCc0QyJsu/w.png',
    },
    {
      name: 'dogwifhat',
      symbol: 'WIF',
      address: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
      uuid: 'sZUrmToWF',
      iconUrl: 'https://cdn.coinranking.com/lmn49VWrx/dogwifhat.PNG',
    },
    {
      uuid: 'Xt79NB_b0',
      symbol: 'MPLX',
      name: 'Metaplex',
      address: 'METAewgxyPbgwsseH8T16a39CQ5VyVxZi9zXiDPY18m',
      iconUrl: 'https://cdn.coinranking.com/lGU6RuMWsPI/metaplex.png',
    },
    {
      name: 'Jupiter',
      symbol: 'JUP',
      address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
      uuid: 'qMgTxtv34',
      iconUrl: 'https://cdn.coinranking.com/ss1JeYZ8t/JUP.PNG',
    },
    {
      name: 'Bonk',
      symbol: 'BONK',
      address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      uuid: 'jCd_nuYCH',
      iconUrl: 'https://cdn.coinranking.com/8YnJOyn2H/bonk.png',
    },
  ];

  async getAllMarketCap() {
    const [supply, prices] = await Promise.all([
      this.getAllTokenSupply(),
      this.getAllTokenPrices(),
    ]);
    // this.logger.debug({ supply, prices });

    const marketCaps = prices.map((token) => {
      const supplyInfo = supply.find((s) => s.symbol === token.symbol);
      const marketCap = supplyInfo
        ? Number(
            supplyInfo.supply / BigInt(10) ** BigInt(supplyInfo.decimals),
          ) * token.price
        : 0;
      return {
        ...token,
        marketCap: Math.floor(marketCap),
      };
    });
    const totalMarketCap = marketCaps.reduce(
      (acc, cur) => acc + cur.marketCap,
      0,
    );

    return {
      totalMarketCap,
      prices: marketCaps,
    };
  }

  async getAllTokenSupply() {
    this.logger.debug(`Fetching token supply`);
    return Promise.all(
      TokenService.tokenInit.map((token) => this.getTokenSupply(token)),
    );
  }

  async getTokenSupply(token: TokenInitDTO) {
    this.logger.debug(`Fetching token supply for ${token.name}`);
    const mintAccount = await getMint(
      this.web3Service.connection,
      new PublicKey(token.address),
    );
    // this.logger.debug(token.name, mintAccount);

    const { decimals, supply } = mintAccount;

    return {
      ...token,
      decimals,
      supply,
    };
  }

  async getAllTokenPrices() {
    this.logger.debug(`Fetching token prices`);

    const tokenIds = TokenService.tokenInit
      .map((token) => `uuids[]=${token.uuid}`)
      .join('&');
    const url = `https://api.coinranking.com/v2/coins?${tokenIds}`;
    this.logger.debug('url: ', url);

    const response = await fetch(url);
    const { data } = (await response.json()) as CoinRankingPriceDTO;
    // this.logger.debug('price data: ', data);

    return data?.coins.map((coin) => ({
      iconUrl: coin.iconUrl,
      name: coin.name,
      price: Number(coin.price),
      symbol: coin.symbol,
    }));
  }
}
