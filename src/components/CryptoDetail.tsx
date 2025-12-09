import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCryptoBySymbol } from "../api/cryptoApi";
import type { CryptoData } from "../types";
import { ColorType, createChart } from "lightweight-charts";
import type { ISeriesApi, UTCTimestamp } from "lightweight-charts";
import { StatCard } from "./StatCard";

export const CryptoDetail = () => {
  const { symbol } = useParams();
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const chartRef = useRef<HTMLDivElement | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        if (!symbol) return;
        const result = await fetchCryptoBySymbol(symbol);
        setData(result);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [symbol]);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 420,
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
      chart.applyOptions({ width: chartRef.current?.clientWidth ?? 400 });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Cargando...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Error cargando {symbol}: {error}
      </p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          🔍 Detalle de {symbol?.toUpperCase()}
        </h1>
        <Link
          to="/"
          className="px-4 py-2 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700 transition"
        >
          ⬅ Volver al dashboard
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-4">📈 Gráfica de Precio</h2>
        <div
          ref={chartRef}
          className="w-full h-[420px] rounded-xl shadow-inner bg-gray-50"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-4">📘 Datos Recientes</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Apertura" value={data.at(-1)?.open} />
          <StatCard label="Cierre" value={data.at(-1)?.close} />
          <StatCard label="Máximo" value={data.at(-1)?.high} />
          <StatCard label="Mínimo" value={data.at(-1)?.low} />
        </div>
      </div>
    </div>
  );
};
