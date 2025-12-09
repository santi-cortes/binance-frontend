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

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🌐 Otras Cryptos
            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
              {filtered.length}
            </span>
          </h2>

          <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-gray-300">
            {filtered.map((c) => (
              <Link
                key={c.id}
                to={`/detail/${c.symbol}`}
                className="
          group flex items-center justify-between 
          p-4 rounded-xl border border-gray-200 bg-white/60 
          backdrop-blur transition-all duration-200
          hover:bg-blue-50 hover:border-blue-300 hover:shadow-md
          active:scale-[0.98]
        "
              >
                <div>
                  <p className="font-semibold text-lg text-gray-800 group-hover:text-blue-700 transition">
                    {c.symbol}
                  </p>
                  <p className="text-sm text-gray-500">
                    {c.numRecords} registros
                  </p>
                </div>

                <div
                  className="
          w-10 h-10 flex items-center justify-center 
          rounded-xl bg-gray-100 group-hover:bg-blue-200 
          transition-colors
        "
                >
                  <span className="text-gray-500 group-hover:text-blue-700 text-lg">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
