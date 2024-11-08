'use client';

import type { FormikValues } from 'formik';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// import doctorSchema from "@/validations/doctorSchema/doctorInfo";
import patientSchema from '@/validations/patient-dash/patientInfo';
import usePatientStore from '@/zstore';

import { CustomInput } from '../common/cutormInput';

export default function PatientonboardingPage() {
  const setPatient = usePatientStore(state => state.setPatient);

  const router = useRouter();

  const initialValues = {
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    image: '',
    medicalHistory: '',
  };

  const handleSubmit = async (values: FormikValues, { resetForm }: any) => {
    const {
      firstName,
      lastName,
      age,
      email,
      phone,
      address,
      gender,
      image,
      medicalHistory,
    } = values;

    if (values) {
      setPatient({ firstName, lastName, age, email, image, address });
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        age,
        email,
        phone,
        address,
        gender,
        image,
        medicalHistory,
      }),
    };

    const response = await fetch('/api/patientInfo', requestOptions);
    toast.success('form submitted successfully');
    resetForm();

    if (response.ok) {
      router.push('/patient');
    }

    if (!response.ok) {
      toast.error('something went wrong!');
    }
  };
  return (
    <div className=" rounded-lg p-4 shadow-lg">
      <h1 className="mb-6 text-start text-2xl font-bold text-gray-800">
        Patient Information Form
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={patientSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="space-y-7">
              <div className="flex items-center justify-between gap-6">
                <CustomInput
                  label="firstName"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name.."
                  isgender={false}
                />
                <CustomInput
                  label="lastName"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your first lastName.."
                  isgender={false}
                />
              </div>
              <div className="flex items-center justify-between gap-6">
                <CustomInput
                  label="Phone"
                  type="text"
                  id="phone"
                  name="phone"
                  isgender={false}
                />
                <CustomInput
                  label="age"
                  type="number"
                  id="age"
                  name="age"
                  isgender={false}
                />
              </div>
              <div className="flex items-center justify-between gap-6">
                {' '}
                <CustomInput
                  label="email"
                  type="email"
                  id="email"
                  name="email"
                  isgender={false}
                />
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
                  className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:text-indigo-600"
                />
              </div>

              <CustomInput
                label="gender"
                as="select"
                id="gender"
                name="gender"
                select="gender"
                isgender={true}
              />

              <CustomInput
                label="medicalHistory"
                as="textarea"
                id="medicalHistory"
                name="medicalHistory"
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

/* <Formik
        initialValues={initialValues}
        validationSchema={patientSchema}
        onSubmit={handleSubmit}
      >
        <Form action={"submit"}>
          <CustomInput
            label="firstName"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name.."
          />
          <CustomInput
            label="lastName"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your first lastName.."
          />
          <CustomInput label="email" type="email" id="email" name="email" />
          <CustomInput
            label="address"
            type="text"
            id="address"
            name="address"
          />
          {/* <CustomInput
            label="gender"
            as="select"
            id="gender"
            name="gender"
            isgender={true}
          /> */

//     <label>Gender</label>
//     <Field name="gender" as="select">
//       <option value="">Select Gender</option>
//       <option value="male">Male</option>
//       <option value="female">Female</option>
//       <option value="other">Other</option>
//     </Field>
//     <ErrorMessage name="gender" component="div" />

//     <CustomInput
//       label="medicalHistory"
//       as="textarea"
//       id="medicalHistory"
//       name="medicalHistory"
//     />

//     <button type="submit">Submit</button>
//   </Form>
// </Formik> */}
