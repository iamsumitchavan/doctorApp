'use client';

import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import type { FormikValues } from 'formik';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

import { useUserStore } from '@/zstore/userStore';

import { CustomInput } from '../common/cutormInput';
import { Button } from '../ui/button';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(12).required(),
});

const Login = () => {
  const router = useRouter();
  const initialValue = {
    email: '',
    password: '',
  };

  const setUser = useUserStore(state => state.setUser);

  const handleSubmit = async (values: FormikValues) => {
    await axios
      .post('https://myeasykart.codeyogi.io/login', {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        toast.success('successfully Logged in!');
        router.push('/dashboard');
        setUser(token, user);
      })
      .catch(() => {
        toast.error('something went wrong!');
      });
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <ToastContainer />
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="w-4/5 rounded-lg border border-card-line p-5 shadow-lg md:w-3/5">
          <h1 className="mb-3 text-xl font-semibold leading-tight tracking-normal text-[#46c2de] sm:text-2xl md:text-2xl">
            Login here
          </h1>
          <Form className="space-y-6" action="submit">
            <CustomInput id="email" label="Email" name="email" type="email" />
            <CustomInput
              id="password"
              label="Password"
              name="password"
              type="password"
            />
            <Button
              className="h-12 w-full cursor-pointer rounded-lg bg-card-commonColor text-lg font-[500] leading-7 hover:bg-card-commonColor"
              type="submit"
            >
              Log in
            </Button>

            <p className="text-end text-lg text-gray-700">
              Dont't have an account?
              <Link
                href="/patientprovider/register"
                className="font-semibold text-[#46c2de] underline hover:text-blue-600"
              >
                Signup
              </Link>
            </p>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default Login;
