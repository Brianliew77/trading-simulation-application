import "./App.css";

import MarketInfoScreen from "./components/MarketInfo";
import HomeScreen from "./components/Home";
import EquitiesScreen from "./components/Equities";
import PortfolioScreen from "./components/Portfolio";
import OrdersScreen from "./components/Orders";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/marketinfo" element={<MarketInfoScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/equities" element={<EquitiesScreen />} />
          <Route path="/portfolio" element={<PortfolioScreen />} />
          <Route path="/orders" element={<OrdersScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
