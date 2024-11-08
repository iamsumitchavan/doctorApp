'use client';

import Image from 'next/image';
// import { AiFillBell } from "react-icons/ai";
import { BsGeoAlt } from 'react-icons/bs';

// import { useRouter } from "next/navigation";
import usePatientStore from '@/zstore';
// import { useCountStore } from "@/zstore/notificationStore";
// import { useState } from "react";

export const DemoBanner = () => {
  const patient = usePatientStore(state => state.patient);

  // const { count } = useCountStore();

  // const router = useRouter();
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-gray-200 p-4 ">
      <div className="flex gap-3">
        <Image
          height="50"
          width="50"
          alt="user"
          src={patient?.image || '/assets/images/doctor.png'}
          className="ml-4 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold leading-5 text-gray-800">
            Hello
            {' '}
            <span>{patient?.firstName}</span>
          </h3>
          <div className="mt-2 flex items-center gap-1">
            <BsGeoAlt />
            <span>{patient?.address}</span>
          </div>
        </div>
      </div>
      {/* <div
        // onClick={() => router.push("/notification")}
        className="absolute right-4 mr-5 cursor-pointer"
      >
        <AiFillBell className="text-4xl" />
        <div className="absolute top-0 size-6 rounded-full bg-red-500 text-sm font-bold text-white">
          {count}
        </div>
      </div> */}
    </div>
  );
};
