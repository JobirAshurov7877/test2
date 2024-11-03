import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceRoot } from "@/interfaces/root.interface"; // Adjust the path to Root interface
import { api } from "@/services/axios";

interface RootState {
  data: ServiceRoot[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: RootState = {
  data: null,
  loading: false,
  error: null,
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    fetchRootStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRootSuccess(state, action: PayloadAction<ServiceRoot[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchRootFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRootStart, fetchRootSuccess, fetchRootFailure } =
  rootSlice.actions;

// Thunk function to fetch root data
export const fetchRootData =
  (rootId: string, language: string) => async (dispatch: any) => {
    try {
      dispatch(fetchRootStart());
      const response = await api.get<ServiceRoot[]>(
        `/api/direct-subs/${language}/${rootId}`
      );
      dispatch(fetchRootSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchRootFailure(error.message));
    }
  };

export default rootSlice.reducer;
