export type doctorList = {
  id: string;
  name: string;
  education: string;
  specialist: string;
  isAvailable: boolean;
  about: string;
  address: string;
  schedule: string;
  experience: string;
  image: string;
};

// Notification

export type notificationProps = {
  id: string;
  message: string;
  date: string;
  time: string;
  notificationType: string;
  doctorName: string;
};

// appointment type

export type appointmentType = {
  id: string;
  appointmentId: string;
  doctor: doctorList;
  date: string;
  timeSlot: string;
};

// patient appointment details

export type PatientAppointmentDetail = {
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
