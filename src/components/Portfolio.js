import "../App.css";
import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <h1 className="text-3xl text-gray-900 font-bold mt-2 ml-6 text-left">Portfolio Page</h1>
    </div>
  );
}

export default Portfolio;
