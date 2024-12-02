'use client';

import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import UserService from '@/services/user.service';
import { ILoginData, iLoginDataShema } from '@/types/user.type';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '@/store/store';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { getAccessToken } from '@/services/services.helper';

import styles from './LoginForm.module.scss';

function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setError,
  } = useForm<ILoginData>({
    resolver: zodResolver(iLoginDataShema),
  });

  const { setUser } = useAuthStore();
  const router = useRouter();

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: ILoginData) => UserService.login(data),
    onSuccess: async () => {
      const user = await UserService.getIUser();
      const token = getAccessToken();
      // @ts-ignore
      setUser(user, token);

      reset();
      router.push('/projects');
    },
    onError: (error) => {
      const err = error as AxiosError;

      if (err.status === 403 || err.status === 401) {
        setError('email', { type: 'custom', message: 'Неверный логин или пароль' });
        return;
      }
      console.error('Ошибка:', error);
    },
  });

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    mutateLogin(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title}>Вход</div>
      <div className={styles.wrapperInput}>
        <label className={styles.label} htmlFor="loginEmail">
          Электронная почта
        </label>
        <input
          placeholder="Электронная почта"
          id="login-email"
          type="text"
          {...register('email')}
        />
        {errors.email && <div className={styles.errorMessage}>{errors.email.message}</div>}
      </div>
      <div className={styles.wrapperInput}>
        <label htmlFor="loginPassword">Пароль</label>
        <input placeholder="Пароль" type="password" id="loginPassword" {...register('password')} />
        {errors.password && <div className={styles.errorMessage}>{errors.password.message}</div>}
      </div>
      <StandardButton type="submit" className={styles.submit} loading={isPending}>
        Войти
      </StandardButton>
    </form>
  );
}

export default LoginForm;
