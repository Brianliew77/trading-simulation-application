import "../App.css";
import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Equities() {
  return (
    <div className="button-container">
      <Navigation />

      <div className="home text-4xl font-bold text-center mt-0">
        <h1 className="text-3xl text-gray-600">Equities Page</h1>

        <div className="hero container max-w-screen-lg mx-auto py-4 flex justify-center">
          <img
            src="/app-logo.jpg"
            alt="App Logo"
            width="250"
            height="250"
          />
        </div>

      </div>
    </div>
  );
}

export default Equities;
