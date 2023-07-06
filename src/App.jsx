import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, WatchList, WatchListProfile } from "./container";
import { Header } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/watchlist/:id" element={<WatchListProfile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
