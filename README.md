# Trading Simulation — Frontend (React)

A single‑page React app for a paper‑trading simulation. It shows a watchlist, price/volume tables, lightweight candlestick charts, order placement, portfolio/PNL, and market news. It is designed to work with the companion FastAPI backend.

## Tech stack
- React 18 (Create React App)
- React Router
- Axios (API requests)
- Lightweight‑charts (candlesticks)
- Tailwind CSS (via PostCSS)
- Testing Library + Jest

## Project structure (high‑level)
```
src/
  components/
    Navigation.js
    Watchlist.js
    MarketInformation.js
    Trade.js
    Orders.js
    Portfolio.js
    AccountTable.js
  App.js
public/
tailwind.config.js
postcss.config.js
```

## Prerequisites
- Node.js ≥ 16
- The backend running locally (default: http://localhost:8000)

## Quick start (development)
```bash
# 1) Install deps
npm install

# 2) Configure API base URL (optional)
# Create .env in project root if backend is not at http://localhost:8000
echo "REACT_APP_API_BASE_URL=http://localhost:8000" > .env

# 3) Run dev server
npm start
# App runs at http://localhost:3000
```

## Build
```bash
npm run build
```

## Environment variables
- `REACT_APP_API_BASE_URL` — base URL of the FastAPI backend (default used in code is `http://localhost:8000`).

## Scripts
- `npm start` — run dev
- `npm test` — unit tests
- `npm run build` — production build
- `npm run eject` — CRA eject (irreversible)

## Notes
- If Tailwind styles don’t appear, ensure `index.css` imports Tailwind layers and that `tailwind.config.js` `content` paths include `./src/**/*.{js,jsx}`.
- The app expects specific response shapes from the backend (see backend README for details).
