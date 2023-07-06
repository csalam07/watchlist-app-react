import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const data = useSelector((state) => state.watchlist.watchlist);

  return (
    <header className="w-full shodow-xl bg-gray-50">
      <div className="max-w-7xl flex items-center justify-between mx-auto p-3 md:p-5">
        <NavLink
          to="/"
          className="font-black text-xs sm:text-lg md:text-xl font-satoshi"
        >
          Stock Watchlist
        </NavLink>
        <nav className="flex gap-4 items-center">
          <NavLink to="/" className="text-gray-600 text-sm">
            Home
          </NavLink>
          <NavLink to="/watchlist" className="text-gray-600 text-sm">
            WatchList <span className="text-red-400">({data.length})</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
