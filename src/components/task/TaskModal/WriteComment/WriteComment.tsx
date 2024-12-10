import React from 'react';
import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import TaskService from '@/services/task.service';
import { IUserCommit, iUserCommitShema } from '@/types/task.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import styles from './WriteComment.module.scss';

import FileInput from '../FileInput/FileInput';

const WriteComment = () => {
  const { handleSubmit, register, reset, watch, setValue } = useForm<IUserCommit>({
    resolver: zodResolver(iUserCommitShema),
    mode: 'onBlur',
  });

  const { mutate: mutatePostCommit } = useMutation({
    mutationKey: ['writeComment'],
    mutationFn: (data: any) => TaskService.postCommit('6', data),
    onSuccess: (data) => {
      console.log(data);

      reset();
    },
    onError: (error) => {
      const err = error as AxiosError;
    },
  });

  const accept = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
  };

  const onSubmit: SubmitHandler<IUserCommit> = (data) => {
    const { content, files } = data;

    const formData = new FormData();

    formData.append('content', content);

    if (files && files.length > 0) {
      files.forEach((file, index) => {
        debugger;
        formData.append(`files[${index}]`, file);
      });
    }
    mutatePostCommit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FileInput
        accept={accept}
        name="files"
        register={register}
        watch={watch}
        setValue={setValue}
      />
      <div className={styles.title}>
        <span>Комментарии</span>
      </div>
      <textarea placeholder="Описание" {...register('content')} className={styles.textarea} />

      <StandardButton type="submit" className={styles.submit}>
        Отправить
      </StandardButton>
    </form>
  );
};

export default WriteComment;
