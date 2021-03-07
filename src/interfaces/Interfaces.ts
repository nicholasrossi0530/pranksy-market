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
}