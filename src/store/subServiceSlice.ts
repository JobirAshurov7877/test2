import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SubService } from "@/interfaces/subservice.interface";
import { api } from "@/services/axios";

interface SubServiceState {
  data: SubService | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubServiceState = {
  data: null,
  loading: false,
  error: null,
};

// Function to create async thunk with dynamic language
const createFetchSubServiceData = () =>
  createAsyncThunk(
    "subservice/fetchSubServiceData",
    async (
      { itemId, lang }: { itemId: string; lang: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.get<SubService>(
          `/api/service/${lang}/${itemId}`
        );
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

// Initial thunk creation
export const fetchSubServiceData = createFetchSubServiceData();

const subserviceSlice = createSlice({
  name: "subservice",
  initialState,
  reducers: {
    // Add reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubServiceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSubServiceData.fulfilled,
        (state, action: PayloadAction<SubService>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchSubServiceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subserviceSlice.reducer;

// Export thunk creator function if needed externally
export { createFetchSubServiceData };
