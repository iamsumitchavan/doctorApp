import type { FormikValues } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const usePatientFormSubmit = (
  id: string | string[] | undefined,
  doctor: any,
) => {
  const router = useRouter();

  const handleSubmit = async (values: FormikValues) => {
    const { fullName, gender, age, phone, problem, relation, weight } = values;

    if (typeof id !== 'string') {
      throw new TypeError('Appointment ID must be a string');
    }

    const newValue = {
      fullName,
      gender,
      age,
      phone,
      problem,
      relation,
      weight,
      doctor,
    };

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newValue),
    };

    try {
      const response = await fetch(
        '/api/patientAppointmentDetail',
        requestOptions,
      );

      if (response.ok) {
        toast.success('Form submitted successfully');
        router.push('/patient/details/list');
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting the form');
    }
  };

  return { handleSubmit };
};
