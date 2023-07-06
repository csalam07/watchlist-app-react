import { useEffect, useState } from "react";
import useDebouncevalue from "../../hooks/useDebounce";
import { getPriceColor } from "../../utils/getPriceColor";
import Loader from "../Loader";
import { addToWatchlist } from "../../redux/slices/watchlistSlice";
import { useDispatch } from "react-redux";
import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const CompanyList = ({ searchTerm }) => {
  const debouncedValue = useDebouncevalue(searchTerm);
  const apiKey = import.meta.env.VITE_ALPHA_VANTAGE_API;

  const [stockData, setStockData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getWatchData = async (term) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const jsonData = await response.json();
      setIsLoading(false);
      return jsonData["bestMatches"];
    } catch (err) {
      setError(err.message || "Error occurred");
    }
  };

  useEffect(() => {
    (async () => {
      setStockData([]);
      if (debouncedValue.length > 0) {
        const data = await getWatchData(debouncedValue);
        setStockData(data);
      }
    })();
  }, [debouncedValue]);

  const handleAddToWatchList = (result) => {
    const data = {
      symbol: result["1. symbol"],
      companyName: result["2. name"],
      type: result["3. type"],
      region: result["4. region"],
      marketOpen: result["5. marketOpen"],
      marketClose: result["6. marketClose"],
      timezone: result["7. timezone"],
      currency: result["8. currency"],
      matchScore: result["9. matchScore"],
    };
    dispatch(addToWatchlist(data));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  return isLoading ? (
    <Loader />
  ) : (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-5 font-satoshi text-center">
        Stock Watchlist
      </h2>
      <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 w-full">
        {stockData.length > 0 ? (
          stockData.map((result) => (
            <div
              key={result["1. symbol"]}
              className="flex justify-between rounded-2xl px-3 py-4 bg-gray-50 hover:shadow-md cursor-pointer transition duration-200 ease-in-out"
            >
              <div className="flex flex-col items-start justify-center">
                <p className="text-base font-medium text-navy-700">
                  {result["2. name"]}
                </p>
                <p className="flex items-center text-xs text-gray-600 italic">
                  {result["1. symbol"]}
                  <span
                    className={`flex items-center gap-1 ml-2 ${getPriceColor(
                      result["9. matchScore"]
                    )}`}
                  >
                    {result["9. matchScore"] > 0 ? (
                      <ArrowLongUpIcon className="h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowLongDownIcon className="h-3 w-3 text-red-500" />
                    )}{" "}
                    {result["9. matchScore"]}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link to={`watchlist/${result["1. symbol"]}`}>
                  <EyeIcon className="text-red-400 w-6 h-6" />
                </Link>
                <PlusIcon
                  className="text-blue-400 w-6 h-6"
                  onClick={() => handleAddToWatchList(result)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="w-full mx-auto">
            <img src="/homepage.gif" alt="" className="mx-auto" />
            <p className="text-gray-600 mt-4">
              No stock data available.Please search to see
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
