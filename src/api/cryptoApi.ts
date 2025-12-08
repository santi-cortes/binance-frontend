const BASE_URL = "http://localhost:8080";

export const fetchCryptos = async () => {
  const res = await fetch(`${BASE_URL}/api/cryptos`);
  if (!res.ok) throw new Error("Error fetching crypto summary");
  return res.json();
};

export const fetchCryptoBySymbol = async (symbol: string) => {
  const res = await fetch(`${BASE_URL}/api/${symbol.toLowerCase()}`);
  if (!res.ok) throw new Error(`Error fetching ${symbol}`);
  return res.json();
};
