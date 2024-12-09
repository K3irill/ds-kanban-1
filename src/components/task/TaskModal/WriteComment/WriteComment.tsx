import React from 'react';
import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import styles from './WriteComment.module.scss';
import FileDropzone from '../FileDropzone/FileDropzone';

const WriteComment = () => {
  console.log('s');
  return (
    <>
      <div className={styles.title}>
        <span>Комментарии</span>
      </div>
      <textarea placeholder="Описание" className={styles.textarea} />
      <FileDropzone />
      <StandardButton className={styles.submit}>Отправить</StandardButton>
    </>
  );
};

export default WriteComment;
