import { DirectionT, TestT } from "../Types/DirectionType";
import { BASE_URL } from "../http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../interceptor";
import { AddCriteriaBodyT } from "../Types/TestApiReqTypes";
import { Answer } from "../slices/quizSlice";
import { CriteriaT } from "../Types/ResultsType";

const token = localStorage.getItem("token");

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
    }),
     saveAnswers: builder.mutation<
      void,
      { answers: Answer[]; testId: string | undefined }
    >({
      query: ({ answers, testId }) => {
        return {
          url: `/users/test/save/${testId}`,
          method: "POST",
          body: answers,
        };
      },
    }),
  }),
});

export const { useGetTestsQuery, useGetTestByIdQuery, useAddCriteriaMutation, useGetTestCriteriasQuery, useSaveAnswersMutation} = testsApi;
