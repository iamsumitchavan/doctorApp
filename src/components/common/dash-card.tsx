'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import type { doctorList } from '@/types';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export default function PatientDashCard({ list }: { list: doctorList }) {
  const router = useRouter();

  return (
    <div className="flex items-start gap-6 rounded-lg border border-[#D5D8DE] bg-[#FFFFFF] p-3">
      <Image
        // src="/assets/images/doctor1.png"
        src={list.image}
        className="object-contain"
        height="145"
        width="173"
        alt="doctor-img"
      />
      <div className="space-y-2">
        <h3 className="text-xl font-[600] leading-7 text-card-heading">
          {list.name}
        </h3>
        <div className="space-y-2">
          <span className="block text-sm font-[500] text-[#29C1C3] ">
            {list.specialist}
          </span>
          <Badge
            className="border border-[#18AB00] bg-[#18AB001C] px-3 py-1 text-sm font-[500] text-[#18AB00]"
            variant="outline"
          >
            {list.isAvailable ? 'Available today' : 'Not Available'}
          </Badge>
        </div>
        <p className="text-sm font-[500] leading-5 text-card-smalltext">
          {list.about}
        </p>
        <Badge
          variant="outline"
          className="text-sm font-[500] leading-5 text-[#000000]"
        >
          {list.schedule}
        </Badge>
        <div className="">
          <Button
            onClick={() => router.push(`/patient/${list.id}`)}
            variant="link"
          >
            view link
          </Button>
        </div>
      </div>
    </div>
  );
}
