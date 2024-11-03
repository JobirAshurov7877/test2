import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogSinglePage } from "@/interfaces/blog.interface";
import { api } from "@/services/axios";
import { useLocale } from "next-intl";

interface BlogSinglePageState {
  article: BlogSinglePage | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogSinglePageState = {
  article: null,
  loading: false,
  error: null,
};

const blogSinglePageSlice = createSlice({
  name: "blogSinglePage",
  initialState,
  reducers: {
    fetchBlogSinglePageStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBlogSinglePageSuccess(state, action: PayloadAction<BlogSinglePage>) {
      state.loading = false;
      state.article = action.payload;
    },
    fetchBlogSinglePageError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchBlogSinglePageStart,
  fetchBlogSinglePageSuccess,
  fetchBlogSinglePageError,
} = blogSinglePageSlice.actions;

export default blogSinglePageSlice.reducer;

export const fetchBlogSinglePage = (slug: string) => async (dispatch: any) => {
  const currentLanguage = useLocale();
  try {
    dispatch(fetchBlogSinglePageStart());
    const response = await api.get(
      `/api/blog/article/${currentLanguage}/${slug}`
    );
    dispatch(fetchBlogSinglePageSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchBlogSinglePageError(error.message));
  }
};
