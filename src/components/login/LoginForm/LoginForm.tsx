'use client';

import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import { getAccessToken } from '@/services/auth.helper';
import AuthService from '@/services/auth.service';
import useAuthStore from '@/store/store';
import { ILoginData } from '@/types/auth.type';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

function LoginForm() {
  const { handleSubmit, register, reset } = useForm<ILoginData>();
  const { setUser } = useAuthStore();
  const router = useRouter();

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: ILoginData) => AuthService.login(data),
    onSuccess: async () => {
      try {
        const user = await AuthService.getUser();
        const token = getAccessToken();
        setUser(user, token);
        reset();
        router.push('/projects');
      } catch (error) {
        console.error('Ошибка загрузки данных пользователя:', error);
      }
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
