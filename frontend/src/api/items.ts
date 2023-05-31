import { appApi } from ".";
import { GeoJSONFeature, GeoJSONFeatureCollection } from "../type";

type Inputs = {
  description: string;
  category: string;
  quantity: number;
  name: string;
  transaction_type: string;
  user: string | undefined;
  cordinates: string;
};
// function getItemsProvidesTags(result: GeoJSONFeatureCollection | undefined, error: any): string[]  {
//   if (error) {
//     return ['ITEM'];
//   }

//   if (result) {
//     return result.features.map((feature) => ({
//       type: 'ITEM' as const,
//       id: feature.properties.id.toString(),
//     }));
//   }

//   return ['ITEM'];
// }

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
      providesTags: (result, error, args) => {
        if (error) {
          return ["ITEM"];
        }

        if (result) {
          return [
            ...result.features.map((feature) => ({
              type: "ITEM" as const,
              id: feature.id.toString(),
            })),
          ];
        }

        return ["ITEM"];
      },
    }),
    getSingleItem: build.query<GeoJSONFeature, string | undefined>({
      query: (id) => `/items/${id}`,
      providesTags: (result, error, id) => [{ type: "ITEM", id }],
    }),
  }),
  overrideExisting: false,
});
export const { useAddItemMutation, useGetSingleItemQuery, useGetItemsQuery } =
  itemApi;
