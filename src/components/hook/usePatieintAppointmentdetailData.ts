import { useEffect, useState } from 'react';

import type { PatientAppointmentDetail } from '@/types';

export function useFetchPatientAppointmentdata(id: string | undefined) {
  const [doctor, setDoctor] = useState<PatientAppointmentDetail | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`/api/patientAppointmentDetail/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch doctor details');
        }
        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      }
    };

    fetchDoctor();
  }, [id]);

  return { doctor, error };
}
