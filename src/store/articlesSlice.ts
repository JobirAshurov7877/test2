"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Adjust path based on your project structure
import { Articles, BlogPagination } from "@/interfaces/blog.interface";
import { api } from "@/services/axios";
import { useLocale } from "next-intl";

interface ArticlesState {
  articles: Articles[];
  pagination: BlogPagination;
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  articles: [],
  pagination: {
    last_page: 1,
    current_page: 1,
  },
  loading: false,
  error: null,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    fetchArticlesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchArticlesSuccess(
      state,
      action: PayloadAction<{
        articles: Articles[];
        pagination: BlogPagination;
      }>
    ) {
      state.loading = false;
      state.articles = [...state.articles, ...action.payload.articles];
      state.pagination = action.payload.pagination;
    },
    fetchArticlesError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetArticles(state) {
      state.articles = [];
      state.pagination = {
        last_page: 1,
        current_page: 1,
      };
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchArticlesStart,
  fetchArticlesSuccess,
  fetchArticlesError,
  resetArticles,
} = articlesSlice.actions;

// Thunk function to fetch articles
export const fetchArticles =
  (page: number, lang: string) => async (dispatch: any) => {
    try {
      dispatch(fetchArticlesStart());
      const response = await api.get(`/api/blog/articles/${lang}?page=${page}`);
      dispatch(fetchArticlesSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchArticlesError(error.message));
    }
  };

export default articlesSlice.reducer;
