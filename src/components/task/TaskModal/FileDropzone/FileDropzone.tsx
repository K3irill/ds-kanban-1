// @ts-ignore
import Files from 'react-files';

import { useState } from 'react';
import styles from './FileDropzone.module.scss';
import { type } from '../../../../types/user.type';

const FileDropzone = () => {
  const [previewFile, setPreviewFile] = useState([]);

  const handleChange = (newFiles: any[]) => {
    setPreviewFile((prevFiles) => [...prevFiles, ...newFiles]);
  };
  const handleError = (error: any) => {
    console.log(`error code ${error.code}: ${error.message}`);
  };

  const handleFileRemove = (fileId: string) => {
    setPreviewFile((prevFiles) => prevFiles.filter((prevFile) => prevFile.id !== fileId));
  };

  return (
    <div className={styles.files}>
      <Files
        className={styles.dropzone}
        onChange={handleChange}
        onError={handleError}
        accepts={['image/png', '.pdf', 'audio/*']}
        multiple
        maxFileSize={10000000}
        minFileSize={0}
        clickable
      >
        <svg viewBox="0 0 20 20">
          <use href="/sprite.svg#scraper" />
        </svg>
        <span>Выбери файлы или перетащи их сюда</span>
      </Files>

      {previewFile.length !== 0 && (
        <div className={styles.fileList}>
          {previewFile.map((file) => (
            <div key={file.id} className={styles.blockFile}>
              <div className={styles.imgFile}>
                <img src={file.preview.url} alt={`Название файла ${file.name}`} />
              </div>
              <div className={styles.contetnFile}>
                <div className={styles.nameFile}>{file.name}</div>
                <div className={styles.dateFile}>
                  {new Intl.DateTimeFormat('ru-RU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  }).format(file.date)}
                </div>
                <button
                  type="button"
                  onClick={() => handleFileRemove(file.id)}
                  className={styles.delFile}
                >
                  del
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
