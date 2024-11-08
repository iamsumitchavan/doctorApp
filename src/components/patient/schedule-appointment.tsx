'use client';

import 'react-toastify/dist/ReactToastify.css';

import Link from 'next/link';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { ToastContainer } from 'react-toastify';

import DoctorCard from '../common/doctor-card';
import Loader from '../common/Loader';
import { useAppointmentData } from '../hook/useAppointmentData';
import { useDeleteAppointment } from '../hook/useDeleteAppointment';

export default function ScheduleAppointment() {
  const { data, isLoading, error, removeAppointment } = useAppointmentData();
  const { deleteAppointment } = useDeleteAppointment();

  const [activeTab, setActiveTab] = useState('upcoming');

  const handleClick = async (id: string) => {
    const success = await deleteAppointment(id);

    if (success) {
      removeAppointment(id); // Update the UI immediately
    }
  };

  if (!data) {
    return <Loader />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  return (
    <div className="">
      <ToastContainer />

      <div className="flex justify-around border-b">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 ${
            activeTab === 'upcoming'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 ${
            activeTab === 'completed'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab('canceled')}
          className={`px-4 py-2 ${
            activeTab === 'canceled'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          Canceled
        </button>
      </div>

      <div className="p-4">
        {activeTab === 'completed' && (
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(450px,_1fr))] gap-4">
            {data
            && data.map(appointment => (
              <div key={appointment.id}>
                <div className="flex flex-col space-y-2">
                  <DoctorCard
                    onclick={handleClick}
                    isAppointment={true}
                    data={appointment.doctor}
                  />
                  <div className="rounded-lg border border-[#D4D7DD] p-4">
                    <h5 className="text-lg font-semibold leading-10 text-[#80899A]">
                      Appointment Number
                    </h5>
                    <h5 className="text-sm font-bold leading-4 text-black">
                      {appointment?.appointmentId}
                    </h5>
                    <div className="flex w-1/2 items-center">
                      <div className="flex-1">
                        <h3 className="text-sm font-[500] leading-7 text-[#80899A]">
                          status
                        </h3>
                        <h5 className="text-sm font-semibold leading-7 text-[#00A307] ">
                          Active
                        </h5>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-[500] leading-7 text-[#80899A]">
                          Reporting Time
                        </h3>
                        <h5 className="text-sm font-bold leading-6 text-black">
                          {appointment?.timeSlot
                            ? appointment?.timeSlot
                            : ' Oct 27, 2023 7:30 PM'}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-[500] leading-9 text-gray-950">
                      Add patient details
                    </h3>
                    <Link
                      href={`/patient/details/${appointment.doctor?.id}`}
                      className="flex h-12 w-[70%] items-center justify-center gap-3 rounded-lg border border-card-commonColor px-3 text-sm font-[500] text-card-commonColor"
                    >
                      <FaPlus className="text-2xl" />
                      Add Patient Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
