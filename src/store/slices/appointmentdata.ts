import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { doctorList } from '@/types';

type appointment = {
  id: string;
  appointmentId: string;
  doctor: doctorList;
  date: string;
  timeSlot: string;
};

// Define the initial state
type ProductsState = {
  list: appointment[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchAppointmentList = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('/mocks/appointmentList.json');

    const data: appointment[] = await response.json();

    return data;
  },
);

// Create the products slice
const appointmentListSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAppointmentList.fulfilled,
        (state, action: PayloadAction<appointment[]>) => {
          state.list = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchAppointmentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

// export const selectDoctorById = (
//   state: { products: ProductsState },
//   doctorId: string
// ) => {
//   return state.products.list.find((doctor) => doctor.id === doctorId);
// };

export default appointmentListSlice.reducer;
