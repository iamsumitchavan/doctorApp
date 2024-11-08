'use client';

import 'react-toastify/dist/ReactToastify.css';

// import type { FormikValues } from "formik";
import { Form, Formik } from 'formik';
import { useParams } from 'next/navigation';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import { patientFormValidation } from '@/validations/patieintFormValidation';

import BackNavigation from '../common/backPage';
import { CustomInput } from '../common/cutormInput';
import { useFetchDoctor } from '../hook/useFetchDoctor';
import { usePatientFormSubmit } from '../hook/usePatientFormSubmit';

export default function PatientdetailsForm() {
  // const [doctor, setDoctor] = useState();
  const params = useParams();
  // const router = useRouter();
  const { appointmentId } = params;

  const id = appointmentId;

  const { doctor } = useFetchDoctor(id?.toString());

  const { handleSubmit } = usePatientFormSubmit(id, doctor);

  const initialValues = {
    fullName: '',
    gender: '',
    age: '',
    phone: '',
    problem: '',
    relation: '',
    weight: '',
  };

  return (
    <div className="space-y-4">
      <ToastContainer />
      <BackNavigation title="Patient Details" />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={patientFormValidation}
      >
        <Form className="mt-2 space-y-5 rounded-lg border border-card-line p-4 shadow-lg">
          <CustomInput
            name="fullName"
            placeholder="Enter name"
            type="text"
            id="fullName"
            label="Full name"
          />
          <div>
            <CustomInput name="age" id="age" label="Age" type="number" />
            <CustomInput
              isgender={true}
              select="gender"
              as="select"
              id="gender"
              name="gender"
              label="Gender"
            />
          </div>

          <CustomInput
            name="phone"
            id="phone"
            label="Phone no"
            type="text"
            placeholder="Enter mobile number"
          />

          <CustomInput name="weight" id="weight" label="Weight" type="number" />

          <CustomInput
            name="problem"
            id="problem"
            label="Problem"
            rows="4"
            as="textarea"
          />
          <CustomInput
            isgender={true}
            select="relation"
            as="select"
            id="relation"
            name="relation"
            label="define relation with patient"
          />

          <button
            className="h-10 w-40 cursor-pointer rounded-lg bg-card-commonColor text-lg font-[500] leading-6 text-white hover:bg-card-commonColor"
            type="submit"
          >
            save
          </button>
        </Form>
      </Formik>
    </div>
  );
}
