import React, { ComponentProps } from 'react';

interface FormButtonProps extends ComponentProps<'button'> {
  text: string;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const FormButton: React.FC<FormButtonProps> = ({
  text,
  isLoading = false,
  type = 'submit',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`w-full rounded-md bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700 ${
        isLoading ? 'cursor-not-allowed opacity-50' : ''
      }`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : text}
    </button>
  );
};

export default FormButton;
