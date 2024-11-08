import * as Yup from 'yup';

// Patient Information Schema
const patientSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters')
    .max(50, 'First Name cannot exceed 50 characters'),

  lastName: Yup.string()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters')
    .max(50, 'Last Name cannot exceed 50 characters'),

  age: Yup.number()
    .required('Age is required')
    .min(0, 'Age cannot be less than 0')
    .max(120, 'Age cannot exceed 120'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),

  address: Yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters long'),

  gender: Yup.string()
    .oneOf(['male', 'female', 'other'], 'Invalid gender')
    .required('Gender is required'),
  image: Yup.mixed().required('Image is required'),

  medicalHistory: Yup.string()
    .notRequired() // Optional field
    .max(100, 'Medical History cannot exceed 500 characters'),
});

export default patientSchema;
