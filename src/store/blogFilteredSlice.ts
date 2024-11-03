import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogFilteredArticles } from "@/interfaces/blog.interface";
import { api } from "@/services/axios";
import { useLocale } from "next-intl";

interface BlogFilteredArticlesState {
  filteredArticles: BlogFilteredArticles[];
  filteredArticlesAfterSearch: BlogFilteredArticles[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogFilteredArticlesState = {
  filteredArticles: [],
  filteredArticlesAfterSearch: [],
  loading: false,
  error: null,
};

const blogFilteredArticlesSlice = createSlice({
  name: "blogFilteredArticles",
  initialState,
  reducers: {
    fetchBlogFilteredArticlesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBlogFilteredArticlesSuccess(
      state,
      action: PayloadAction<BlogFilteredArticles[]>
    ) {
      state.loading = false;
      state.filteredArticles = action.payload;
      state.filteredArticlesAfterSearch = action.payload;
    },
    fetchBlogFilteredArticlesError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    filterBlogArticles(state, action: PayloadAction<string>) {
      const searchTerm = action.payload.toLowerCase();
      console.log(searchTerm);

      if (!searchTerm) {
        state.filteredArticlesAfterSearch = state.filteredArticles; // Reset to all articles if search term is empty
      } else {
        state.filteredArticlesAfterSearch = state.filteredArticles
          .filter((article) => article.title.toLowerCase().includes(searchTerm))
          .slice(0, 12); // Slice to get only the first 12 items
      }
    },
  },
});

export const {
  fetchBlogFilteredArticlesStart,
  fetchBlogFilteredArticlesSuccess,
  fetchBlogFilteredArticlesError,
  filterBlogArticles,
} = blogFilteredArticlesSlice.actions;

// Thunk function to fetch all blog articles based on language
export const fetchFilteredBlogArticles =
  (language: string) => async (dispatch: any) => {
    try {
      dispatch(fetchBlogFilteredArticlesStart());
      const response = await api.get(`/api/blog/articles/all/${language}`);
      dispatch(fetchBlogFilteredArticlesSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchBlogFilteredArticlesError(error.message));
    }
  };

export default blogFilteredArticlesSlice.reducer;
