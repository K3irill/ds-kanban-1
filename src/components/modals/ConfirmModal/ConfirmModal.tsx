import React from 'react';
import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import IconButton from '@/components/ui/Button/IconButton/IconButton';
import cn from 'classnames';
import styles from './ConfirmModal.module.scss';

const ConfirmModal = ({ isOpen, onClick, closeConfirmModal }: any) => {
  const handleClick = () => {
    onClick();
    closeConfirmModal(false);
  };
  return (
    <div className={cn(styles.modal, { [styles.hidden]: !isOpen })}>
      <div className={styles.modal__header}>
        <h2>Закрыть окно?</h2>
        <IconButton onClick={() => closeConfirmModal(false)} view="secondary">
          <svg className="social-icon" viewBox="0 0 24 24" width="24" height="24">
            <use href="/sprite.svg#close" />
          </svg>
        </IconButton>
      </div>
      <div className={styles.modal__buttons}>
        <StandardButton onClick={handleClick}>Да</StandardButton>
        <StandardButton onClick={() => closeConfirmModal(false)} view="secondary">
          Нет
        </StandardButton>
      </div>
    </div>
  );
};

export default ConfirmModal;
