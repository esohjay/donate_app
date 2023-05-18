import { appApi, providesList } from ".";
import { SignupInputs, GeoJSONFeatureCollection } from "../type";

type Inputs = {
  description: string;
  category: string;
  quantity: number;
  name: string;
  transaction_type: string;
};
const itemApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    addItem: build.mutation({
      query: (formBody: Inputs) => ({
        url: "/items",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [{ type: "ITEM", id: "LIST" }],
    }),
    getItems: build.query<GeoJSONFeatureCollection, void>({
      query: () => "/items",
      //   providesTags: (result) => providesList(result, "ITEM"),
    }),
    getSingleItem: build.query({
      query: () => "/items",
      providesTags: (result, error, id) => [{ type: "ITEM", id }],
    }),
  }),
  overrideExisting: false,
});
export const { useAddItemMutation, useGetSingleItemQuery, useGetItemsQuery } =
  itemApi;
