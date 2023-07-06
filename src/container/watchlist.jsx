import { useDispatch, useSelector } from "react-redux";
import { getPriceColor } from "../utils/getPriceColor";
import { removeFromWatchlist } from "../redux/slices/watchlistSlice";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const WatchList = () => {
  const dispatch = useDispatch();
  const watchlists = useSelector((state) => state.watchlist.watchlist);

  const handleRemoveToWatchList = (comapny) => {
    dispatch(removeFromWatchlist(comapny));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Stock Watchlist</h2>
      <div className="overflow-x-auto">
        {watchlists.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-t border-l border-r">
                  Symbol
                </th>
                <th className="py-2 px-4 border-b border-t border-r">
                  Company Name
                </th>
                <th className="py-2 px-4 border-b border-t border-r">
                  Market Open
                </th>
                <th className="py-2 px-4 border-b border-t border-r">
                  Market Close
                </th>
                <th className="py-2 px-4 border-b border-t border-r">
                  Currency
                </th>
                <th className="py-2 px-4 border-b border-t border-r">
                  Match Score
                </th>
                <th className="py-2 px-4 border-b border-t border-r">Action</th>
              </tr>
            </thead>
            <tbody>
              {watchlists.map((result) => (
                <tr key={result.symbol} className="border-b">
                  <td className="py-2 px-4 border-l border-r text-gray-900 text-sm">
                    {result.symbol}
                  </td>
                  <td className="py-2 px-4 border-r text-sm text-gray-900">
                    {result.companyName}
                  </td>
                  <td className="py-2 px-4 border-r text-yellow-700">
                    {result.marketOpen}
                  </td>
                  <td className="py-2 px-4 border-r text-yellow-700">
                    {result.marketClose}
                  </td>
                  <td className="py-2 px-4 border-r text-blue-400">
                    {result.currency}
                  </td>
                  <td
                    className={`py-2 px-4 border-r ${getPriceColor(
                      result.matchScore
                    )}`}
                  >
                    {result.matchScore}
                  </td>
                  <td className="py-2 px-4 border-r flex items-center gap-2">
                    <button
                      className="bg-red-500 p-1 rounded-lg"
                      onClick={() => handleRemoveToWatchList(result.symbol)}
                    >
                      <TrashIcon className="w-3 h-3 text-white" />
                    </button>
                    <Link
                      to={result.symbol}
                      className="bg-blue-500 p-1 rounded-lg"
                    >
                      <EyeIcon className="w-3 h-3 text-white" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 mt-4">No stock data available.</p>
        )}
      </div>
    </div>
  );
};

export default WatchList;
