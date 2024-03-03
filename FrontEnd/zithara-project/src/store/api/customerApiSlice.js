import { apiSlice } from "./apiSlice";
import { CUSTOMERS_URL } from "../../constants";

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerDetails: builder.query({
      query: ({ page, sort, search }) => ({
        url: `${CUSTOMERS_URL}?page=${page}&sort=${sort || "sno"}${
          search ? "&search=" + search : ""
        }`,
      }),
    }),
  }),
});

export const { useGetCustomerDetailsQuery } = customerApiSlice;
