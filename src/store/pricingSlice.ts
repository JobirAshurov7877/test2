import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SubService } from "@/interfaces/subservice.interface";
import { api } from "@/services/axios";

interface PricingState {
  data: SubService[] | null; // Array of SubService instead of single SubService
  loading: boolean;
  error: string | null;
}

const initialState: PricingState = {
  data: null,
  loading: false,
  error: null,
};

// Function to create async thunk with dynamic language
const createFetchSubServiceData = () =>
  createAsyncThunk(
    "subservice/fetchSubServiceData",
    async (
      { itemIds, lang }: { itemIds: string[]; lang: string },
      { rejectWithValue }
    ) => {
      try {
        const responses = await Promise.all(
          itemIds.map((itemId) => api.get(`/api/service/${lang}/${itemId}`))
        );
        const data = responses.map((response) => response.data);
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

// Initial thunk creation
export const fetchPricingData = createFetchSubServiceData();

const pricingState = createSlice({
  name: "pricing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPricingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPricingData.fulfilled,
        (state, action: PayloadAction<SubService[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchPricingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default pricingState.reducer;
export { createFetchSubServiceData };
