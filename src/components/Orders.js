import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/order-details")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching order details:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <h1 className="text-3xl text-gray-900 font-bold mt-2 ml-6 text-left">My Orders</h1>

      <table className="ml-6 mt-4 border-collapse border w-[95%] text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-1">ID</th>
            <th className="border p-1">Ticker</th>
            <th className="border p-1">Quantity</th>
            <th className="border p-1">Action</th>
            <th className="border p-1">Portfolio Balance Change</th>
            <th className="border p-1">Datetime</th>
            <th className="border p-1">Trade Type</th>
            <th className="border p-1">Account Number</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, idx) => (
            <tr key={idx} className="bg-white even:bg-gray-50">
              <td className="border p-1 text-center">{o.id}</td>
              <td className="border p-1 text-center">{o.ticker}</td>
              <td className="border p-1 text-center">{o.quantity}</td>
              <td className="border p-1 text-center">{o.action}</td>
              <td className="border p-1 text-center">${Number(o.portfolio_balance_change).toFixed(2)}</td>
              <td className="border p-1 text-center">{o.datetime}</td>
              <td className="border p-1 text-center">{o.trade_type}</td>
              <td className="border p-1 text-center">{o.account_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
