import * as Yup from 'yup';

const doctorSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long'),

  education: Yup.string().required('Education is required'),

  specialist: Yup.string().required('Specialist field is required'),

  isAvailable: Yup.boolean()
    .required('Availability is required')
    .oneOf([true, false], 'Invalid value for availability'),

  about: Yup.string()
    .required('About section is required')
    .min(10, 'About section must be at least 10 characters long'),

  address: Yup.string().required('Address is required'),

  schedule: Yup.string().required('Schedule is required'),

  image: Yup.string(),

  experience: Yup.string()
    .required('Experience is required')
    .min(2, 'Experience must be at least 2 characters long'),
});

export default doctorSchema;
