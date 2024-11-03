import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SubRoot } from "@/interfaces/subroot.interface"; // Adjust path to SubRoot interface
import { api } from "@/services/axios";

interface SubRootState {
  data: SubRoot[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubRootState = {
  data: null,
  loading: false,
  error: null,
};

// Thunk function to fetch subroot data
export const fetchSubRootData = createAsyncThunk(
  "subroot/fetchSubRootData",
  async (
    { rootId, lang }: { rootId: string; lang: string }, // Updated to include rootId
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get<SubRoot[]>(
        `/api/direct-subs/${lang}/${rootId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const subrootSlice = createSlice({
  name: "subroot",
  initialState,
  reducers: {
    // Add reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubRootData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSubRootData.fulfilled,
        (state, action: PayloadAction<SubRoot[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchSubRootData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subrootSlice.reducer;
