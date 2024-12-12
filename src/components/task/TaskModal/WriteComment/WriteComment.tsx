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

  // const { mutate: mutatePatchFileCommit } = useMutation({
  //   mutationKey: ['PatchFileComment'],
  //   mutationFn: (data: any) => TaskService.patchFileCommit(slug, anem),
  //   onSuccess: () => reset(),
  //   onError: (error) => {
  //     const err = error as AxiosError;
  //   },
  // });

  const { mutate: mutatePostCommit } = useMutation({
    mutationKey: ['writeComment'],
    mutationFn: (data: any) => TaskService.postCommit('6', data),
    onSuccess: () => {
      // mutatePatchFileCommit()
      reset();
    },
    onError: (error) => {
      const err = error as AxiosError;
    },
  });

  const onSubmit: SubmitHandler<IUserCommit> = (data) => {
    const { content, files } = data;
    const formData = new FormData();

    Array.from(files).forEach((file: any) => {
      const newFile = {
        path: parseInt(file.path.replace(/^\.\//, ''), 10), // Преобразует строку в целое число
        relativePath: file.relativePath.replace(/^\.\//, ''),
        lastModified: file.lastModified,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath,
      };

      // Используем newFile в FormData

      formData.append(
        'files',
        new File([file], newFile.name, {
          type: newFile.type,
          lastModified: newFile.lastModified,
        })
      );
    });
    formData.append('content', content);

    // formData.append('content', content);
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value.size}`);
    // }
    debugger;
    mutatePostCommit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FileInput name="files" register={register} watch={watch} setValue={setValue} />

      {/* <input type="file" {...register('files')} name="files" /> */}
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
