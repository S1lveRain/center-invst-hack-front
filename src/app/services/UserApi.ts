import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "../interceptor";
import { UserT } from "../Types/UserType";
import { ResultsT } from "../Types/ResultsType";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: customFetchBase,
  tagTypes: ["User", "Results"],
  endpoints: (build) => ({
    getUser: build.query<UserT, string>({
      query: (id) => ({
        url: `users/${id}`,
      }),
      providesTags: (result) => ["User"],
    }),
    getUsers: build.query<UserT[], string>({
      query: () => ({
        url: "users",
      }),
      providesTags: (result) => ["User"],
    }),
    allTests: build.query<ResultsT[], void>({
      query: () => ({
        url: "users/test/results",
      }),
      providesTags: (result) => ["Results"],
    }),
    updateUser: build.mutation({
      query: ({ content, id }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: content,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useAllTestsQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} = userAPI;
