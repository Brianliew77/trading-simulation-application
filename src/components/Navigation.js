import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded-b dark:bg-slate-300">
      <div
        className="flex justify-center md:justify-start items-center w-full md:w-auto md:order-1"
        id="mobile-menu-4"
      >
        <ul className="flex flex-row space-x-8 text-md md:text-lg font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/player-screen">Player</Link>
          </li>
          <li>
            <Link to="/bot-screen">Bot</Link>
          </li>
          <a
            href="https://github.com/ScorpiusSigma/TiktokBootCamp2022"
            target="_blank"
          >
            Github
          </a>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
