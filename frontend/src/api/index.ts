import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    // prepareHeaders: (headers) => {
    //   headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    //   headers.set("Access-Control-Allow-Origin", "*");
    //   headers.set("Access-Control-Allow-Headers", "Content-Type");
    //   //   const authToken = Cookies.get("token");
    //   //   if (authToken) headers.set("Authorization", authToken);
    //   return headers;
    // },
  }),
  tagTypes: ["AUTH"],
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: (formBody) => ({
        url: "/applicant/upload",
        method: "POST",
        body: formBody,
      }),
    }),
  }),
});

export const { useUploadMutation } = appApi;
