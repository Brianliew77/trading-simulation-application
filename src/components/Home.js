import "../App.css";
import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Home() {
  return (
    <div className="game-container">
      <Navigation />

      <div className="home text-4xl font-bold text-center mt-0">
        <h1 className="text-3xl">Trading Simulation Application</h1>

        <div className="hero container max-w-screen-lg mx-auto py-4 flex justify-center">
          <img
            src="/app-logo.jpg"
            alt="App Logo"
            width="250"
            height="250"
          />
        </div>

        <div className="space-y-3">
          <Link to="/equities">
            <button id="home" className="px-4 py-2 rounded border bg-white hover:bg-gray-100">
              Equities
            </button>
          </Link>

          <br />
        </div>
      </div>
    </div>
  );
}

export default Home;
