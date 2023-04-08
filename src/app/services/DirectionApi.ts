
import { API_URL } from "../http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const directionApi = createApi({
	reducerPath: "direction",
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}`,
	}),
	tagTypes: ["Direction"],
	endpoints: builder => ({
		getDirections: builder.query<DirectionT[], undefined>({
			query: () => ({
				url: `/directions`,
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

export const {
	useGetDirectionsQuery,

} = directionApi;
