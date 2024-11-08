'use client';

import React from 'react';

import { Button } from '../ui/button';

type buttonProps = {
  title: string;
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function CustomButton({ title, onclick }: buttonProps) {
  return (
    <Button
      onClick={onclick}
      className="h-12 w-1/2 rounded-md bg-card-commonColor hover:bg-card-commonColor"
    >
      <span className="text-lg font-[500] leading-6 text-white">{title}</span>
    </Button>
  );
}
