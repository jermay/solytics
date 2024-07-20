export class CoinRankingPriceDTO {
  status: string;
  data: {
    coins: CoinRankingCoinDTO[];
  };
}

export class CoinRankingCoinDTO {
  uuid: string;
  symbol: string;
  name: string;
  iconUrl: string;
  price: string;
  contractAddresses: string[];
}
