'use client';

import 'react-toastify/dist/ReactToastify.css';

import type { FormikValues } from 'formik';
import { Form, Formik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';

import { validationSchema } from '@/validations/feedback/AppointmentFormValidation';

import { CustomInput } from '../common/cutormInput';
import DoctorCard from '../common/doctor-card';

export default function Appointment() {
  const initialValues = {
    mobileNumber: '',
    code: '',
  };

  const handleSubmit = async (values: FormikValues) => {
    const { mobileNumber, code } = values;

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobileNumber, code }),
    };

    const response = await fetch('/api/appointment', requestOptions);
    toast.success('form submitted successfully');

    if (!response.ok) {
      toast.error('something went wrong!');
    }
  };

  return (
    <div className="mx-auto min-h-screen w-9/12 space-y-5 rounded-lg bg-white p-6 shadow-xl">
      <ToastContainer />
      <DoctorCard />
      <p className="w-1/2 text-sm font-[500] leading-5 text-card-smalltext">
        You Have a planned on appointment with Dr.Lavangi through IVR. Please
        Choose date & time and make payment to confirm your appointment
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex h-96 flex-col">
              <div className="flex-1  space-y-5">
                <CustomInput
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  placeholder="Enter 10-digit mobile number"
                  label="Mobile"
                />

                <CustomInput
                  type="text"
                  id="code"
                  name="code"
                  placeholder="Enter Appointment Code"
                  label="Appointment code"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-[90%] rounded-lg bg-card-commonColor px-4 py-2 text-lg font-semibold leading-5 text-white"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
