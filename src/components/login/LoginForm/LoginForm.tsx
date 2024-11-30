'use client';

import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import AuthService from '@/services/auth.service';
import { ILoginData } from '@/types/auth.type';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

function LoginForm() {
  const { handleSubmit, register, reset } = useForm<ILoginData>();

  const router = useRouter();

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: ILoginData) => AuthService.login(data),
    onSuccess() {
      reset();
      router.push('/projects');
    },
  });

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    mutateLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="email" {...register('email', { required: true })} />
      </div>
      <div>
        <input type="password" {...register('password', { required: true })} />
      </div>
      <StandardButton type="submit" isDisabled={isPending}>
        Вход
      </StandardButton>
    </form>
  );
}

export default LoginForm;
