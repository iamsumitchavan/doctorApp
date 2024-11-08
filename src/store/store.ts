import { configureStore } from '@reduxjs/toolkit';

import appointmentData from '@/store/slices/appointmentdata';
import appointmentList from '@/store/slices/appointmentList';
import doctorListSlice from '@/store/slices/doctorList';
import patientSlice from '@/store/slices/patientSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      doctor: doctorListSlice,
      appointment: appointmentList,
      appointMentData: appointmentData,
      patient: patientSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
