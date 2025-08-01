import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-gray-600 text-white px-4 py-3 shadow-md">
      <div
        className="flex justify-center md:justify-start items-center w-full md:w-auto md:order-1"
        id="mobile-menu-4"
      >
        <ul className="flex flex-row space-x-8 text-md md:text-lg font-medium">
          <li>
            <Link to="/">Market Information</Link>
          </li>
          <li>
            <Link to="/watchlist">Watchlist</Link>
          </li>
          <li>
            <Link to="/trade">Trade</Link>
          </li>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
