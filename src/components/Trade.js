import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import AccountTable from "./AccountTable"; 

function Orders() {
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
      <div className="ml-6 mt-4 space-x-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => handleTrade("BUY")}
        >
          Buy
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => handleTrade("SELL")}
        >
          Sell
        </button>
      </div>

      {message && (
        <div className="ml-6 mt-4 text-blue-800 font-semibold">
          {message}
        </div>
      )}
    </div>
  );
}

export default Orders;
