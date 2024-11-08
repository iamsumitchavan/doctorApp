import React from 'react';

import BackNavigation from '../common/backPage';
import DoctorCard from '../common/doctor-card';

export default function Collaboration() {
  return (
    <div className="w-[70%] space-y-9">
      <BackNavigation title="Co-Patient Collaboration" />
      <DoctorCard />
      <p className="text-lg font-[500] leading-6 text-[#3E3E3E]">
        Would you like to connect with other new mothers who also visits
        Dr.Kumar
      </p>
      <button className="w-1/2 rounded-lg border border-card-commonColor px-5 py-3 text-lg font-[700] text-card-commonColor ">
        Yes Join Me
      </button>
    </div>
  );
}
