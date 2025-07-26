import "./App.css";

import HomeScreen from "./components/Home";
import Game from "./components/Game";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/player-screen" element={<Game />} />
          <Route path="/bot-screen" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
