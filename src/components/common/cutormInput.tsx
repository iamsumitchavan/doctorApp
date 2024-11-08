'use client';

import { ErrorMessage, Field } from 'formik';

type customInputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  id: string;
  name: string;
  isgender?: boolean;
  as?: string;
  select?: 'gender' | 'relation';
  rows?: string;
};

export const CustomInput: React.FC<customInputProps> = ({
  label,
  placeholder,
  type,
  id,
  name,
  isgender,
  as,
  select,
  rows,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor="mobileNumber"
        className="block text-sm font-medium text-[#80899A]"
      >
        {label}
      </label>
      {!isgender && (
        <Field
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          as={as}
          rows={rows}
          className="mt-1 block w-full rounded-md bg-card-textBackground px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      )}

      {isgender && (
        <>
          <Field
            className="mt-2 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            name={name}
            as={as}
          >
            {select === 'gender' && (
              <>
                <option value="">select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </>
            )}
            {select === 'relation' && (
              <>
                <option value="">select relation</option>
                <option value="Brother">Brother</option>
                <option value="Son">Son</option>
                <option value="Father">Father</option>
              </>
            )}
          </Field>
        </>
      )}

      <ErrorMessage
        name={name}
        component="div"
        className="mt-1 text-sm text-red-500"
      />
    </div>
  );
};
