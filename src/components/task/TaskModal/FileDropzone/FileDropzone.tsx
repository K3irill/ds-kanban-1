import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import TaskService from '@/services/task.service';
import Dropzone, { IDropzoneProps, ILayoutProps } from 'react-dropzone-uploader';
import styles from './FileDropzone.module.scss';

const Layout = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles },
}: ILayoutProps) => (
  <div className={styles.dz}>
    <div {...dropzoneProps}>{files.length < maxFiles && input}</div>

    {previews}
    {files.length > 0 && submitButton}
  </div>
);
const Preview: React.FC<{ meta: any }> = ({ meta }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
  }, [meta.file]);

  return (
    <div>
      {preview && <img src={preview} alt="Preview" style={{ width: '100px', height: '100px' }} />}
    </div>
  );
};
const FileDropzone = () => {
  const [previewFile, setPreviewFile] = useState<TypeFile[]>([]);

  // const { mutateAsync } = useMutation({
  //   mutationKey: ['fileTask'],
  //   mutationFn: (file: any) => {
  //     debugger;
  //     TaskService.patchFileTask('6', file);
  //   },
  //   onSuccess: () => {},
  //   onError: (error) => {},
  // });

  // const handleUploadFiles = async () => {
  //   try {
  //     if (!previewFile || previewFile.length === 0) {
  //       window.alert('No files to upload.');
  //       return;
  //     }

  //     const formData = new FormData();
  //     debugger;
  //     previewFile.forEach((file) => {
  //       if (file && file.id && file.type && file.content) {
  //         formData.append(
  //           file.id,
  //           new Blob([file.content], { type: file.type }),
  //           file.name || 'file'
  //         );
  //       } else {
  //         console.error('Invalid file structure:', file);
  //       }
  //     });
  //     const response = await mutateAsync(formData);

  //     console.log('Uploaded files:', response);
  //   } catch (error) {
  //     console.error('Error uploading files:', error);
  //   } finally {
  //     console.log('Upload process completed');
  //   }
  // };

  // const handleChange = (newFiles: TypeFile[]) => {
  //   setPreviewFile((prevFiles) => [...prevFiles, ...newFiles]);
  // };

  // add type defs to function props to get TS support inside function bodies,
  // and not just where functions are passed as props into Dropzone
  const getUploadParams = ({ meta }: any) => {
    debugger;
    return { url: '/upload' }; // URL API для загрузки файлов
  };

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };
  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
    setPreviewFile([0]);
  };

  const a = (
    <>
      <svg viewBox="0 0 20 20">
        <use href="/sprite.svg#scraper" />
      </svg>
      <span>Выбери файлы или перетащи их сюда</span>
    </>
  );

  return (
    <div className={styles.files}>
      <Dropzone
        getUploadParams={getUploadParams}
        LayoutComponent={Layout}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        multiple
        classNames={{
          dropzone: 'dropzone',
          dropzoneActive: 'dropzone__isDragActive',
          preview: 'dropzone__preview',
        }}
        PreviewComponent={Preview}
        inputContent={a}
      />

      {/* <svg viewBox="0 0 20 20">
          <use href="/sprite.svg#scraper" />
        </svg>
        <span>Выбери файлы или перетащи их сюда</span> */}

      {/* {previewFile.length !== 0 && (
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
          <StandardButton onClick={handleUploadFiles}>Отправить</StandardButton>
        </div>
      )} */}
    </div>
  );
};

export default FileDropzone;
