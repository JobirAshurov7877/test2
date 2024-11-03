import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@/interfaces/category.interface"; // Import interfaces
import { api } from "@/services/axios";
import { useLocale } from "next-intl";

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = categoriesSlice.actions;

// Thunk function to fetch categories
export const fetchCategories = (lang: string) => async (dispatch: any) => {
  try {
    dispatch(fetchCategoriesStart());
    const response = await api.get(`/api/roots-with-direct-subs/${lang}`);
    dispatch(fetchCategoriesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};

export default categoriesSlice.reducer;
