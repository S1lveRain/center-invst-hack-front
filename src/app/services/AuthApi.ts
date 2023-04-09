import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../http";
import customFetchBase from "../interceptor";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (content) => ({
        url: "/auth/register",
        method: "POST",
        body: content,
        //   credentials: "include",
      }),
    }),
    signIn: build.mutation({
      query: (content) => ({
        url: "/auth/login",
        method: "POST",
        body: content,
        //   credentials: "include",
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useLogoutMutation } =
  authAPI;
