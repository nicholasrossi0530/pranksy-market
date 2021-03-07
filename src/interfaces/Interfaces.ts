export interface ITransaction {
  from: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  id: string;
  index: string;
  timestamp: string;
  to: string;
  tokenId: string;
  value: string;
}

export interface IFormattedTransaction extends ITransaction {
  formattedTimestamp: string;
  formattedValue: string;
  day: number;
}

export interface IAsset {
  id: number;
  permalink: string;
  name: string;
  description: string;
  image_url: string;
  last_sale: ILastSale;
  creator: ICreatorInfo;
  animation_url: string | null;
  token_id: string;
}

export interface ICreatorInfo {
  profile_img_url: string;
}

export interface ILastSale {
  payment_token: IPaymentToken;
  total_price: string;
}

export interface IPaymentToken {
  symbol: string;
  eth_price: string;
  decimals: number;
}