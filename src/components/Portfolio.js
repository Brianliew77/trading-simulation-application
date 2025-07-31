import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";

function Portfolio() {
  const [account, setAccount] = useState({ account_number: "", cash_balance: 0 });

  useEffect(() => {
    axios.get("http://localhost:8000/account-details")
      .then(res => {
        setAccount(res.data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <h1 className="text-3xl text-gray-900 font-bold mt-2 ml-6 text-left">My Portfolio</h1>

<div className="ml-6 mt-4 w-[95%]">
  <table className="border-collapse border w-full text-sm">
    <thead>
      <tr className="bg-gray-200">
        <th className="border p-2 text-center">Account Number</th>
        <th className="border p-2 text-center">Cash Balance</th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-white even:bg-gray-50">
        <td className="border p-2">{account.account_number}</td>
        <td className="border p-2">${account.cash_balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
      </tr>
    </tbody>
  </table>
</div>
    </div>
  );
}

export default Portfolio;
