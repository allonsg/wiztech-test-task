'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '@/app/hooks';
import FormInput from '@/app/components/FormInput';
import FormButton from '@/app/components/FormButton';

import { DEFAULT_EMAIL } from '@/app/constants';

import { formSchema, IFormInput } from '@/app/types';

const RegisterPage = () => {
  const { register, loading, isFetching } = useAuth();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: DEFAULT_EMAIL,
    },
  });

  const onSubmit = async (data: IFormInput) => {
    try {
      await register(data.email, data.password);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  if (loading) return <div className="mt-4 text-center">Loading...</div>;
  if (isFetching) return <div className="mt-4 text-center">Registering...</div>;

  return (
    <div className="mx-auto mt-10 max-w-md">
      <h1 className="mb-6 text-center text-2xl font-bold">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg bg-white p-6 shadow-md"
      >
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="Email"
          error={errors.email}
          register={formRegister('email')}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          error={errors.password}
          register={formRegister('password')}
        />
        <FormButton text="Register" isLoading={loading || isFetching} />
      </form>
    </div>
  );
};

export default RegisterPage;
