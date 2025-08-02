import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";

// Sentiment-aware coloring first
function getSentimentClass(labelRaw) {
  if (!labelRaw) return null;
  const label = String(labelRaw).toLowerCase();

  const bullish = ["bullish", "positive", "buy", "outperform", "strong buy", "overweight"];
  const bearish = ["bearish", "negative", "sell", "underperform", "strong sell", "underweight"];
  const neutral = ["neutral", "hold", "market perform"];

  if (bullish.some((w) => label.includes(w))) return "bg-green-100 text-green-800 ring-green-200";
  if (bearish.some((w) => label.includes(w))) return "bg-red-100 text-red-800 ring-red-200";
  if (neutral.some((w) => label.includes(w))) return "bg-gray-100 text-gray-800 ring-gray-200";
  return null;
}

// Stable palette fallback for arbitrary labels
const PALETTE = [
  "bg-blue-100 text-blue-800 ring-blue-200",
  "bg-purple-100 text-purple-800 ring-purple-200",
  "bg-amber-100 text-amber-800 ring-amber-200",
  "bg-emerald-100 text-emerald-800 ring-emerald-200",
  "bg-pink-100 text-pink-800 ring-pink-200",
  "bg-cyan-100 text-cyan-800 ring-cyan-200",
  "bg-indigo-100 text-indigo-800 ring-indigo-200",
];
function hashToIndex(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h) % PALETTE.length;
}
function labelClass(label) {
  if (!label) return "bg-gray-100 text-gray-800 ring-gray-200";
  const sentiment = getSentimentClass(label);
  if (sentiment) return sentiment;
  return PALETTE[hashToIndex(String(label))];
}

function MarketInformation() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/market-info")
      .then((res) => {
        // Backend returns { total, items: [...] } with ticker_1_label
        setItems(res.data?.items ?? []);
      })
      .catch((err) => {
        console.error("Error fetching market info:", err);
        setError("Failed to fetch market information.");
      });
  }, []);

  const refresh = () => {
    setError("");
    axios
      .get("http://localhost:8000/api/market-info")
      .then((res) => setItems(res.data?.items ?? []))
      .catch((err) => {
        console.error("Error fetching market info:", err);
        setError("Failed to fetch market information.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="px-6 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-3xl text-gray-900 font-bold">Market Information</h1>
          <button
            onClick={refresh}
            className="px-3 py-2 rounded-md bg-white border border-gray-300 shadow-sm hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">
                  Headline
                </th>
                <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">
                  Timestamp
                </th>
                <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">
                  Topic Tags
                </th>
                <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">
                  Ticker Label
                </th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-center text-gray-600" colSpan={4}>
                    No news found.
                  </td>
                </tr>
              ) : (
                items.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 align-top">
                      <span className="text-gray-900">{row.headline}</span>
                    </td>
                    <td className="px-4 py-3 align-top whitespace-nowrap text-gray-700">
                      {row.timestamp_human}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-700">
                      {row.topic_tags}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span
                        className={
                          "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset " +
                          labelClass(row.ticker_1_label)
                        }
                        title={row.ticker_1_label || ""}
                      >
                        {row.ticker_1_label || "—"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Showing rows with <code>id</code> 1–20. Labels are color-coded; bullish/positive in green,
          bearish/negative in red, neutral in gray. Others get a stable palette color.
        </p>
      </div>
    </div>
  );
}

export default MarketInformation;
