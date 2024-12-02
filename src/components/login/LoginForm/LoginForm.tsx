'use client';

import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import { getAccessToken } from '@/services/auth.helper';
import AuthService from '@/services/auth.service';
import { ILoginData, iLoginDataShema } from '@/types/auth.type';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '@/store/store';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './LoginForm.module.scss';

function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ILoginData>({
    resolver: zodResolver(iLoginDataShema),
  });

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
