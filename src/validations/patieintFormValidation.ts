import * as Yup from 'yup';

export const patientFormValidation = Yup.object({
  // Full Name: Required, at least 2 characters
  fullName: Yup.string()
    .required('Full Name is required')
    .min(2, 'Full Name must be at least 2 characters'),

  // Gender: Required, must be one of the allowed values
  gender: Yup.string()
    .required('Gender is required')
    .oneOf(['male', 'female', 'other'], 'Invalid gender selection'),

  // Age: Required, must be a positive integer between 1 and 120
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be a whole number')
    .min(1, 'Age must be at least 1')
    .max(120, 'Age cannot be more than 120'),

  // Phone: Required, must be a valid phone number (10 digits)
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),

  // Problem Description: Required, at least 10 characters
  problem: Yup.string()
    .required('Problem Description is required')
    .min(10, 'Problem Description must be at least 10 characters'),

  // Relation: Required, must be one of the allowed values
  relation: Yup.string()
    .required('Relation is required')
    .oneOf(['Brother', 'Son', 'Father'], 'Invalid relation selection'),

  // Weight: Optional, but if provided must be a positive number
  weight: Yup.number()
    .nullable() // Allows the field to be optional (null or empty)
    .positive('Weight must be a positive number')
    .typeError('Weight must be a number'),
});
