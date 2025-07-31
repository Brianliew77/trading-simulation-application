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

      <h1 className="text-3xl text-gray-900 font-bold mt-2 ml-6 text-left">Orders Book</h1>

      <table className="ml-6 mt-4 border-collapse border w-[95%] text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-1">ID</th>
            <th className="border p-1">Ticker</th>
            <th className="border p-1">Quantity</th>
            <th className="border p-1">Action</th>
            <th className="border p-1">Datetime</th>
            <th className="border p-1">Trade Type</th>
            <th className="border p-1">Account Number</th>
            <th className="border p-1">Quantity Filled</th>
            <th className="border p-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, idx) => (
            <tr key={idx} className="bg-white even:bg-gray-50">
              <td className="border p-1 text-center">{o.id}</td>
              <td className="border p-1 text-center">{o.ticker}</td>
              <td className="border p-1 text-center">{o.quantity}</td>
              <td className="border p-1 text-center">
                <span className={`px-2 py-1 rounded font-semibold text-white ${o.action === "BUY" ? "bg-green-500" : "bg-red-500"}`}>
                  {o.action}
                </span>
              </td>
              <td className="border p-1 text-center">{o.datetime}</td>
              <td className="border p-1 text-center">{o.trade_type}</td>
              <td className="border p-1 text-center">{o.account_number}</td>
              <td className="border p-1 text-center">{o.quantity_filled}</td>
              <td className="border p-1 text-center">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
