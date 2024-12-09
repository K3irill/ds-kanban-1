import React from 'react';
import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import TaskService from '@/services/task.service';
import { IUserCommit, iUserCommitShema } from '@/types/task.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import styles from './WriteComment.module.scss';
import FileDropzone from '../FileDropzone/FileDropzone';

const WriteComment = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IUserCommit>({
    resolver: zodResolver(iUserCommitShema),
  });

  const { mutate: mutatePostCommit } = useMutation({
    mutationKey: ['writeComment'],
    mutationFn: (data: IUserCommit) => TaskService.postCommit('6', data),
    onSuccess: (data) => {
      console.log(data);
      debugger;
      reset();
    },
    onError: (error) => {
      const err = error as AxiosError;
    },
  });

  const onSubmit: SubmitHandler<IUserCommit> = (data) => {
    mutatePostCommit(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title}>
        <span>Комментарии</span>
      </div>
      <textarea placeholder="Описание" {...register('content')} className={styles.textarea} />
      {/* <FileDropzone /> */}
      <StandardButton type="submit" className={styles.submit}>
        Отправить
      </StandardButton>
    </form>
  );
};

export default WriteComment;
