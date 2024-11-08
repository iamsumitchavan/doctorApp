import { useState } from 'react';
import { toast } from 'react-toastify';

import type { doctorList } from '@/types';

type AppointmentData = {
  id: string;
  appointmentId: string;
  date: Date;
  timeSlot: string;
  doctor: doctorList | null; // Replace 'any' with the correct doctor type
};

export const useBookAppointment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookAppointment = async (appointmentData: AppointmentData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/appointmentData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      toast.success('Appointment booked successfully');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Something went wrong!');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { bookAppointment, isLoading, error };
};
