# Trading Simulation — Frontend (React)

A React app for a paper‑trading simulation. It shows a watchlist, price/volume tables, lightweight candlestick charts, order placement, portfolio/PNL, and market news. It is designed to work with the companion FastAPI backend.

## Tech stack
- React 18 (Create React App)
- React Router
- Axios (API requests)
- Lightweight‑charts (candlesticks)
- Tailwind CSS (via PostCSS)
- Testing Library + Jest

## Project structure
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
### Features
- **Watchlist** – snapshot per ticker at a selected timestamp.
  - “View” opens a modal with a **candlestick** chart.
- **Trade** – prefilled from Watchlist buttons (“Buy/ Sell”).
- **Portfolio / Orders** – current holdings & order history.
- **Market Information** – curated news feed.

## Prerequisites
- Node 18+ (recommended LTS)
- NPM 9+ (or Yarn)

## Quick start (development)
```bash
cd trading-simulation-application-frontend

# 1) install
npm install

# 2) configure API base (optional – defaults to http://localhost:8000)
echo "REACT_APP_API_BASE_URL=http://localhost:8000" > .env

# 3) run dev server
npm start
```

The app expects the backend running at `http://localhost:8000`.

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
