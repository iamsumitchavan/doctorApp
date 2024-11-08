import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

type backnavigationProps = {
  title: string;
};

export default function BackNavigation({ title }: backnavigationProps) {
  return (
    <div className="flex items-center gap-4">
      <IoMdArrowRoundBack className="text-2xl" />
      <h3 className="text-2xl font-semibold leading-6 text-[#212121]">
        {title}
      </h3>
    </div>
  );
}
