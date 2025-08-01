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

  const filteredStocks = stocks.filter((stock) => stock.quantity_owned > 0);
  const totalPnL = filteredStocks.reduce(
    (acc, stock) => acc + parseFloat(stock.profit),
    0
  ).toFixed(2);

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

      <div className="ml-6 mt-6 pr-6">
        <h2 className="text-xl font-semibold mb-2 text-left">Unrealised P&amp;L</h2>
        <table className="w-full table-auto border border-collapse">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border px-4 py-2">Ticker</th>
              <th className="border px-4 py-2">Last Price</th>
              <th className="border px-4 py-2">Quantity Owned</th>
              <th className="border px-4 py-2">Average Price</th>
              <th className="border px-4 py-2">P&amp;L</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{stock.ticker}</td>
                <td className="border px-4 py-2">{stock.last_price}</td>
                <td className="border px-4 py-2">{stock.quantity_owned}</td>
                <td className="border px-4 py-2">{stock.average_buy_price}</td>
                <td
                  className={`border px-4 py-2 font-bold ${
                    stock.profit > 0
                      ? "text-green-600"
                      : stock.profit < 0
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {stock.profit}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-bold text-center">
              <td colSpan={4} className="border px-4 py-2 text-right">Total Unrealised P&amp;L:</td>
              <td
                className={`border px-4 py-2 ${
                  totalPnL > 0
                    ? "text-green-600"
                    : totalPnL < 0
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {totalPnL}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Portfolio;
