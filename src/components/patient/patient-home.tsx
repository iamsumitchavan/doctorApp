'use client';

import React, { memo } from 'react';

// import { useDispatch, useSelector } from "react-redux";
import type { doctorList } from '@/types';

import PatientDashCard from '../common/dash-card';
import Searchbar from '../common/searchbar';
import { withDoctorListAndSearch } from '../hoc/withgetdoctorList';

type PatientHomeProps = {
  searchTerm: string;
  filteredDoctors: doctorList[];
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const PatientHome = memo(({
  searchTerm,
  filteredDoctors,
  handleSearch,
}: PatientHomeProps) => {
  return (
    <div className="space-y-6">
      <Searchbar value={searchTerm} onChange={handleSearch} />

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(450px,_1fr))] gap-4">
        {
          filteredDoctors?.length > 0
          && filteredDoctors.map((list: doctorList) => (
            <PatientDashCard key={list.id} list={list} />
          ))
          // ) : (
          //   // <p>No doctors found for "{searchTerm}"</p>
          //   <Loader />
        }
      </div>
    </div>
  );
});

export default withDoctorListAndSearch(PatientHome);
