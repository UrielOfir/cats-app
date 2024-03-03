import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cat, CatSession } from '../../types';

const baseUrl = import.meta.env.VITE_API_URL;

export const catApi = createApi({
  reducerPath: 'catApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      return headers;
    },
    credentials: 'include', // Ensure cookies are sent with every request
  }),
  tagTypes: ['Cats'],
  endpoints: (builder) => ({

    fetchCookie: builder.query({
      query: () => 'auth/setCookie',
      providesTags: ['Cats'],
    }),

    findTop5: builder.query<Cat[], void>({
      query: () => 'cats/top',
      providesTags: ['Cats'],
    }),
    searchByName: builder.query({
      query: (name) => `cats/search?name=${name}`,
      providesTags: ['Cats'],
    }),
    likeCat: builder.mutation<{ cat: Cat; catSession: CatSession }, { id: string }>({
      query: ({ id }) => ({
        url: `cats/like/${id}`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { id }) => {
        return [{ type: 'Cats', id }];
      },
    }),
  }),
});
export const useFindTop5Query = catApi.endpoints.findTop5.useQuery;
export const useSearchByNameQuery = catApi.endpoints.searchByName.useQuery;
export const useLikeCatMutation = catApi.endpoints.likeCat.useMutation;
export const useSetCookieQuery = catApi.endpoints.fetchCookie.useQuery;
