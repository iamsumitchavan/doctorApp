// patientStore.ts
import { create } from 'zustand';

type Patient = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  address: string;
  image: string;
};

type PatientState = {
  patient: Patient | null;
  setPatient: (patient: Patient) => void;
};

const usePatientStore = create<PatientState>(set => ({
  patient: null,
  setPatient: (patient: Patient) => set({ patient }),
}));

export default usePatientStore;
