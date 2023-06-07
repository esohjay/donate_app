import { appApi } from ".";
import { SignupInputs, GeoJSONFeature } from "../type";

const authApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (formBody: SignupInputs) => ({
        url: "/users",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [{ type: "AUTH", id: "LIST" }],
    }),
    getSingleUser: build.query<GeoJSONFeature, string | undefined>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "AUTH", id }],
    }),
    // updateLeave: build.mutation({
    //   query: (formBody) => ({
    //     url: `/leave/${formBody.id}`,
    //     method: "PUT",
    //     body: formBody,
    //   }),
    //   invalidatesTags: [{ type: "Leave", id: "LEAVELIST" }],
    // }),
    // getLeaveRequests: build.query({
    //   query: () => "/leave",
    //   providesTags: (result) =>
    //     // is result available?
    //     result
    //       ? // successful query
    //         [
    //           ...result.map(({ id }) => ({ type: "Leave", id })),
    //           { type: "Leave", id: "LEAVELIST" },
    //         ]
    //       : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LEAVELIST' }` is invalidated
    //         [{ type: "Leave", id: "LEAVELIST" }],
    // }),
    // getLeave: build.query({
    //   query: (id) => ({
    //     url: `/leave/${id}`,
    //   }),
    //   providesTags: (result, error, id) => [{ type: "Leave", id }],
    // }),
    // deleteLeave: build.mutation({
    //   query(id) {
    //     return {
    //       url: `leave/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   // Invalidates all queries that subscribe to this Staff `id` only.
    //   invalidatesTags: (result, error, id) => [{ type: "leave", id }],
    // }),
  }),
  overrideExisting: false,
});
export const { useRegisterUserMutation, useGetSingleUserQuery } = authApi;
