import React, { useEffect } from 'react';
import cn from 'classnames';
import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import CustomCombobox from '@/components/ui/CustomCombobox/CustomCombobox';
import DateInput from '@/components/ui/DateInput/DateInput';
import styles from './CreateModal.module.scss';
//-----------------------------------------------------------

const CreateModal = () => {
  useEffect(() => {}, []);
  return (
    <div className={cn(styles.modal__wrapper)}>
      <div className={cn(styles.modal)}>
        <div className={cn(styles.modal__header)}>
          <h2 className={cn(styles.modal__header_title)}>Создание задачи</h2>
          <button className={cn(styles.modal__header_close)} type="button">
            X
          </button>
        </div>
        <div className={cn(styles.modal__main)}>
          <div className={cn(styles['modal__task-name'])}>
            <CustomCombobox label="Тип задачи" placeholder="Тип" />
          </div>
          <div className={cn(styles['modal__main-comboboxes'])}>
            <CustomCombobox label="Тип задачи" placeholder="Тип" />
            <CustomCombobox label="Компонент" placeholder="Компонент" />
            <CustomCombobox label="Исполнитель" placeholder="Исполнитель" />
          </div>
          <div className={cn(styles['modal__extra-comboboxes'])}>
            <CustomCombobox label="Исполнитель" placeholder="Исполнитель" />
            <CustomCombobox label="Исполнитель" placeholder="Исполнитель" />
            <DateInput placeholder="Дата начала" />
            <DateInput placeholder="Дата завершения" />
          </div>
        </div>
        <div className={cn(styles.modal__footer)}>
          <StandardButton>Добавить</StandardButton>
          <StandardButton view="secondary">Отменить</StandardButton>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
