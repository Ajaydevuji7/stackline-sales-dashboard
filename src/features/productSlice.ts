import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types';

interface ProductState {
  data: Product[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProductData = createAsyncThunk('product/fetch', async () => {
  const response = await fetch('/stackline_frontend_assessment_data_2021.json');
  if (!response.ok) throw new Error('Failed to fetch Product data');
  return (await response.json()) as Product[];
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
          state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Product data';
      });
  },
});

export default productSlice.reducer;