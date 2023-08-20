import { DirectionT } from "../Types/DirectionType";
import { BASE_URL } from "../http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../interceptor";

export const directionApi = createApi({
  reducerPath: "direction",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getDirections: builder.query<DirectionT[], any>({
      query: () => ({
        url: `/directions`,
      }),
    }),
    getDirectionById: builder.query<DirectionT, string>({
      query: (id: string) => ({
        url: `/directions/${id}`,
      }),
    }),

    /* addPage: builder.mutation<null, AddExpoPageReqT>({
			query: ({ body, eventId }) => ({
				url: `/${eventId}/pages`,
				method: "POST",
				body,
			}),
			invalidatesTags: [{ type: "Pages", id: "LIST" }],
		}),
		updatePage: builder.mutation<null, UpdateExpoPageReq>({
			query: ({ id, body, eventId }) => ({
				url: `/${eventId}/pages/${id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: "Pages", id }],
		}),
		deletePage: builder.mutation<null, DeleteExpoPageReq>({
			query: ({ id, eventId }) => ({
				url: `/${eventId}/pages/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, id) => [{ type: "Pages", id: "LIST" }],
		}), */
  }),
});

export const { useGetDirectionsQuery, useGetDirectionByIdQuery } = directionApi;
