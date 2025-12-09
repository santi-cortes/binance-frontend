import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCryptoData } from "../hooks/useCryptoData";
import { useCandleChart } from "../hooks/useCandleChart";

export const CryptoDashboard = () => {
  const { cryptos, btcData, loading, error } = useCryptoData();
  const [search, setSearch] = useState("");

  const chartRef = useCandleChart(btcData);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return cryptos.filter((c) => c.symbol.toLowerCase().includes(term));
  }, [search, cryptos]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

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
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Buscar crypto..."
            className="w-full pl-10 p-3 rounded-xl bg-white/80 backdrop-blur-md 
                     border border-gray-200 shadow-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            🔍
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">📈 BTC - Precio</h2>
          <div
            ref={chartRef}
            className="h-96 rounded-xl shadow-inner bg-gray-50"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-4">🌐 Otras Cryptos</h2>

          <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-gray-300">
            {filtered.map((c) => (
              <Link
                key={c.id}
                to={`/detail/${c.symbol}`}
                className="block p-4 rounded-xl border shadow-sm hover:shadow-md transition"
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
