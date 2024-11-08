'use client';

import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import DoctorCard from '../common/doctor-card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export default function PatientReengagment() {
  const [textValue, setTextValue] = useState<string>('');
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  const handleClick = () => {
    if (textValue) {
      router.push('/patient');
      toast.success('form is submitted successfully');
    }
  };
  return (
    <div className="mx-auto w-9/12 space-y-5 rounded-lg bg-white p-6 shadow-xl">
      <ToastContainer />
      <DoctorCard />
      <p className="w-1/4 text-sm font-[500] leading-5 text-card-smalltext">
        You had an appointment with Dr. lavangi for Muthu Kumar yesterday how
        you feeling today ?
      </p>
      <div className="flex gap-3">
        <Badge
          className="rounded-full border border-card-commonColor px-5 py-3"
          variant="outline"
        >
          <span className="text-sm font-[500] leading-5 text-[#26C2DE]">
            Feeling Better
          </span>
        </Badge>
        <Badge
          className="rounded-full border border-[#D3D6DC] px-5 py-3"
          variant="outline"
        >
          <span className="text-sm font-[500] leading-5 text-[#D3D6DC]">
            No Improvement
          </span>
        </Badge>
      </div>
      <textarea
        value={textValue}
        onChange={handleChange}
        placeholder="Describe in Short"
        className="border-2rounded-lg h-40 w-full bg-card-textBackground p-3 text-base"
      />
      <p className="w-1/2 text-sm font-[500] leading-5 text-card-smalltext outline-none focus:outline-none active:outline-none">
        Sorry to know that. we have shared your feedback with the doctor we'll
        let you know once he responded alternatively you may schedule on
        follow-up Consultation
      </p>

      <div className="mt-8">
        <Button onClick={handleClick} size="lg" variant="ghost">
          submit
        </Button>
      </div>
    </div>
  );
}
