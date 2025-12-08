export interface CryptoSummary {
  id: number;
  symbol: string;
  numRecords: string;
}

export interface CryptoData {
  id: number;
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: number;
  quoteAssetVolume: number;
  numTrades: number;
  takerBuyBaseVolume: number;
  takerBuyQuoteVolume: number;
  ignore: number;
}

export interface FormValues {
  name: string
  email: string
  comment: string
  age: string
  city: string
}