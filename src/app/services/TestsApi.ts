import { DirectionT, TestT } from "../Types/DirectionType";
import { BASE_URL } from "../http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testsApi = createApi({
  reducerPath: "tests",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getTests: builder.query<TestT[], any>({
      query: (limit: string) => ({
        url: `/tests`,
      }),
    }),
    getTestById: builder.query<TestT, string>({
      query: (id: string) => ({
        url: `/tests/${id}`,
      }),
    }),
  }),
});

export const { useGetTestsQuery, useGetTestByIdQuery } = testsApi;
