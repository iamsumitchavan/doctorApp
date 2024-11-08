'use client';

import { useParams, useRouter } from 'next/navigation';
// import React, { useEffect, useState } from "react";
import { BsChatSquareDotsFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa6';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { PiUsersFourFill } from 'react-icons/pi';

import type { doctorList } from '@/types';

// import type { doctorList } from "@/types";
import AppointmentLogo from '../common/appointmentLogo';
import CustomButton from '../common/customButton';
import DoctorCard from '../common/doctor-card';
// import { useFetchDoctor } from "../hook/useFetchDoctor";
import { withDoctorData } from '../hoc/withDoctorData';
// import { memo } from "react";

type doctordetailProps = {
  doctor: doctorList | null;
  // id: string;
};
function DoctorDetailPage({ doctor }: doctordetailProps) {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  // const { doctor } = useFetchDoctor(id?.toString());

  const heading = 'text-black font-[700] text-xl leading-7 ';
  return (
    <div className="space-y-5">
      {doctor && <DoctorCard data={doctor} />}
      <div className="w-[70%] space-y-7">
        <div className="flex items-center justify-between">
          <AppointmentLogo
            logo={<PiUsersFourFill className="text-4xl" />}
            rating="5000+"
            title="Patient"
          />
          <AppointmentLogo
            logo={<BsChatSquareDotsFill className="text-4xl" />}
            rating="10+"
            title="years exper.."
          />
          <AppointmentLogo
            logo={<FaStar className="text-4xl" />}
            rating="4.8"
            title="rating"
          />
          <AppointmentLogo
            logo={<IoChatbubbleEllipsesOutline className="text-4xl" />}
            rating="4,992"
            title="reviews"
          />
        </div>
        <div>
          <h3 className={heading}>About Doctor</h3>
          <p className="text-sm font-[500] leading-5 text-card-smalltext">
            {doctor?.about}
          </p>
        </div>

        <div>
          <h3 className={heading}>Service & Specialization</h3>
          <div className="mt-5 flex w-1/4 justify-between">
            <span className="text-sm font-[500] leading-6 text-[#80899A]">
              Service
            </span>
            <span className="text-sm font-[500] leading-6 text-[#80899A] ">
              Medicare
            </span>
          </div>
          <div className="flex w-1/4 justify-between">
            <span className="text-sm font-[500] leading-6 text-[#80899A]">
              Specialization
            </span>
            <span className="text-sm font-[500] leading-6 text-[#80899A]">
              {doctor?.specialist}
            </span>
          </div>
        </div>
        <h3 className={heading}>Availability for Consulting</h3>
        <div className="mt-4 flex w-1/4 justify-between">
          <span className="text-sm font-[500] leading-6 text-[#80899A] ">
            Monday to Friday
          </span>
          <span className="text-sm font-[500] leading-6 text-[#80899A] ">
            {doctor?.schedule}
          </span>
        </div>

        <CustomButton
          onclick={() => router.push(`/patient/book/${id}`)}
          title="Book appointment"
        />
      </div>
    </div>
  );
}

// const DoctorDetailPageMemo = memo(withDoctorData(DoctorDetailPage));

export default withDoctorData(DoctorDetailPage);
