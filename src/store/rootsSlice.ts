import { api } from "@/services/axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RootState {
  data: Roots[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: RootState = {
  data: null,
  loading: false,
  error: null,
};

const rootsSlice = createSlice({
  name: "roots",
  initialState,
  reducers: {
    fetchRootsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRootsSuccess(state, action: PayloadAction<Roots[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchRootsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRootsStart, fetchRootsSuccess, fetchRootsFailure } =
  rootsSlice.actions;

// Thunk function to fetch roots data
export const fetchRootsData = (lang: string) => async (dispatch: any) => {
  try {
    dispatch(fetchRootsStart());
    const response = await api.get<Roots[]>(`/api/roots/${lang}`);
    dispatch(fetchRootsSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchRootsFailure(error.message));
  }
};

export default rootsSlice.reducer;
