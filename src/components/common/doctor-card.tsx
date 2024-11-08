'use client';

import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi';

import type { doctorList } from '@/types';

type doctorProps = {
  data?: doctorList;
  isAppointment?: boolean;
  onclick?: (id: string, doctorName: string) => void;
};

const doctorCard: React.FC<doctorProps> = ({
  data,
  isAppointment,
  onclick,
}) => {
  return (
    <div className="flex w-full gap-7 rounded-lg border border-[#D5D8DE] p-3">
      <Image
        // src="/assets/images/doctor.png"
        src={data?.image || '/assets/images/doctor.png'}
        width="110"
        height="110"
        alt="doctor-image"
        className="rounded-lg object-cover"
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h2 className="m-0 text-xl font-[500] leading-5 text-card-heading">
            {data ? data?.name : 'Dr.Kumar Das'}
          </h2>
          {isAppointment && (
            <>
              <button
                onClick={() => {
                  if (onclick && data) {
                    onclick(data?.id, data?.name);
                  }
                }}
              >
                <FiTrash2 className="text-4xl" />
              </button>
            </>
          )}
        </div>
        <div className="">
          <hr className="mb-2 mt-5 block w-full border border-t-card-line" />
          <p className="mt-0 p-0 text-sm font-[500] leading-4 text-card-smalltext">
            {data ? data?.specialist : ' Cardiologist - Dombivali'}
          </p>
          <span className="mt-0 p-0 text-sm font-[500] leading-4 text-card-smalltext">
            {data ? data?.education : ' MBBS ,MD (Internal Medicine)'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default doctorCard;
