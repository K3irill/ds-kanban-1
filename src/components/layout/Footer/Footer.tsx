import React from 'react';
import cn from 'classnames';
import styles from '@/styles/Home.module.scss';

export default function Footer() {
  return (
    <footer className={cn(styles.footer)}>
      <div className={cn(styles.footer__wrapper)}>
        <div className={cn(styles.footer__content)}>
          <ul>
            <li>Ионова Диана</li>
            <li>Гришин Денис</li>
            <li>Колесниченко Кирилл</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
