import { useEffect, useState } from 'react';

import type { doctorList } from '@/types';

export function useFetchDoctor(id: string | undefined) {
  const [doctor, setDoctor] = useState<doctorList | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!id) {
        setError(new Error('No doctor ID provided'));
        return;
      }

      try {
        const res = await fetch(`/api/doctor/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch doctor data');
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
