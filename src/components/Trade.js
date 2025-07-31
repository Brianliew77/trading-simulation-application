import "../App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Orders() {
  const [message, setMessage] = useState("");

  const handleTrade = (type) => {
    // Simulate a trade
    setMessage(`Simulated a ${type} trade.`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <h1 className="text-3xl text-gray-900 font-bold mt-2 ml-6 text-left">Trade</h1>

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
