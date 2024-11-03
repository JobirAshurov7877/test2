import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceRoot } from "@/interfaces/root.interface"; // Adjust path to ServiceRoot interface
import { api } from "@/services/axios";

interface ServiceRootState {
  data: ServiceRoot | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServiceRootState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchServiceRootData = createAsyncThunk(
  "serviceroot/fetchServiceRootData",
  async (
    { rootId, lang }: { rootId: string; lang: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get<ServiceRoot>(
        `/api/service-with-subs/${lang}/${rootId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const servicerootSlice = createSlice({
  name: "serviceroot",
  initialState,
  reducers: {
    // Add reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceRootData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchServiceRootData.fulfilled,
        (state, action: PayloadAction<ServiceRoot>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchServiceRootData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default servicerootSlice.reducer;
