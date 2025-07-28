import "../App.css";
import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Orders() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <h1 className="text-3xl text-gray-900 font-bold mt-2 ml-6 text-left">My Orders</h1>

      <Link to="/watchlist">
        <button id="home" className="px-4 py-2 rounded border bg-white hover:bg-gray-100">
          Watchlist
        </button>
      </Link>
    </div>
  );
}

export default Orders;
