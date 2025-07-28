import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div
        className="flex justify-center md:justify-start items-center w-full md:w-auto md:order-1"
        id="mobile-menu-4"
      >
        <ul className="flex flex-row space-x-8 text-md md:text-lg font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/equities">Equities</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
