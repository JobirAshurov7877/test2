import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogCategory } from "@/interfaces/blog.interface";
import { api } from "@/services/axios";

interface BlogCategoryState {
  categoryArticles: BlogCategory;
  loading: boolean;
  error: string | null;
}

const initialState: BlogCategoryState = {
  categoryArticles: {
    category_name: "",
    articles: [],
  },
  loading: false,
  error: null,
};

const blogCategorySlice = createSlice({
  name: "categoryArticles",
  initialState,
  reducers: {
    fetchBlogCategoryStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBlogCategorySuccess(state, action: PayloadAction<BlogCategory>) {
      state.loading = false;
      state.categoryArticles = action.payload;
    },
    fetchBlogCategoryErrror(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchBlogCategoryStart,
  fetchBlogCategorySuccess,
  fetchBlogCategoryErrror,
} = blogCategorySlice.actions;

// Thunk function to fetch articles based on category id and language
export const fetchArticlesByCategory =
  (id: number, lang: string) => async (dispatch: any) => {
    try {
      dispatch(fetchBlogCategoryStart());
      const response = await api.get(`/api/blog/category/en/${id}`);
      dispatch(fetchBlogCategorySuccess(response.data));
    } catch (error: any) {
      dispatch(fetchBlogCategoryErrror(error.message));
    }
  };

export default blogCategorySlice.reducer;
