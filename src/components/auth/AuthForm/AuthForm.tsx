'use client';

import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import AuthService from '@/services/auth.service';
import { IUserData } from '@/types/auth.type';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

function AuthForm() {
  const { handleSubmit, register, reset } = useForm<IUserData>();

  const router = useRouter();

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: IUserData) => AuthService.login(data),
    onSuccess(data) {
      localStorage.setItem('token', data.token);
      reset();
      router.push('/');
    },
  });

  const onSubmit: SubmitHandler<IUserData> = (data) => {
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

export default AuthForm;
