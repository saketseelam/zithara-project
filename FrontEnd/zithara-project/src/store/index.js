import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
const store = configureStore({
  reducer: { [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefualtMiddleware) =>
    getDefualtMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
