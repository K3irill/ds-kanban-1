// @ts-ignore
import Files from 'react-files';

import { useState } from 'react';
import styles from './FileDropzone.module.scss';

const FileDropzone = () => {
  const [previewFile, setPreviewFile] = useState([]);
  const handleChange = (files: any) => {
    console.log(files);

    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };

    const newFiles = Array.from(files).map((file: any) => ({
      name: file.name,
      url: file.preview.url,
      date: new Intl.DateTimeFormat('ru-RU', options).format(files[0].lastModifiedDate),
    }));

    setPreviewFile([...previewFile, ...newFiles]);
  };

  const handleError = (error: any) => {
    console.log(`error code ${error.code}: ${error.message}`);
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
        <svg className="social-icon" viewBox="0 0 16 16">
          <use href="/sprite.svg#scraper" className={styles.icon} />
        </svg>
        <span>Выбери файлы или перетащи их сюда</span>
      </Files>

      {previewFile.length !== 0 && (
        <div className={styles.fileList}>
          {previewFile.map((file) => (
            <div className={styles.blockFile}>
              <div className={styles.imgFile}>
                <img src={file.url} alt={`Название файла ${file.name}`} />
              </div>
              <div className={styles.contetnFile}>
                <div className={styles.nameFile}>{file.name}</div>
                <div className={styles.dateFile}>{file.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
