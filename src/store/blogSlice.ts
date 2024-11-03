import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  BlogTopArticles,
  BlogCategories,
  LatestArticle,
} from "@/interfaces/blog.interface"; // Import the Blog interfaces
import { api } from "@/services/axios";
import { useLocale } from "next-intl";

interface BlogState {
  topArticles: BlogTopArticles[];
  categories: BlogCategories[];
  latestArticle: LatestArticle | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  topArticles: [],
  categories: [],
  latestArticle: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchBlogStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBlogSuccess(
      state,
      action: PayloadAction<{
        topArticles: BlogTopArticles[];
        categories: BlogCategories[];
        latestArticle: LatestArticle;
      }>
    ) {
      state.loading = false;
      state.topArticles = action.payload.topArticles;
      state.categories = action.payload.categories;
      state.latestArticle = action.payload.latestArticle;
    },
    fetchBlogError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchBlogStart, fetchBlogSuccess, fetchBlogError } =
  blogSlice.actions;
// Thunk function to fetch blog
export const fetchBlog = (lang: string) => async (dispatch: any) => {
  try {
    dispatch(fetchBlogStart());
    const response = await api.get(`/api/blog/${lang}`);
    dispatch(fetchBlogSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchBlogError(error.message));
  }
};

export default blogSlice.reducer;
