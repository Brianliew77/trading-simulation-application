import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

function Watchlist() {
  const [timestamps, setTimestamps] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState("");
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [chartOpen, setChartOpen] = useState(false);
  const [chartTicker, setChartTicker] = useState(null);

  const chartRef = useRef(null);     // div container
  const chartObjRef = useRef(null);  // chart instance
  const seriesRef = useRef(null);    // candlestick series

  const navigate = useNavigate();

  // Load timestamps once
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/timestamps`);
        setTimestamps(res.data || []);
        if (res.data?.length) setSelectedTimestamp(res.data[0]);
      } catch (e) {
        console.error(e);
        setErr("Failed to load timestamps.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Load watchlist rows for selected timestamp
  useEffect(() => {
    if (!selectedTimestamp) return;
    (async () => {
      try {
        const res = await axios.get(
          `${API}/trading-data?timestamp=${encodeURIComponent(selectedTimestamp)}`
        );
        setStocks(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error(e);
        setErr("Failed to load trading data.");
      }
    })();
  }, [selectedTimestamp]);

  const handleTrade = (action, ticker) => {
    navigate(`/trade?action=${action.toUpperCase()}&ticker=${ticker}`);
  };

  const handleViewChart = async (ticker) => {
    setChartTicker(ticker);
    setChartOpen(true);
  };

  // Initialize chart and load candles only when modal opens
  useEffect(() => {
    if (!chartOpen) return;

    let cleanup = () => {};

    (async () => {
      try {
        // Import as a namespace to avoid ESM/CJS interop pitfalls.
        const LightweightCharts = await import("lightweight-charts");

        // Create chart instance if needed
        if (!chartObjRef.current && chartRef.current) {
          const chart = LightweightCharts.createChart(chartRef.current, {
            width: chartRef.current.clientWidth,
            height: 360,
            layout: { textColor: "#222" },
            grid: { vertLines: { visible: false }, horzLines: { visible: false } },
            timeScale: { rightOffset: 2, borderVisible: false },
            rightPriceScale: { borderVisible: false },
          });

          // Guard: ensure API looks right
          if (!chart || typeof chart.addCandlestickSeries !== "function") {
            throw new Error("lightweight-charts API not as expected (no addCandlestickSeries).");
          }

          const series = chart.addCandlestickSeries();
          chartObjRef.current = chart;
          seriesRef.current = series;

          const handleResize = () => {
            if (chartRef.current) {
              chart.applyOptions({ width: chartRef.current.clientWidth });
            }
          };
          window.addEventListener("resize", handleResize);
          cleanup = () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
            chartObjRef.current = null;
            seriesRef.current = null;
          };
        }

        // Build `upto` exactly like your successful backend test: YYYY-MM-DDHH:MM:SSZ
        const buildUpto = (ts) => {
          if (!ts) return "";
          let s = ts.trim();
          if (s.includes(" ")) s = s.replace(" ", "");
          if (!s.endsWith("Z")) s = s + "Z";
          return s;
        };

        // Fetch candles
        if (chartTicker && selectedTimestamp) {
          const uptoWire = buildUpto(selectedTimestamp);
          const url = `${API}/candles?ticker=${chartTicker}&upto=${uptoWire}&limit=120`;

          const { data } = await axios.get(url).catch((e) => {
            console.error("Candles error:", e?.response?.status, e?.response?.data || e.message);
            throw e;
          });

          if (Array.isArray(data) && seriesRef.current && chartObjRef.current) {
            seriesRef.current.setData(data); // [{time, open, high, low, close}]
            chartObjRef.current.timeScale().fitContent();
          } else if (Array.isArray(data) && data.length === 0) {
            setErr("No candle data for the selected timestamp/ticker.");
          }
        }
      } catch (e) {
        console.error("Chart init failed:", e);
        setErr(
          `Failed to render chart. ${
            e?.response?.status || ""
          } ${e?.response?.statusText || ""} ${
            e?.response?.data ? JSON.stringify(e.response.data) : e.message
          }`
        );
      }
    })();

    return () => cleanup();
  }, [chartOpen, chartTicker, selectedTimestamp]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="p-6 text-gray-700">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <h1 className="text-3xl text-gray-900 font-bold mt-2 ml-6 text-left">My Watchlist</h1>

      {err && (
        <div className="ml-6 mt-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded px-3 py-2">
          {err}
        </div>
      )}

      <div className="ml-6 mt-4">
        <label className="mr-2 font-semibold">Select Timestamp:</label>
        <select
          value={selectedTimestamp}
          onChange={(e) => setSelectedTimestamp(e.target.value)}
          className="border px-2 py-1"
        >
          {timestamps.map((ts, idx) => (
            <option key={idx} value={ts}>
              {ts}
            </option>
          ))}
        </select>
      </div>

      <table className="ml-6 mt-4 border-collapse border w-[95%] text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-1">Ticker</th>
            <th className="border p-1">Bid</th>
            <th className="border p-1">Ask</th>
            <th className="border p-1">Last</th>
            <th className="border p-1">Volume</th>
            <th className="border p-1">Open</th>
            <th className="border p-1">High</th>
            <th className="border p-1">Low</th>
            <th className="border p-1">Close</th>
            <th className="border p-1">Total Volume</th>
            <th className="border p-1">Trade</th>
            <th className="border p-1">Chart</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s, idx) => (
            <tr key={idx} className="bg-white even:bg-gray-50">
              <td className="border p-1">{s.ticker}</td>
              <td className="border p-1">{s.low}</td>
              <td className="border p-1">{s.high}</td>
              <td className="border p-1">{s.last_price}</td>
              <td className="border p-1">{s.volume_curr_price}</td>
              <td className="border p-1">{s.open}</td>
              <td className="border p-1">{s.todays_high}</td>
              <td className="border p-1">{s.todays_low}</td>
              <td className="border p-1"></td>
              <td className="border p-1">{s.hist_volume}</td>
              <td className="border p-1 text-center space-x-2">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
                  onClick={() => handleTrade("buy", s.ticker)}
                >
                  Buy
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                  onClick={() => handleTrade("sell", s.ticker)}
                >
                  Sell
                </button>
              </td>
              <td className="border p-1 text-center">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                  onClick={() => handleViewChart(s.ticker)}
                  type="button"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chart Modal */}
      {chartOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setChartOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-[90%] max-w-3xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">
                {chartTicker} — Candlestick
              </h2>
              <button
                className="px-2 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setChartOpen(false)}
              >
                Close
              </button>
            </div>
            <div ref={chartRef} className="w-full h-[360px]" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
