import { useEffect, useState, useRef } from "react";
import { fetchCryptoBySymbol, fetchCryptos } from "../api/cryptoApi";
import { Link } from "react-router-dom";
import type { CryptoSummary, CryptoData } from "../types";
import { ColorType, createChart } from "lightweight-charts";
import type { ISeriesApi } from "lightweight-charts";
import type { UTCTimestamp } from "lightweight-charts";

export const CryptoDashboard = () => {
  const [cryptos, setCryptos] = useState<CryptoSummary[]>([]);
  const [btcData, setBtcData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const chartRef = useRef<HTMLDivElement | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    fetchCryptoBySymbol("btc")
      .then((data) => setBtcData(data))
      .catch((err) => console.error(err));

    fetchCryptos()
      .then((data) => setCryptos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!chartRef.current || btcData.length === 0) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 400,
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#333",
      },
      grid: { vertLines: { color: "#eee" }, horzLines: { color: "#eee" } },
      rightPriceScale: { borderColor: "#ccc" },
      timeScale: { borderColor: "#ccc", timeVisible: true },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#4caf50",
      downColor: "#f44336",
      borderUpColor: "#4caf50",
      borderDownColor: "#f44336",
      wickUpColor: "#4caf50",
      wickDownColor: "#f44336",
    });

    const chartData = btcData
      .map((d) => ({
        time: Math.floor(d.openTime / 1_000_000) as UTCTimestamp,
        open: Number(d.open),
        high: Number(d.high),
        low: Number(d.low),
        close: Number(d.close),
      }))
      .sort((a, b) => a.time - b.time);

    candleSeries.setData(chartData);

    candleSeriesRef.current = candleSeries;

    const handleResize = () =>
      chart.applyOptions({ width: chartRef.current?.clientWidth ?? 400 });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [btcData]);

  const filtered = cryptos.filter((c) =>
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Cargando...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">
          Dashboard de Cryptomonedas
        </h1>

        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar crypto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 p-3 rounded-xl bg-white/80 backdrop-blur-md 
                   border border-gray-200 shadow-sm 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">📈 BTC - Precio</h2>
            <span className="text-sm text-gray-500">Velas 1m</span>
          </div>

          <div
            ref={chartRef}
            className="w-full h-96 rounded-xl overflow-hidden shadow-inner bg-gray-50"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            🌐 Otras Cryptos
          </h2>

          <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-gray-300">
            {filtered.map((c) => (
              <Link
                key={c.id}
                to={`/detail/${c.symbol}`}
                className="block p-4 bg-white/80 border border-gray-200 rounded-xl 
                       shadow-sm hover:shadow-md 
                       hover:bg-blue-50 transition-all duration-200"
              >
                <p className="font-semibold text-lg">{c.symbol}</p>
                <p className="text-sm text-gray-500">
                  {c.numRecords} registros
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
