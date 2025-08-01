import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import AccountTable from "./AccountTable"; 

function Trade() {
  const [message, setMessage] = useState("");
  const [timestamps, setTimestamps] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState("");

  const handleTrade = (type) => {
    // Simulate a trade
    setMessage(`Simulated a ${type} trade.`);
  };

  const [account, setAccount] = useState({ account_number: "", cash_total: 0 });

  useEffect(() => {
    axios.get("http://localhost:8000/account-details")
      .then(res => setAccount(res.data));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/timestamps").then((res) => {
      setTimestamps(res.data);
      if (res.data.length > 0) {
        setSelectedTimestamp(res.data[0]);
      }
    });
  }, []);

  
  return (
  <div className="min-h-screen bg-gray-100">
    <Navigation />
    <h1 className="text-3xl text-gray-900 font-bold mt-2 ml-6 text-left">Trade</h1>

    {/* Timestamp Selector */}
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

    {/* Account Summary */}
    <AccountTable account={account} />

    {/* Buy/Sell Buttons */}
    <div className="ml-6 mt-4 space-x-4">
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => setMessage("BUY")}
      >
        Buy
      </button>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={() => setMessage("SELL")}
      >
        Sell
      </button>
    </div>

    {/* Trade Input Table */}
    <div className="ml-6 mt-6 mr-6 bg-white border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Trade Details</h2>
      <table className="w-full table-auto border-collapse">
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-medium">Trade Action</td>
            <td className="border px-4 py-2">{message}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-medium">Price</td>
            <td className="border px-4 py-2">
              <input
                type="number"
                className="w-full border px-2 py-1"
                placeholder="Enter Price"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-medium">Quantity</td>
            <td className="border px-4 py-2">
              <input
                type="number"
                className="w-full border px-2 py-1"
                placeholder="Enter Quantity"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-medium">Trade Currency</td>
            <td className="border px-4 py-2">USD</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-medium">Settlement Currency</td>
            <td className="border px-4 py-2">USD</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-medium">Payment</td>
            <td className="border px-4 py-2">CASH</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-medium">Trade Type</td>
            <td className="border px-4 py-2">
              <select className="w-full border px-2 py-1">
                <option value="LIMIT">LIMIT</option>
                <option value="MARKET">MARKET</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-medium">Trade Date</td>
            <td className="border px-4 py-2">{selectedTimestamp}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
}

export default Trade;
