import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";

// Map label -> cell bg/text classes (full-cell color)
function cellClass(labelRaw) {
  const label = (labelRaw || "").toLowerCase();

  const bullish = ["bullish", "positive", "buy", "outperform", "strong buy", "overweight"];
  const bearish = ["bearish", "negative", "sell", "underperform", "strong sell", "underweight"];
  const neutral = ["neutral", "hold", "market perform"];

  if (bullish.some((w) => label.includes(w))) return "bg-green-100 text-green-900";
  if (bearish.some((w) => label.includes(w))) return "bg-red-100 text-red-900";
  if (neutral.some((w) => label.includes(w))) return "bg-gray-100 text-gray-900";
  // default
  return "bg-blue-100 text-blue-900";
}

function MarketInformation() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/market-info")
      .then((res) => setItems(res.data?.items ?? []))
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
                  Industry
                </th>
                <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">
                  Sentiment
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
                    {/* FULL-CELL COLORED, CONSISTENT SIZE */}
                    <td
                      className={[
                        "px-4 py-3 text-center font-medium whitespace-nowrap",
                        "min-w-[150px]", // consistent width
                        cellClass(row.ticker_1_label),
                      ].join(" ")}
                      title={row.ticker_1_label || ""}
                    >
                      {row.ticker_1_label || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Showing rows with <code>id</code> 1–20. Ticker label cells are color-coded and sized consistently.
        </p>
      </div>
    </div>
  );
}

export default MarketInformation;
