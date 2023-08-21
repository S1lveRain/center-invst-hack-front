import { DirectionT, TestT } from "../Types/DirectionType";
import { BASE_URL } from "../http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../interceptor";
import { AddCriteriaBodyT } from "../Types/TestApiReqTypes";
import { CriteriaT } from "../Types/ResultsType";

export const testsApi = createApi({
  reducerPath: "tests",
  baseQuery: customFetchBase,
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
    getTestCriterias: builder.query<CriteriaT[], string>({
      query: (id: string) => ({
        url: `/tests/${id}/criteria`,
      }),
    }),
    addCriteria: builder.mutation<null, AddCriteriaBodyT >({
      query: ({id, name}) => ({
        url: `/tests/${id}/add-criteria`,
        method: "POST",
        body: {
          name,
        },
      })
    })
   
  }),
});

export const { useGetTestsQuery, useGetTestByIdQuery, useAddCriteriaMutation, useGetTestCriteriasQuery} = testsApi;
