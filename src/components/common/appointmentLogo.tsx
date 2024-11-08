'use client';

import React from 'react';

type props = {
  logo: React.ReactNode;
  rating: string;
  title: string;
};

export default function AppointmentLogo({ logo, rating, title }: props) {
  return (
    <div className="flex w-[10%] flex-col items-center justify-start">
      <div className="flex size-28 items-center justify-center rounded-full bg-slate-200">
        {/* <PiUsersFourFill className="text-4xl" /> */}
        {logo}
      </div>
      <p className="text-sm font-[600] leading-6 text-card-commonColor">
        {rating}
      </p>
      <p className="text-sm font-[500] leading-6  text-card-smalltext">
        {title}
      </p>
    </div>
  );
}
