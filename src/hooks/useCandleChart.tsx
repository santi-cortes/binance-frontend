import { useEffect, useRef } from "react";
import { createChart, ColorType, type UTCTimestamp } from "lightweight-charts";
import type { CryptoData } from "../types";

export const useCandleChart = (btcData: CryptoData[]) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || btcData.length === 0) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { type: ColorType.Solid, color: "#fff" },
        textColor: "#333",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
      timeScale: { borderColor: "#ccc", timeVisible: true },
      rightPriceScale: { borderColor: "#ccc" },
    });

    const series = chart.addCandlestickSeries({
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
        open: +d.open,
        high: +d.high,
        low: +d.low,
        close: +d.close,
      }))
      .sort((a, b) => a.time - b.time);

    series.setData(chartData);

    const observer = new ResizeObserver(() => {
      chart.applyOptions({
        width: containerRef.current?.clientWidth ?? 400,
      });
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [btcData]);

  return containerRef;
};
