import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";

function Watchlist() {
  const [stocksByTicker, setStocksByTicker] = useState({});

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/stocks")
      .then((response) => {
        setStocksByTicker(response.data);
      })
      .catch((error) => {
        console.error("Error fetching stocks:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <h1 className="text-3xl text-gray-900 font-bold mt-2 ml-6 text-left">My Watchlist</h1>

      <div className="ml-6 mt-4">
        <h2 className="text-xl font-semibold">Stock Data</h2>
        
        {Object.keys(stocksByTicker).length === 0 ? (
          <p className="ml-2 mt-2">Loading or no data...</p>
        ) : (
          Object.entries(stocksByTicker).map(([ticker, stocks]) => (
            <div key={ticker} className="mb-4">
              <h3 className="text-lg font-bold capitalize">{ticker}</h3>
              <ul className="list-disc ml-5 mt-1">
                {stocks.map((stock, index) => (
                  <li key={index}>
                    {`Timestamp: ${stock.timestamp}, Open: ${stock.open}, High: ${stock.high}, Low: ${stock.low}, Close: ${stock.close}, Volume: ${stock.volume}`}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Watchlist;