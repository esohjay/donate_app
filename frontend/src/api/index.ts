import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: (headers) => {
      const authToken = Cookies.get("token");
      if (authToken) headers.set("Authorization", authToken);
      return headers;
    },
  }),
  tagTypes: ["AUTH", "ITEM"],
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

export function providesList<
  R extends { id: string | number }[],
  T extends string
>(resultsWithIds: R | undefined, tagType: T) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

export const { useUploadMutation } = appApi;
