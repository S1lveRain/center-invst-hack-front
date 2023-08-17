import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "../interceptor";
import { UserT } from "../Types/UserType";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
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
    updateUser: build.mutation({
      query: ({content, id}) => ({
        url: `users/${id}`,
        method: "PUT",
        body: content,
      }),
      
    })
  }),
});

export const { useGetUserQuery, useGetUsersQuery, useUpdateUserMutation } = userAPI;
