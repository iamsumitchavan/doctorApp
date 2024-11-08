import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '@/components/common/Loader';
import { fetchdoctorList } from '@/store/slices/doctorList';
import type { AppDispatch, RootState } from '@/store/store';
import type { doctorList } from '@/types';

type WithDoctorListAndSearchProps = {
  searchTerm?: string;
  filteredDoctors?: doctorList[];
  handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data?: doctorList[];
};

export function withDoctorListAndSearch<P extends WithDoctorListAndSearchProps>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WithDoctorListAndSearch(
    props: Omit<P, keyof WithDoctorListAndSearchProps>,
  ) {
    const dispatch = useDispatch<AppDispatch>();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const data: doctorList[] = useSelector(
      (state: RootState) => state.doctor?.list,
    );

    useEffect(() => {
      dispatch(fetchdoctorList());
    }, [dispatch]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    const filteredDoctors
      = data?.filter(
        doctor =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
          || doctor.specialist.toLowerCase().includes(searchTerm.toLowerCase())
          || doctor.address.toLowerCase().includes(searchTerm.toLowerCase()),
      ) || [];

    if (!data) {
      return <Loader />;
    }

    return (
      <WrappedComponent
        {...(props as P)}
        searchTerm={searchTerm}
        filteredDoctors={filteredDoctors}
        handleSearch={handleSearch}
        data={data}
      />
    );
  };
}
