import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAlertHandler } from "../../util/queryAlertHandler";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
});

export const profileApiSlice = createApi({
  reducerPath: "profile",
  baseQuery,
  tagTypes: ["Profile"],
  endpoints: (builder) => {
    return {
      getCurrentProfile: builder.query({
        query: () => "/profiles/me",
        providesTags: ["Profile"],
      }),
      getAllProfiles: builder.query({
        query: () => "/profiles",
      }),
      getProfileById: builder.query({
        query: (userId) => `/profiles/user/${userId}`,
        // providesTags: ["Profiles"]
      }),
      getGithubRepos: builder.query({
        query: (username) => `/profiles/github/${username}`,
      }),

      createProfile: builder.mutation({
        query: (profile) => ({
          url: "/profiles",
          method: "POST",
          body: profile,
        }),
        invalidatesTags: ["Profile"],
      }),

      deleteProfile: builder.mutation({
        query: () => ({
          url: "/profiles",
          method: "DELETE",
        }),
        invalidatesTags: ["Profile"],
        onQueryStarted: createAlertHandler(
          "Your account has been permanently deleted!",
          "Account could not be deleted!",
        ),
      }),

      addExperience: builder.mutation({
        query: (formData) => ({
          url: "/profiles/experience",
          method: "PATCH",
          body: formData,
        }),
        invalidatesTags: ["Profile"],
        onQueryStarted: createAlertHandler(
          "Experience Added!",
          "Experience could not be added!",
        ),
      }),

      addEducation: builder.mutation({
        query: (formData) => ({
          url: "/profiles/education",
          method: "PATCH",
          body: formData,
        }),
        invalidatesTags: ["Profile"],
        onQueryStarted: createAlertHandler(
          "Education Added!",
          "Education could not be Added!",
        ),
      }),

      deleteExperience: builder.mutation({
        query: (expId) => ({
          url: `/profiles/experience/${expId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Profile"],
        onQueryStarted: createAlertHandler(
          "Experience Deleted!",
          "Experience could not be deleted!",
        ),
      }),

      deleteEducation: builder.mutation({
        query: (eduId) => ({
          url: `/profiles/education/${eduId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Profile"],
        onQueryStarted: createAlertHandler(
          "Education Deleted!",
          "Education could not be deleted!",
        ),
      }),
    };
  },
});

// RTK Query automatically creates this hook based on the name of our getCurrentProfile function
export const {
  useGetCurrentProfileQuery,
  useGetAllProfilesQuery,
  useGetProfileByIdQuery,
  useGetGithubReposQuery,
  useCreateProfileMutation,
  useDeleteProfileMutation,
  useAddExperienceMutation,
  useAddEducationMutation,
  useDeleteEducationMutation,
  useDeleteExperienceMutation,
} = profileApiSlice;
