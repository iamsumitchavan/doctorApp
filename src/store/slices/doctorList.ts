import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type doctorList = {
  id: string;
  name: string;
  education: string;
  specialist: string;
  isAvailable: boolean;
  about: string;
  address: string;
  schedule: string;
  experience: string;
  image: string;
};

// Define the initial state
type ProductsState = {
  list: doctorList[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  list: [],
  loading: false,
  error: null,
};

// Async thunk for fetching products from an API
export const fetchdoctorList = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('/mocks/doctorList.json');
    // if (!response.ok) {

    // }
    const data: doctorList[] = await response.json();

    return data;
  },
);

// Create the products slice
const doctorListSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchdoctorList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchdoctorList.fulfilled,
        (state, action: PayloadAction<doctorList[]>) => {
          state.list = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchdoctorList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const selectDoctorById = (
  state: { products: ProductsState },
  doctorId: string,
) => {
  return state.products.list.find(doctor => doctor.id === doctorId);
};

export default doctorListSlice.reducer;
