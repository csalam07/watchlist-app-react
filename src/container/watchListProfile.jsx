import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Plot from "react-plotly.js";
import { Loader } from "../components";

const WatchListProfile = () => {
  const apiKey = import.meta.env.VITE_ALPHA_VANTAGE_API;
  const { id } = useParams();
  const [stockCharXValues, setStockCharXValues] = useState([]);
  const [stockCharYValues, setStockCharYValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWatchData = async (symbol) => {
    setIsLoading(true);
    setError(null);
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const jsonData = await response.json();
      for (var key in jsonData["Time Series (Daily)"]) {
        stockChartXValuesFunction.push(key);
        stockChartYValuesFunction.push(
          jsonData["Time Series (Daily)"][key]["1. open"]
        );
      }
      setIsLoading(false);
      return { stockChartXValuesFunction, stockChartYValuesFunction };
    } catch (err) {
      setError(err.message || "Error occurred");
    }
  };

  useEffect(() => {
    (async () => {
      setStockCharXValues([]);
      setStockCharYValues([]);
      if (id) {
        const { stockChartXValuesFunction, stockChartYValuesFunction } =
          await getWatchData(id);
        setStockCharXValues(stockChartXValuesFunction);
        setStockCharYValues(stockChartYValuesFunction);
      }
    })();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return isLoading ? (
    <Loader />
  ) : (
    <div className="overflow-x-auto w-full mx-auto">
      <Plot
        data={[
          {
            x: stockCharXValues,
            y: stockCharYValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{
          width: 1280,
          height: 440,
          title: `Stock Market Graph for ${id}`,
        }}
      />
    </div>
  );
};

export default WatchListProfile;
