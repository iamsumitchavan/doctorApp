import { useState } from 'react';
import { toast } from 'react-toastify';

export function useDeleteAppointment() {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteAppointment = async (id: string) => {
    setIsDeleting(true);
    try {
      const requestOptions: RequestInit = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      };

      const response = await fetch('/api/appointmentData', requestOptions);

      if (response.ok) {
        toast.success('Appointment deleted successfully');
        return true; // Indicate successful deletion
      } else {
        throw new Error('Failed to delete appointment');
      }
    } catch (error) {
      toast.error('Failed to delete appointment');
      console.error(error);
      return false; // Indicate failed deletion
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteAppointment, isDeleting };
}
