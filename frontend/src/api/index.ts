import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { QueryDefinition } from "@reduxjs/toolkit/query";
import { RootState } from "../app/store";

import Cookies from "js-cookie";
// import { GeometryCollection } from "geojson";
import { GeoJSONFeatureCollection } from "../type";
import { GeoJSONProperties } from "../type";

// interface RootState {
//   // Define your root state here
// }

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      const authToken = Cookies.get("token");
      if (token) {
        headers.set("Authorization", token);
      } else if (authToken) {
        headers.set("Authorization", authToken);
      }

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

// export function providesList<
//   GeoJSONFeatureCollection,
//   T extends string
// >(results: GeoJSONFeatureCollection | undefined, tagType: T) {
//   return results
//     ? [
//         { type: tagType, id: "LIST" },
//         ...results.map(( id: string ) => ({ type: tagType, id })),
//       ]
//     : [{ type: tagType, id: "LIST" }];
// }

// function getItemsProvidesTags(result: GeoJSONFeatureCollection | undefined, error: any): string[] {
//   if (error) {
//     return ['ITEM' as const];
//   }

//   if (result) {
//     return [...result.features.map((feature) => ({ type: 'ITEM' as const, id: feature.properties.id.toString() }))];
//   }

//   return ['ITEM' as const];
// }

export const { useUploadMutation } = appApi;
