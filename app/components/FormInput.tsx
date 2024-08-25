import React, { ComponentProps } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps extends ComponentProps<'input'> {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  name,
  placeholder,
  error,
  register,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 block font-medium text-gray-700">
        {label}:
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register}
        {...props}
        className={`w-full border px-4 py-2 text-black ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormInput;
