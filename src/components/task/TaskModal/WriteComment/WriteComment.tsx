import React from 'react';
import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import TaskService from '@/services/task.service';
import { IUserCommit, iUserCommitShema } from '@/types/task.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import styles from './WriteComment.module.scss';

interface PropsWriteComment {
  id: Number;
}

const WriteComment = ({ id }: PropsWriteComment) => {
  const { handleSubmit, register, reset } = useForm<IUserCommit>({
    resolver: zodResolver(iUserCommitShema),
    mode: 'onBlur',
  });

  const { mutate: mutatePostCommit } = useMutation({
    mutationKey: ['writeComment'],
    mutationFn: (data: any) => TaskService.postCommit(id, data),
    onSuccess: () => {
      reset();
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

      <StandardButton type="submit" className={styles.submit}>
        Отправить
      </StandardButton>
    </form>
  );
};

export default WriteComment;
