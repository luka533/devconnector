import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAlertHandler } from "../../util/queryAlertHandler";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
});

export const postApiSlice = createApi({
  reducerPath: "post",
  baseQuery,
  tagTypes: ["Post", "Posts"],
  endpoints: (builder) => {
    return {
      getAllPosts: builder.query({
        query: () => "/posts",
        providesTags: ["Posts"],
      }),
      getPost: builder.query({
        query: (id) => `/posts/${id}`,
        providesTags: ["Post"],
      }),
      addPost: builder.mutation({
        query: (formData) => ({
          url: "/posts",
          method: "POST",
          body: formData,
        }),
        invalidatesTags: ["Post", "Posts"],
        onQueryStarted: createAlertHandler(
          "Post Added!",
          "Post could not be added!",
        ),
      }),
      deletePost: builder.mutation({
        query: (postId) => ({
          url: `/posts/${postId}`,
          method: "DELETE",
          body: postId,
        }),
        invalidatesTags: ["Post", "Posts"],
      }),
      addLike: builder.mutation({
        query: (postId) => ({
          url: `/posts/like/${postId}`,
          method: "PATCH",
          body: postId,
        }),
        invalidatesTags: ["Post", "Posts"],
      }),
      removeLike: builder.mutation({
        query: (postId) => ({
          url: `/posts/unlike/${postId}`,
          method: "PATCH",
          body: postId,
        }),
        invalidatesTags: ["Post", "Posts"],
      }),
      addComment: builder.mutation({
        query: ({ postId, text }) => ({
          url: `/posts/comment/${postId}`,
          method: "PATCH",
          body: { text },
        }),
        invalidatesTags: ["Post", "Posts"],
        onQueryStarted: createAlertHandler(
          "Comment Added!",
          "Comment could not be added!",
        ),
      }),
      removeComment: builder.mutation({
        query: ({ postId, commentId }) => ({
          url: `/posts/comment/${postId}/${commentId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Post", "Posts"],
        onQueryStarted: createAlertHandler(
          "Comment removed!",
          "Comment could not be removed!",
        ),
      }),
    };
  },
});

export const {
  useGetAllPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useAddLikeMutation,
  useRemoveLikeMutation,
  useDeletePostMutation,
  useAddCommentMutation,
  useRemoveCommentMutation,
} = postApiSlice;
