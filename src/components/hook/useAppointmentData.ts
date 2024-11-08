// import { useState, useEffect } from "react";
// import type { appointmentType } from "@/types";

// export function useAppointmentData() {
//   const [data, setData] = useState<appointmentType[] | undefined>(undefined);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   const fetchAppointments = async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`/api/appointmentData`);
//       if (!res.ok) {
//         throw new Error("Failed to fetch appointment data");
//       }
//       const appointments = await res.json();
//       setData(appointments);
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error("An error occurred"));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   return { data, isLoading, error, refetch: fetchAppointments };
// }

import { useCallback, useEffect, useState } from 'react';

import type { appointmentType } from '@/types';

export function useAppointmentData() {
  const [data, setData] = useState<appointmentType[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/appointmentData`);
      if (!res.ok) {
        throw new Error('Failed to fetch appointment data');
      }
      const appointments = await res.json();
      setData(appointments);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const removeAppointment = useCallback((id: string) => {
    setData(prevData =>
      prevData?.filter(appointment => appointment.id !== id),
    );
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchAppointments,
    removeAppointment,
  };
}
