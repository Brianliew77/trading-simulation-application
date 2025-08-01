import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import AccountTable from "./AccountTable";

function Portfolio() {
  const [account, setAccount] = useState({ account_number: "", cash_total: 0 });
  const [timestamps, setTimestamps] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState("");
  const [stocks, setStocks] = useState([]);

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
        .then((res) => {
          setStocks(res.data);
        });
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
            <option key={idx} value={ts}>{ts}</option>
          ))}
        </select>
      </div>

      <AccountTable account={account} />

      <div className="ml-6 mt-6">
        <h2 className="text-xl font-semibold mb-2">Stock Summary</h2>
        <table className="table-auto border border-collapse w-3/4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Ticker</th>
              <th className="border px-4 py-2">Last Price</th>
              <th className="border px-4 py-2">Quantity Owned</th>
              <th className="border px-4 py-2">Average Buy Price</th>
              <th className="border px-4 py-2">P&L</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{stock.ticker}</td>
                <td className="border px-4 py-2">{stock.last_price}</td>
                <td className="border px-4 py-2">{stock.quantity_owned}</td>
                <td className="border px-4 py-2">{stock.average_buy_price}</td>
                <td className="border px-4 py-2">{stock.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Portfolio;
