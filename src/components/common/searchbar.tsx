'use client';

import React from 'react';

import { Input } from '../ui/input';

type searchProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export default function Searchbar({ onChange, value }: searchProps) {
  return (
    <div className="w-full">
      <Input
        value={value}
        onChange={onChange}
        placeholder="search here.."
        className="h-10 rounded-lg bg-[#F7F7F7] outline-none focus:outline-none active:outline-none"
      />
    </div>
  );
}
