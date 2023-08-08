import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://note-organizer-backend.vercel.app/api/v1/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      headers.set("Content-type", "application/json");
      return headers;
    },
  }),
  endpoints: () => ({}),
});
