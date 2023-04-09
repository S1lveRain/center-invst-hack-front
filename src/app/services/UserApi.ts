import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "../interceptor";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => ({
        url: `users/${id}`,
      }),
      providesTags: (result) => ["User"],
    }),
    getUsers: build.query({
      query: () => ({
        url: "users",
      }),
      providesTags: (result) => ["User"],
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery } = userAPI;
