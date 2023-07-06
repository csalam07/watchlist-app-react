import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchlist: [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const company = action.payload;
      const isDuplicate = state.watchlist.some(
        (item) => item.symbol === company.symbol
      );
      if (!isDuplicate) {
        state.watchlist = [...state.watchlist, company];
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (company) => company.symbol !== action.payload
      );
    },
    updateWatchlist: (state, action) => {
      const { symbol, updatedObject } = action.payload;
      const objectIndex = state.watchlist.findIndex(
        (obj) => obj.symbol === symbol
      );
      if (objectIndex !== -1) {
        state.watchlist[objectIndex] = updatedObject;
      }
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, updateWatchlist } =
  watchlistSlice.actions;

export default watchlistSlice.reducer;
