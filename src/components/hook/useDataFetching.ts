import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { doctorList } from '@/types';

type PatientDetails = {
  age: string;
  doctor: doctorList;
  fullName: string;
  gender: string;
  id: string;
  phone: string;
  problem: string;
  relation: string;
  weight: string;
};

export const useDataFetching = () => {
  const [data, setData] = useState<doctorList[]>([]);
  const [user, setUser] = useState<PatientDetails[]>([]);

  useEffect(() => {
    const fetchDoctorList = async () => {
      try {
        const response = await fetch('/mocks/doctorList.json');
        const data = await response.json();
        setData(data);
      } catch (error) {
        toast.error(`Something went wrong fetching doctor list: ${error}`);
      }
    };

    const fetchPatientAppointments = async () => {
      try {
        const response = await axios.get('/api/patientAppointmentDetail');
        setUser(response.data);
      } catch (error) {
        toast.error(
          `Something went wrong fetching patient appointments: ${error}`,
        );
      }
    };

    fetchDoctorList();
    fetchPatientAppointments();
  }, []);

  return { data, user };
};
