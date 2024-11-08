'use client';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';

import { Form, Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ImCalendar } from 'react-icons/im';
// import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

// import type { doctorList } from "@/types";
import DoctorCard from '../common/doctor-card';
import { useBookAppointment } from '../hook/useBookAppointment';
import { useFetchDoctor } from '../hook/useFetchDoctor';
// import { useNotification } from "../hook/storenotification";
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const appointmentSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  time: Yup.string().required('Time slot is required'),
});

const morningSlots = [
  '09:30 AM - 09:45 AM',
  '09:45 AM - 10:00 AM',
  '10:00 AM - 10:15 AM',
  '10:15 AM - 10:30 AM',
];

const eveningSlots = [
  '03:30 PM - 03:45 PM',
  '03:45 PM - 04:00 PM',
  '04:00 PM - 04:15 PM',
  '04:15 PM - 04:30 PM',
];

// selectedSlot === slot
//                         ? "border-blue-500 bg-blue-100 text-blue-700"
//                         : "border-[#D5D8DE] bg-[#FFFFFF] text-[#80899A]"
//                     }`}

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();

  const { id } = params;

  const date: Date = new Date(selectedDate!);

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  const pickerformattedDate = `${day}${month} ${year}`;

  const initialValues = {
    date: null,
    time: '',
  };

  // hook
  const { doctor } = useFetchDoctor(id?.toString());
  const { bookAppointment } = useBookAppointment();

  const handleSubmit = async (values: any) => {
    const { date, time } = values;

    if (typeof id !== 'string') {
      throw new TypeError('Appointment ID must be a string');
    }

    const newValue = {
      id,
      appointmentId: uuidv4(),
      date,
      timeSlot: time,
      doctor,
    };

    const success = await bookAppointment(newValue);
    if (success) {
      router.push('/patient/appointment');
      toast.success('appointment booked successfully!');
    }
  };

  const handleSlotSelection = (slot: string) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="space-y-6">
      <ToastContainer />
      {doctor && <DoctorCard data={doctor} />}
      <div className="space-y-7">
        <Formik
          initialValues={initialValues}
          validationSchema={appointmentSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-9">
              <div>
                <p className="block text-lg font-medium text-gray-700">
                  Book Appointment
                </p>
                <div className=" mt-4 flex w-1/2 items-center gap-6">
                  <h3 className="text-sm font-[600] leading-7 text-gray-600">
                    {pickerformattedDate}
                  </h3>

                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setFieldValue('date', date);
                    }}
                    customInput={<ImCalendar />}
                    dateFormat="MMMM d, yyyy"
                    minDate={new Date()}
                  />
                </div>
              </div>

              <div>
                <p className="block text-sm font-medium text-gray-700">
                  Morning Slots
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {morningSlots.map(slot => (
                    <Badge
                      key={slot}
                      className={`cursor-pointer rounded-full border px-4 py-2 ${
                        selectedSlot === slot
                          ? 'border-blue-500 bg-blue-100 text-blue-700'
                          : 'border-[#D5D8DE] bg-[#FFFFFF] text-[#80899A]'
                      }`}
                      onClick={() => {
                        handleSlotSelection(slot);
                        setFieldValue('time', slot);
                      }}
                    >
                      {slot}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Evening Slots */}
              <div>
                <p className="block text-sm font-medium text-gray-700">
                  Evening Slots
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {eveningSlots.map(slot => (
                    <Badge
                      key={slot}
                      className={`cursor-pointer rounded-full border px-4 py-2 ${
                        selectedSlot === slot
                          ? 'border-blue-500 bg-blue-100 text-blue-700'
                          : 'border-[#D5D8DE] bg-[#FFFFFF] text-[#80899A]'
                      }`}
                      onClick={() => {
                        handleSlotSelection(slot);
                        setFieldValue('time', slot);
                      }}
                    >
                      {slot}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => router.push('/patient/appointment')}
                className="h-12 w-52 rounded-lg bg-card-commonColor hover:bg-card-commonColor"
              >
                Book Appointment
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
