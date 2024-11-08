'use client';

import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { doctorList } from '@/types';

import { useNotification } from '../hook/storenotification';

type propsDetails = {
  age: string;
  doctor: doctorList;
  fullName: string;
  gender: string;
  id: string;
  phone: string;
  problem: string;
  relation: string;
  weight: string;
};

export type notificationProps = {
  id: string;
  message: string;
  date: string;
  time: string;
  notificationType: string;
  doctorName: string;
};

export default function PatientListDetails() {
  const [patient, setPatient] = useState<propsDetails | undefined>();

  const { storeNotificationData, formattedDate, formattedTime }
    = useNotification();
  const params = useParams();

  const { id } = params;

  const handleAcceptedClick = async () => {
    const notificationData = {
      message: `Doctor has booked your appointment with ${patient?.doctor.name} on ${formattedDate}`,
      date: formattedDate,
      time: formattedTime,
      notificationType: 'success',
      doctorName: patient?.doctor?.name || '',
    };

    await storeNotificationData(notificationData);
  };

  const handleRejectedClick = async () => {
    const notificationData = {
      message: `Doctor has cancelled your appointment with ${patient?.doctor.name} on ${formattedDate}`,
      date: formattedDate,
      time: formattedTime,
      notificationType: 'cancel',
      doctorName: patient?.doctor?.name || '',
    };

    try {
      await storeNotificationData(notificationData);
    } catch (error) {
      toast.error(`error is ${error}`);
    }
  };

  useEffect(() => {
    axios
      .get(`/api/patientAppointmentDetail/${id}`)
      .then((response: AxiosResponse<any, any>) => {
        setPatient(response.data);
      });
  }, [id]);

  return (
    <div className="p-6">
      <div className="mx-auto mt-10 w-full rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Patient Information
        </h2>

        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={patient?.fullName}
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-gray-700"
            />
          </div>

          {/* Gender */}
          <div>
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="gender"
            >
              Gender
            </label>
            <input
              type="text"
              id="gender"
              value={patient?.gender}
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-gray-700"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={patient?.phone}
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-gray-700"
            />
          </div>

          {/* Weight */}
          <div>
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="weight"
            >
              Weight
            </label>
            <input
              type="text"
              id="weight"
              value={patient?.weight}
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-gray-700"
            />
          </div>

          <div>
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="problem"
            >
              Problem
            </label>
            <textarea
              id="problem"
              value={patient?.problem}
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-gray-700"
              rows={3}
            />
          </div>

          <div className="mt-6 flex items-center gap-5">
            <button
              onClick={handleAcceptedClick}
              type="button"
              className="rounded-lg bg-green-500 px-4 py-2 text-white shadow hover:bg-green-600 focus:outline-none"
            >
              Accepted
            </button>
            <button
              onClick={handleRejectedClick}
              type="button"
              className="rounded-lg bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600 focus:outline-none"
            >
              Rejected
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
