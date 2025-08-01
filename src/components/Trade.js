// src/components/Trade.js
import "../App.css";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import AccountTable from "./AccountTable";
import { useLocation, useNavigate } from "react-router-dom";

function Trade() {
  const [timestamps, setTimestamps] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState("");
  const [tradeAction, setTradeAction] = useState(""); // BUY / SELL
  const [ticker, setTicker] = useState("AAPL");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [tradeType, setTradeType] = useState("LIMIT"); // LIMIT / MARKET
  const [account, setAccount] = useState({ account_number: "", cash_total: 0 });

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Pre-fill from query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const actionParam = params.get("action");
    const tickerParam = params.get("ticker");
    if (actionParam) setTradeAction(actionParam.toUpperCase());
    if (tickerParam) setTicker(tickerParam.toUpperCase());
  }, [location.search]);

  // Account and timestamps
  useEffect(() => {
    axios.get("http://localhost:8000/account-details").then((res) => {
      setAccount(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/timestamps").then((res) => {
      setTimestamps(res.data);
      if (res.data.length > 0) setSelectedTimestamp(res.data[0]);
    });
  }, []);

  const handleTrade = (type) => setTradeAction(type);

  const tickerOptions = ["AAPL", "GOOG", "IBM", "MSFT", "TSLA", "UL", "WMT"];

  const totalAmount = useMemo(() => {
    const p = parseFloat(price);
    const q = parseInt(quantity || "0", 10);
    return Number.isFinite(p) && Number.isFinite(q) ? p * q : 0;
  }, [price, quantity]);

  const allFieldsValid =
    !!tradeAction &&
    !!ticker &&
    !!tradeType &&
    !!selectedTimestamp &&
    price !== "" &&
    quantity !== "" &&
    parseFloat(price) > 0 &&
    parseInt(quantity || "0", 10) > 0;

  const openConfirm = () => {
    if (!allFieldsValid) {
      alert("Please fill in all fields with valid values.");
      return;
    }
    setShowModal(true);
  };

  const sendOrder = async () => {
    // Build payload for FastAPI /orders
    const payload = {
      ticker,
      action: tradeAction,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      trade_type: tradeType,
      datetime: selectedTimestamp,   // backend stores as text
      account_number: 219771,        // fixed for now
    };

    try {
      setSubmitting(true);
      const res = await axios.post("http://localhost:8000/orders", payload);
      setShowModal(false);
      alert("Trade recorded successfully.");
      // (Optional) Navigate to Orders page so user can see the row
      navigate("/orders");
      // Or reset the form instead:
      // setPrice(""); setQuantity(""); setTradeType("LIMIT"); setTradeAction("");
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.detail ??
          "Failed to record trade. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <h1 className="text-3xl text-gray-900 font-bold mt-2 ml-6 text-left">
        Trade
      </h1>

      <div className="ml-6 mt-4">
        <label className="mr-2 font-semibold">Select Timestamp:</label>
        <select
          value={selectedTimestamp}
          onChange={(e) => setSelectedTimestamp(e.target.value)}
          className="border px-2 py-1"
        >
          {timestamps.map((ts, idx) => (
            <option key={idx} value={ts}>
              {ts}
            </option>
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

      <div className="bg-white rounded shadow-md m-6 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Trade Details
        </h2>
        <table className="w-full table-auto border-collapse">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">Trade Action</td>
              <td className="border px-4 py-2">{tradeAction || "—"}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Ticker</td>
              <td className="border px-4 py-2">
                <select
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                  className="border px-2 py-1 w-full"
                >
                  {tickerOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Price</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter Price"
                  className="border px-2 py-1 w-full"
                />
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Quantity</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter Quantity"
                  className="border px-2 py-1 w-full"
                />
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Trade Currency</td>
              <td className="border px-4 py-2">USD</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">
                Settlement Currency
              </td>
              <td className="border px-4 py-2">USD</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Payment</td>
              <td className="border px-4 py-2">CASH</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Trade Type</td>
              <td className="border px-4 py-2">
                <select
                  value={tradeType}
                  onChange={(e) => setTradeType(e.target.value)}
                  className="border px-2 py-1 w-full"
                >
                  <option value="LIMIT">LIMIT</option>
                  <option value="MARKET">MARKET</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Trade Date</td>
              <td className="border px-4 py-2">{selectedTimestamp}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 text-center">
          <button
            className={`px-6 py-2 rounded text-white ${
              allFieldsValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={openConfirm}
            disabled={!allFieldsValid}
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Confirm Trade
            </h2>
            <table className="w-full table-auto border-collapse text-left">
              <tbody>
                <tr>
                  <td className="font-semibold">Trade Action:</td>
                  <td>{tradeAction}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Ticker:</td>
                  <td>{ticker}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Price:</td>
                  <td>{price}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Quantity:</td>
                  <td>{quantity}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Trade Currency:</td>
                  <td>USD</td>
                </tr>
                <tr>
                  <td className="font-semibold">Settlement Currency:</td>
                  <td>USD</td>
                </tr>
                <tr>
                  <td className="font-semibold">Payment:</td>
                  <td>CASH</td>
                </tr>
                <tr>
                  <td className="font-semibold">Trade Type:</td>
                  <td>{tradeType}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Trade Date:</td>
                  <td>{selectedTimestamp}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Total Amount:</td>
                  <td>{totalAmount.toFixed(2)} USD</td>
                </tr>
                <tr>
                  <td className="font-semibold">Account Number:</td>
                  <td>219771</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-300"
                onClick={sendOrder}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Confirm Trade"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trade;
