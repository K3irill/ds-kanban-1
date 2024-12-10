import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import styles from './FileInput.module.scss';

const FileInput = ({ name, watch, register, setValue, accept }: any) => {
  const files = watch(name);

  const onDrop = useCallback(
    (droppedFiles: any) => {
      setValue(name, droppedFiles, { shouldVaidata: true });
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, onDrop });

  return (
    <>
      <div {...getRootProps()} className={styles.dropzone}>
        <input
          accept={accept}
          {...register(name)}
          type="file"
          name={name}
          id={name}
          {...getInputProps()}
        />

        <div className={isDragActive ? styles.red : styles.blue}>
          {isDragActive ? (
            <div>отпустите</div>
          ) : (
            <>
              <svg viewBox="0 0 20 20">
                <use href="/sprite.svg#scraper" />
              </svg>
              <span>Выбери файлы или перетащи их сюда</span>
            </>
          )}
        </div>
      </div>

      <div>
        {!!files?.length && (
          <div>
            {files.map((file: any) => (
              <div className={styles.imgFile} key={file.name}>
                <img src={URL.createObjectURL(file)} alt={file.name} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FileInput;
