import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCryptoBySymbol } from "../api/cryptoApi";
import type { CryptoData } from "../types";
import { createChart, ColorType } from "lightweight-charts";
import type { UTCTimestamp, ISeriesApi } from "lightweight-charts";

export const CryptoDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const chartRef = useRef<HTMLDivElement | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (symbol) {
      fetchCryptoBySymbol(symbol)
        .then(setData)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [symbol]);

  useEffect(() => {
    if (
      !chartRef.current ||
      data.length === 0 ||
      chartRef.current.childNodes.length > 0
    )
      return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 350,
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#222",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
      timeScale: { timeVisible: true, borderColor: "#ccc" },
      rightPriceScale: { borderColor: "#ccc" },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#4caf50",
      downColor: "#f44336",
      wickUpColor: "#4caf50",
      wickDownColor: "#f44336",
      borderUpColor: "#4caf50",
      borderDownColor: "#f44336",
    });

    const chartData = data
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
      chart.applyOptions({ width: chartRef.current?.clientWidth ?? 350 });
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">Cargando...</p>
    );

  if (error)
    return (
      <p className="text-center text-red-600 mt-10 text-lg">Error: {error}</p>
    );

  const last = data[data.length - 1];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          {symbol?.toUpperCase()} — Detalle
        </h2>

        <Link
          to="/"
          className="px-4 py-2 rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
        >
          ← Volver
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/70 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-700 mb-2">Precio actual</h3>
          <p className="text-3xl font-bold text-gray-900">${last.close}</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-700 mb-2">Volumen</h3>
          <p className="text-2xl font-bold text-gray-900">{last.volume}</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-700 mb-2">Trades</h3>
          <p className="text-2xl font-bold text-gray-900">
            {last.numTrades.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Historial / Candlestick</h3>
        <div ref={chartRef} className="w-full h-[350px]" />
      </div>

      <div className="bg-white/90 shadow-lg rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Registros</h3>

        <div className="overflow-auto max-h-[300px] rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700 sticky top-0">
              <tr>
                <th className="p-3">Time</th>
                <th className="p-3">Open</th>
                <th className="p-3">High</th>
                <th className="p-3">Low</th>
                <th className="p-3">Close</th>
                <th className="p-3">Volume</th>
              </tr>
            </thead>

            <tbody>
              {data.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-3">{d.openTime}</td>
                  <td className="p-3">{d.open}</td>
                  <td className="p-3">{d.high}</td>
                  <td className="p-3">{d.low}</td>
                  <td className="p-3">{d.close}</td>
                  <td className="p-3">{d.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
