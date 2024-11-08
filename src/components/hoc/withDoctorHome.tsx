// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
import type { doctorList } from '@/types';

import { useDataFetching } from '../hook/useDataFetching';

type WithDoctorListAndUserProps = {
  data: doctorList[];
  user: any[];
};

// type PatientDetails = {
//   age: string;
//   doctor: doctorList;
//   fullName: string;
//   gender: string;
//   id: string;
//   phone: string;
//   problem: string;
//   relation: string;
//   weight: string;
// };

export const withDoctorListAndUser = (
  WrappedComponent: React.ComponentType<WithDoctorListAndUserProps>,
) => {
  return function WithDoctorListAndUser(props: any) {
    const { data, user } = useDataFetching();
    return <WrappedComponent {...props} data={data} user={user} />;
  };
};
