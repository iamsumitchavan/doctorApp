import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Define the patient data type
type Patient = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  gender: string;
  image: string;
};

// Define the initial state of the slice
type PatientState = {
  patientInfo: Patient | null;
};

const initialState: PatientState = {
  patientInfo: null,
};

// Create the patient slice
const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatientData: (state, action: PayloadAction<Patient>) => {
      state.patientInfo = action.payload;
    },
    clearPatientData: (state) => {
      state.patientInfo = null;
    },
  },
});

export const { setPatientData, clearPatientData } = patientSlice.actions;
export default patientSlice.reducer;
