import "./App.css";

import MarketInformationScreen from "./components/MarketInformation";
import HomeScreen from "./components/Home";
import WatchlistScreen from "./components/Watchlist";
import PortfolioScreen from "./components/Portfolio";
import OrdersScreen from "./components/Orders";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/marketinformation" element={<MarketInformationScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/watchlist" element={<WatchlistScreen />} />
          <Route path="/portfolio" element={<PortfolioScreen />} />
          <Route path="/orders" element={<OrdersScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
