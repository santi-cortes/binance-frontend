import { useEffect, useState } from "react";
import { fetchCryptoBySymbol, fetchCryptos } from "../api/cryptoApi";
import type { CryptoSummary, CryptoData } from "../types";

export const useCryptoData = () => {
  const [cryptos, setCryptos] = useState<CryptoSummary[]>([]);
  const [btcData, setBtcData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [btc, list] = await Promise.all([
          fetchCryptoBySymbol("btc"),
          fetchCryptos(),
        ]);

        setBtcData(btc);
        setCryptos(list);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Error desconocido.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { cryptos, btcData, loading, error };
};
