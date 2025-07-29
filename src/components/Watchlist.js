import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";

function Watchlist() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/stocks")
      .then((response) => {
        setStocks(response.data);
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
        <ul className="list-disc ml-5 mt-2">
          {stocks.length === 0 ? (
            <li>Loading or no data...</li>
          ) : (
            stocks.map((stock, index) => (
              <li key={index}>{JSON.stringify(stock)}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Watchlist;
