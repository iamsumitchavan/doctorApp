import * as Yup from 'yup';

export const validationSchema = Yup.object({
  mobileNumber: Yup.string()
    .required('Mobile number is required')
    .matches(
      /^\d{10}$/,
      'Mobile number must be exactly 10 digits and only contain numbers',
    ),
  code: Yup.string().required('this is required field'),
});
