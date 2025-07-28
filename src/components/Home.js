import "../App.css";
import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Home() {
  return (
    <div>
    <div className="game-container">
    <Navigation />
    </div>
    <div className="home text-4xl font-bold">
      
      <h1 className="text-3xl">Trading Simulation Application</h1>
      <br />
      <div className="hero container max-w-screen-lg mx-auto pb-10 flex justify-center">
      <img
        src="/app-logo.jpg"
        alt="App Logo"
        width="250" 
        height="250"
      />
      </div>
      <div>
        <Link to="/player-screen">
          <button id="home" className="">
            Player
          </button>
        </Link>
      </div>
      <br />
      <div>
        <Link to="/bot-screen">
          <button id="home">Bot</button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Home;
