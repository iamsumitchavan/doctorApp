'use client';

import React from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { FaCalendarDays } from 'react-icons/fa6';
import { MdCancelPresentation } from 'react-icons/md';

import { Button } from '../ui/button';

type notifyProps = {
  notification: 'success' | 'cancel' | 'changed' | 'reschedule';

  when: string;
  time: string;
  message: string;
  handleClick: (id: string) => void;
  id: string;
};

export default function NotificationListStructurePage({
  notification,
  when,
  time,
  message,
  handleClick,
  id,
}: notifyProps) {
  const notifyListData = {
    cancel: {
      title: 'Appointment Cancelled!',
      when,
      time,
      message,
      color: 'bg-[#F7555514]',
      Icon: <MdCancelPresentation className="text-2xl" />,
    },

    success: {
      title: 'Appointment Success!',
      when,
      time,
      message,
      color: 'bg-[#24F0FD14]',
      Icon: <FaCalendarDays className="text-2xl" />,
    },
    changed: {
      title: 'Schedule Changed',
      when,
      time,
      message,
      color: 'bg-[#4CAF5014]',
      Icon: <FaCalendarDays className="text-2xl" />,
    },
    reschedule: {
      title: 'Rescheduled by Doctor',
      when,
      time,
      message,
      color: 'bg-[#BB27BB26]',
      Icon: <FaCalendarDays className="text-2xl" />,
    },
  };

  const data = notifyListData[notification];

  return (
    <div className=" relative rounded-lg border border-card-line p-4">
      <div className="absolute right-5 top-3">
        <button onClick={() => handleClick(id)}>
          <CiCircleRemove className="text-2xl" />
        </button>
      </div>
      <div className="flex w-2/5 items-center justify-between">
        <div className="flex items-center gap-6">
          <div
            className={`flex size-16 items-center justify-center rounded-full ${data.color}`}
          >
            {data.Icon}
          </div>

          <div className="">
            <h3 className="text-lg font-semibold leading-9 text-[#212121]">
              {data.title}
            </h3>
            <p className="flex items-center gap-4 text-sm font-[500] leading-6 text-[#616161]">
              <span>{data.when}</span>

              <span>|</span>

              <span>{data.time}</span>
            </p>
          </div>
        </div>

        <Button>New</Button>
      </div>
      <p className="leading-0 mt-3 text-sm font-[400] text-[#424242]">
        {data.message}
      </p>
    </div>
  );
}
