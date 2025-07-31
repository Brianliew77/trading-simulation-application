import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import AccountTable from "./AccountTable"; // 

function Portfolio() {
  const [account, setAccount] = useState({ account_number: "", cash_balance: 0 });

  useEffect(() => {
    axios.get("http://localhost:8000/account-details")
      .then(res => setAccount(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <h1 className="text-3xl text-gray-900 font-bold mt-2 ml-6 text-left">My Portfolio</h1>
      <AccountTable account={account} />
    </div>
  );
}

export default Portfolio;
