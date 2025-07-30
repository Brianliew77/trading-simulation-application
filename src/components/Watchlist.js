import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";

function Watchlist() {
  const [timestamps, setTimestamps] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState("");
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/timestamps")
      .then(res => {
        setTimestamps(res.data);
        if (res.data.length > 0) {
          setSelectedTimestamp(res.data[0]);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedTimestamp) {
      axios.get(`http://localhost:8000/trading-data?timestamp=${selectedTimestamp}`)
        .then(res => setStocks(res.data));
    }
  }, [selectedTimestamp]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <h1 className="text-3xl text-gray-900 font-bold mt-2 ml-6 text-left">My Watchlist</h1>

      <div className="ml-6 mt-4">
        <label className="mr-2 font-semibold">Select Timestamp:</label>
        <select
          value={selectedTimestamp}
          onChange={(e) => setSelectedTimestamp(e.target.value)}
          className="border px-2 py-1"
        >
          {timestamps.map((ts, idx) => (
            <option key={idx} value={ts}>{ts}</option>
          ))}
        </select>
      </div>

      <table className="ml-6 mt-4 border-collapse border w-[95%] text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-1">Ticker</th>
            <th className="border p-1">High</th>
            <th className="border p-1">Low</th>
            <th className="border p-1">Volume (Live)</th>
            <th className="border p-1">Open</th>
            <th className="border p-1">Today's High</th>
            <th className="border p-1">Today's Low</th>
            <th className="border p-1">Close</th>
            <th className="border p-1">Volume (Hist)</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s, idx) => (
            <tr key={idx} className="bg-white even:bg-gray-50">
              <td className="border p-1">{s.ticker}</td>
              <td className="border p-1">{s.high}</td>
              <td className="border p-1">{s.low}</td>
              <td className="border p-1">{s.volume_curr_price}</td>
              <td className="border p-1">{s.open}</td>
              <td className="border p-1">{s.todays_high}</td>
              <td className="border p-1">{s.todays_low}</td>
              <td className="border p-1">{s.close}</td>
              <td className="border p-1">{s.hist_volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Watchlist;
