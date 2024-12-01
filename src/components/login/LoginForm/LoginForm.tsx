'use client';

import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import AuthService from '@/services/auth.service';
import { ILoginData, iLoginDataShema } from '@/types/auth.type';
import { zodResolver } from '@hookform/resolvers/zod';
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
    setError,
  } = useForm<ILoginData>({
    resolver: zodResolver(iLoginDataShema),
  });

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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapperInput}>
        <input type="text" {...register('email')} />
        {errors.email && <div className={styles.errorMessage}>{`${errors.email.message}`}</div>}
      </div>
      <div className={styles.wrapperInput}>
        <input type="password" {...register('password')} />
        {errors.password && (
          <div className={styles.errorMessage}>{`${errors.password.message}`}</div>
        )}
      </div>
      <StandardButton type="submit" isDisabled={isPending}>
        Вход
      </StandardButton>
    </form>
  );
}

export default LoginForm;
