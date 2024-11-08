'use client';

import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { memo } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';

import type { doctorList, PatientAppointmentDetail } from '@/types';

import { withDoctorListAndUser } from '../hoc/withDoctorHome';

//

type doctorhomeProps = {
  data: doctorList[];
  user: PatientAppointmentDetail[];
};

const DoctorHome = ({ data, user }: doctorhomeProps) => {
  const headingStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    color: '#333',
    fontSize: '16px',
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="doctor table">
        <TableHead>
          <TableRow>
            <TableCell sx={headingStyle}>Profile Picture</TableCell>
            <TableCell sx={headingStyle}>Name</TableCell>
            <TableCell sx={headingStyle}>Specialization</TableCell>
            <TableCell sx={headingStyle}>About</TableCell>
            <TableCell sx={headingStyle}>Qualification</TableCell>
            <TableCell sx={headingStyle}>Address</TableCell>
            <TableCell sx={headingStyle}>Action</TableCell>
            <TableCell sx={headingStyle}>Assigned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((doctor: doctorList) => (
            <TableRow key={doctor.id}>
              <TableCell>
                <Avatar
                  alt={doctor.name}
                  src={doctor.image}
                  sx={{ width: 56, height: 56 }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography variant="body1">{doctor.name}</Typography>
              </TableCell>
              <TableCell>{doctor.specialist}</TableCell>
              <TableCell>{doctor.about}</TableCell>
              <TableCell>{doctor.education}</TableCell>
              <TableCell>{doctor.address}</TableCell>
              <TableCell>
                <MdDeleteOutline className="inline-block cursor-pointer text-2xl" />

                <FiEdit className="inline-block cursor-pointer text-2xl" />
              </TableCell>
              <TableCell>
                {user.map((user: PatientAppointmentDetail) => (
                  <div key={user.id}>
                    <Link
                      className="text-sm font-medium leading-6 text-blue-800"
                      href={`/doctor/${user.id}`}
                    >
                      {user.doctor.id === doctor.id && user.fullName}
                    </Link>
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const MemoizedDoctorHome = memo(DoctorHome);

export default withDoctorListAndUser(MemoizedDoctorHome);
