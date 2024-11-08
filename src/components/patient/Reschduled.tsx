import React from 'react';

import BackNavigation from '../common/backPage';
import CustomButton from '../common/customButton';
import DoctorCard from '../common/doctor-card';

export default function Reschduled() {
  return (
    <div className="w-[70%] space-y-9">
      <BackNavigation title="Rescheduled by Doctor" />
      <DoctorCard />
      <div className="space-y-3 rounded-lg bg-[#FFE7E7] px-5 py-3">
        <div className="flex w-[90%] items-center justify-between">
          <span className="text-sm font-[500] leading-6 text-[#616161]">
            Date & Hour
          </span>
          <span className="text-sm font-[500] leading-5 text-[#424242]">
            Dec 23, 2024 | 10:00 AM
          </span>
        </div>
        <div>
          <p className="text-sm font-[400] leading-5 text-[#616161]">
            Your Appointment with dr lavangi is has been Cancelled .If you paid
            consultation fee it will be refunded fee it will be refunded in 2
            days Apologies for inconvenience Caused
          </p>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <CustomButton title="Reschedule" />
      </div>
    </div>
  );
}
