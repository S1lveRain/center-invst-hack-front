import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { BASE_URL } from "./http";
import { RootState } from "./store";
import { createToken } from "./slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const tokenState = getState() as RootState;
    const token = tokenState.token.tokenValue;
    if (token && endpoint !== "refresh") {
      headers.set("authorization", `Bearer ${token}`);
      // headers.set('content-type', 'text/plain');
    }
    return headers;
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        credentials: "include",
        url: "refresh",
      },
      { ...api, endpoint: "refresh" },
      extraOptions
    );

    if (refreshResult.data) {
      api.dispatch(createToken(refreshResult.data as any));
      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(removeToken())
    }
  }
  return result;
};

export default customFetchBase;
