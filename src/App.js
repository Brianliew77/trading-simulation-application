import "./App.css";

import HomeScreen from "./components/Home";
import EquitiesScreen from "./components/Equities";
import PortfolioScreen from "./components/Portfolio";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/equities" element={<EquitiesScreen />} />
          <Route path="/portfolio" element={<PortfolioScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
