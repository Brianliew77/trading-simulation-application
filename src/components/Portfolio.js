import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import AccountTable from "./AccountTable";

function Portfolio() {
  const [account, setAccount] = useState({ account_number: "", cash_total: 0 });
  const [timestamps, setTimestamps] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState("");
  const [lastPrices, setLastPrices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/timestamps").then((res) => {
      setTimestamps(res.data);
      if (res.data.length > 0) {
        setSelectedTimestamp(res.data[0]);
      }
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/account-details").then((res) => {
      setAccount(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedTimestamp) {
      axios
        .get(`http://localhost:8000/trading-last-price?timestamp=${selectedTimestamp}`)
        .then((res) => setLastPrices(res.data));
    }
  }, [selectedTimestamp]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <h1 className="text-3xl text-gray-900 font-bold mt-2 ml-6 text-left">My Portfolio</h1>

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

      <AccountTable account={account} />

      <div className="mt-6 ml-6">
        <h2 className="text-xl font-semibold mb-2">Latest Prices</h2>
        <table className="min-w-[400px] bg-white border border-gray-300 rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Ticker</th>
              <th className="px-4 py-2 text-left">Last Price</th>
            </tr>
          </thead>
          <tbody>
            {lastPrices.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{item.ticker}</td>
                <td className="px-4 py-2">${item.last_price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Portfolio;
