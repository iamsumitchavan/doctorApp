import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { doctorList } from '@/types';

type Appointment = {
  id: string;
  appointmentId: string;

  date: string;
  timeSlot: string;
  doctor: doctorList | undefined;
};

type AppointmentsState = {
  appointments: Appointment[];
};

const initialState: AppointmentsState = {
  appointments: [],
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment(state, action: PayloadAction<Appointment>) {
      state.appointments = [...state.appointments, action.payload];
    },
    removeAppointment(state, action: PayloadAction<string>) {
      state.appointments = state.appointments.filter(
        appointment => appointment.id !== action.payload,
      );
    },
    getAppointments(state) {
      return state;
    },
  },
});

export const { addAppointment, removeAppointment, getAppointments }
  = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
