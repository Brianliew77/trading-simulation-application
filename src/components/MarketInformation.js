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

// Split "A|B|C" -> ["A","B","C"] and render badges
function TopicBadges({ value }) {
  if (!value) return <span className="text-gray-400">—</span>;
  const parts = String(value).split("|").map(s => s.trim()).filter(Boolean);
  return (
    <div className="flex flex-wrap gap-1">
      {parts.map((p, i) => (
        <span
          key={`${p}-${i}`}
          className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                     bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-200"
          title={p}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

// Clamp to 2 lines (fallback if you don't use the line-clamp plugin)
function TwoLineClamp({ children, title }) {
  return (
    <div
      title={title}
      className="max-w-[52rem] leading-snug
                 [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]
                 overflow-hidden"
    >
      {children}
    </div>
  );
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
                  <td className="px-4 py-4 text-center text-gray-600" colSpan={4}>No news found.</td>
                </tr>
              ) : (
                items.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {/* Headline — clamp to 2 lines */}
                    <td className="px-4 py-3 align-top">
                      <TwoLineClamp title={row.headline}>
                        <span className="text-gray-900">{row.headline}</span>
                      </TwoLineClamp>
                    </td>

                    {/* Timestamp — keep on one line, slightly muted */}
                    <td className="px-4 py-3 align-top whitespace-nowrap text-gray-700">
                      {row.timestamp_human || "—"}
                    </td>

                    {/* Topic Tags — badges with wrap */}
                    <td className="px-4 py-3 align-top text-gray-700">
                      <TopicBadges value={row.topic_tags} />
                    </td>

                    {/* Sentiment — you already color this cell; keep centered */}
                    <td
                      className={[
                        "px-4 py-3 text-center font-medium whitespace-nowrap min-w-[140px]",
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
