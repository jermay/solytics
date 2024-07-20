export class TokenInitDTO {
  name: string;
  symbol: string;
  address: string;
  uuid: string; // ID from api.coinranking.com/v2
  iconUrl: string;
}

export class TokenDTO extends TokenInitDTO {
  decimals: number;
  supply: bigint;
}
