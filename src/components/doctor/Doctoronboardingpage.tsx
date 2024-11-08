'use client';

import 'react-toastify/dist/ReactToastify.css';

// id,
// name,
// education,
// specialist,
// isAvailable,
// about,
// address,
// schedule,
// experience,
// image,
import type { FormikValues } from 'formik';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

import doctorSchema from '@/validations/doctorSchema/doctorInfo';

import { CustomInput } from '../common/cutormInput';

export default function Doctoronboardingpage() {
  const router = useRouter();

  const initialValues = {
    name: '',
    education: '',
    specialist: '',
    isAvailable: false,
    about: '',
    address: '',
    schedule: '',
    image: '',
    experience: '',
  };

  const handleSubmit = async (values: FormikValues) => {
    const {
      name,
      education,
      specialist,
      isAvailable,
      about,
      address,
      schedule,
      experience,
      image,
    } = values;
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        education,
        specialist,
        isAvailable,
        about,
        address,
        schedule,
        experience,
        image,
      }),
    };
    const response = await fetch('/api/doctor', requestOptions);
    toast.success('form submitted successfully');
    if (response.ok) {
      router.push('/doctor');
    }
    if (!response.ok) {
      toast.error('something went wrong!');
    }
  };
  return (
    <div className=" rounded-lg p-4 shadow-lg">
      <ToastContainer />
      <h1 className="mb-6 text-start text-2xl font-bold text-gray-800">
        Doctor Information Form
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={doctorSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="space-y-7">
              <div className="flex items-center justify-between gap-6">
                <CustomInput
                  label="name"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name.."
                  isgender={false}
                />
                <CustomInput
                  label="Qualification"
                  type="text"
                  id="education"
                  name="education"
                  placeholder="Enter your qualification"
                  isgender={false}
                />
              </div>
              <div className="flex items-center justify-between gap-6">
                <CustomInput
                  label="Specialization"
                  type="text"
                  id="specialist"
                  name="specialist"
                  isgender={false}
                />
                <CustomInput
                  label="description"
                  type="text"
                  id="about"
                  name="about"
                  isgender={false}
                />
              </div>
              <div className="flex items-center justify-between gap-6">
                <CustomInput
                  label="address"
                  type="text"
                  id="address"
                  name="address"
                  isgender={false}
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:text-indigo-600"
                  onChange={(event) => {
                    const file = event.target.files?.[0]; // Get the first file
                    if (file) {
                      const reader = new FileReader();

                      reader.onload = (e: ProgressEvent<FileReader>) => {
                        const base64String = e.target?.result as string;
                        setFieldValue('image', base64String);
                      };

                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <CustomInput
                label="schedule"
                type="text"
                id="schedule"
                name="schedule"
                isgender={false}
              />

              <CustomInput
                label="experience"
                type="number"
                id="experience"
                name="experience"
                isgender={false}
              />

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
