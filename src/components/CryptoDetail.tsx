import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCryptoBySymbol } from "../api/cryptoApi";
import type { CryptoData } from "../types";
import { useCandleChart } from "../hooks/useCandleChart";
import { Stat } from "./Stat";

export const CryptoDetail = () => {
  const { symbol } = useParams();
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const chartRef = useCandleChart(data);

  useEffect(() => {
    const load = async () => {
      try {
        if (!symbol) return;

        const resp = await fetchCryptoBySymbol(symbol);
        setData(resp);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [symbol]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Cargando...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Error al cargar {symbol}: {error}
      </p>
    );

  const last = data.at(-1);

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
          ⬅ Volver
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-4">📈 Gráfica</h2>
        <div
          ref={chartRef}
          className="w-full h-[420px] rounded-xl shadow-inner bg-gray-50"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Apertura" value={last?.open} />
        <Stat label="Cierre" value={last?.close} />
        <Stat label="Máximo" value={last?.high} />
        <Stat label="Mínimo" value={last?.low} />
      </div>
    </div>
  );
};
