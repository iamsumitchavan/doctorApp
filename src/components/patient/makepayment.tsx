'use client';

import { useParams } from 'next/navigation';
import React from 'react';

// import type { doctorList } from "@/types";
import BackNavigation from '../common/backPage';
import DoctorCard from '../common/doctor-card';
import { useFetchPatientAppointmentdata } from '../hook/usePatieintAppointmentdetailData';
// import { useAppointmentData } from "../hook/useAppointmentData";

export default function MakePayment() {
  const params = useParams();

  const id = params.id as string | undefined;

  const { doctor } = useFetchPatientAppointmentdata(id);
  // const { data } = useAppointmentData();

  const smallTextStyle = 'text-[#80899A] font-semibold text-sm leading-9';
  const highlightStyle = 'text-[#000000] font-medium text-sm leading-3';

  return (
    <div className="space-y-6">
      <BackNavigation title="Appointment Details" />
      <DoctorCard data={doctor?.doctor} />

      <div className="space-y-5 rounded-lg border border-card-line bg-white p-5 shadow-lg">
        <div>
          <p className={smallTextStyle}>Full name</p>
          <h3 className={highlightStyle}>{doctor?.fullName}</h3>
        </div>
        <div className="flex items-center gap-9">
          <div>
            <p className={smallTextStyle}>Age</p>
            <span className={`${highlightStyle} block`}>{doctor?.age}</span>
          </div>
          <div>
            <p className={smallTextStyle}>Weight</p>
            <span className={`${highlightStyle} block`}>{doctor?.weight}</span>
          </div>
          <div>
            <p className={smallTextStyle}>Relation</p>
            <span className={`${highlightStyle} block`}>
              {doctor?.relation}
            </span>
          </div>
        </div>

        <div>
          <h3 className={smallTextStyle}>Problem</h3>
          <p className={highlightStyle}>{doctor?.problem}</p>
        </div>

        <div>
          <h3 className={smallTextStyle}>Mobile</h3>
          <p className={highlightStyle}>{doctor?.phone}</p>
        </div>
      </div>

      <div className="space-y-5 rounded-lg border border-card-line bg-white p-5 shadow-lg">
        <h3 className={smallTextStyle}>Live Tracking</h3>
        <p className={highlightStyle}>
          15 Patient Consulting expected consulting time 8:20 PM
        </p>
        <div className="flex items-center gap-4">
          <button className=" h-10 w-[70%] cursor-pointer rounded-lg border  border-card-line px-9 text-lg font-[400] leading-6 text-card-commonColor">
            <span className={highlightStyle}> Rescheduled</span>
          </button>
          <button className=" h-10 w-[70%] cursor-pointer rounded-lg border  border-card-line px-9 text-lg font-[400] leading-6 text-card-commonColor">
            <span className={highlightStyle}> cancel</span>
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-medium leading-8 text-[#000000]">
          Payment
        </h3>
        <p className="leading-2 text-sm font-semibold text-[#80899A]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat autem
          reiciendis cupiditate eligendi earum, ea eveniet temporibus adipisci
          reprehenderit nesciunt est doloribus itaque laborum porro perferendis
          explicabo unde illo. Veritatis! Culpa placeat, fuga quidem numquam
        </p>
      </div>
      <div>
        <button className="h-10 w-[70%] cursor-pointer rounded-lg bg-card-commonColor px-9 text-lg font-[400] leading-6 text-white hover:bg-card-commonColor">
          Make Payment
        </button>
      </div>
    </div>
  );
}
