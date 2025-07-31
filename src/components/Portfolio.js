import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import AccountTable from "./AccountTable"; 

function Portfolio() {
  const [account, setAccount] = useState({ account_number: "", cash_total: 0 });
  const [timestamps, setTimestamps] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState("");

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
    axios.get("http://localhost:8000/account-details")
      .then(res => setAccount(res.data));
  }, []);

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
    </div>
  );
}

export default Portfolio;
