'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import type { doctorList } from '@/types';

import BackNavigation from '../common/backPage';

// const users = [
//   {
//     id: 1,
//     fullName: "John Doe",
//     email: "john.doe@example.com",
//     visitType: "Consultation",
//     age: 35,
//     gender: "Male",
//     phone: "1234567890",
//     problemDescription: "General health check-up",
//     relation: "self",
//     weight: 75,
//   },
//   {
//     id: 2,
//     fullName: "Jane Smith",
//     email: "jane.smith@example.com",
//     visitType: "Follow-up",
//     age: 28,
//     gender: "Female",
//     phone: "0987654321",
//     problemDescription: "Follow-up on previous diagnosis",
//     relation: "self",
//     weight: 62,
//   },
// ];

type propsDetails = {
  age: string;
  doctor: doctorList;
  fullName: string;
  gender: string;
  id: string;
  phone: string;
  problem: string;
  relation: string;
  weight: string;
};

export default function PatientDetailsList() {
  const [user, setUser] = useState<propsDetails[]>();

  const router = useRouter();
  useEffect(() => {
    axios.get('/api/patientAppointmentDetail').then((response) => {
      setUser(response.data);
    });
  }, []);

  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (id: any) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  const smallTextStyle = 'text-[#80899A] font-semibold text-sm leading-9';
  const highlightStyle = 'text-[#000000] font-medium text-sm leading-3';
  return (
    <div className="space-y-8">
      <BackNavigation title="Patient Details" />

      <div className="space-y-4">
        {user?.map((user: propsDetails) => (
          <div className="space-y-6" key={user.id}>
            <button
              className="flex w-full cursor-pointer justify-between bg-gray-100 p-4 hover:bg-gray-200"
              onClick={() => handleRowClick(user.id)}
            >
              <div>
                <p className="font-medium">{user.doctor.name}</p>
                <p className="text-sm text-gray-600">{user.doctor.address}</p>
              </div>
              <div>
                <p className="text-sm">{user.doctor.specialist}</p>
              </div>
            </button>

            {expandedRow === user.id && (
              <>
                <div className="space-y-5 rounded-lg border border-card-line bg-white p-5 shadow-lg">
                  <div>
                    <p className={smallTextStyle}>Full name</p>
                    <h3 className={highlightStyle}>{user.fullName}</h3>
                  </div>
                  <div className="flex items-center gap-9">
                    <div>
                      <p className={smallTextStyle}>Age</p>
                      <span className={`${highlightStyle} block`}>
                        {user.age}
                      </span>
                    </div>
                    <div>
                      <p className={smallTextStyle}>Weight</p>
                      <span className={`${highlightStyle} block`}>
                        {user.weight}
                      </span>
                    </div>
                    <div>
                      <p className={smallTextStyle}>Relation</p>
                      <span className={`${highlightStyle} block`}>
                        {user.relation}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className={smallTextStyle}>Problem</h3>
                    <p className={highlightStyle}>{user.problem}</p>
                  </div>

                  <div>
                    <h3 className={smallTextStyle}>Mobile</h3>
                    <p className={highlightStyle}>{user.phone}</p>
                  </div>
                </div>

                <div>
                  <select
                    id="visitType"
                    name="visitType"
                    value=""
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Select Visit Type
                    </option>
                    <option value="consultation">Consultation</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="emergency">Emergency</option>
                    <option value="checkup">Check-up</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-xl font-medium leading-8 text-[#000000]">
                    Payment
                  </h3>
                  <p className="leading-2 text-sm font-semibold text-[#80899A]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugiat autem reiciendis cupiditate eligendi earum, ea
                    eveniet temporibus adipisci reprehenderit nesciunt est
                    doloribus itaque laborum porro perferendis explicabo unde
                    illo. Veritatis! Culpa placeat, fuga quidem numquam
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <button
                    onClick={() => router.push(`/payment/${user.id}`)}
                    className="h-10 w-[70%] cursor-pointer rounded-lg bg-card-commonColor px-9 text-lg font-[400] leading-6 text-white hover:bg-card-commonColor"
                  >
                    Pay Consulting Fee
                  </button>
                  <button className=" h-10 w-[70%] cursor-pointer rounded-lg border  border-card-commonColor px-9 text-lg font-[400] leading-6 text-card-commonColor">
                    Quick query
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
