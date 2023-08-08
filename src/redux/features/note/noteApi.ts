import { api } from "../../api/apiSlice";

const noteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "/categories",
    }),
    getNoteOfSelectedCategory: builder.query({
      query: ({ categoryId, page }) =>
        `/notes/${categoryId}?page=${page}&limit=2`,
    }),

    saveNote: builder.mutation({
      query: (data) => ({
        url: "/notes",
        method: "POST",
        body: data,
      }),
    }),
    updateNote: builder.mutation({
      query: ({ id, data }) => ({
        url: `/notes/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useSaveNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useLazyGetNoteOfSelectedCategoryQuery,
  useGetNoteOfSelectedCategoryQuery,
} = noteApi;
