import React from 'react';
import cn from 'classnames';
import styles from '@/styles/Home.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';

interface HeaderProps {
  handleSignClick: () => void;
  isLoading?: boolean;
  isAuthorized: boolean;
}
export default function Header({ handleSignClick, isLoading, isAuthorized }: HeaderProps) {
  return (
    <header className={cn(styles.header)}>
      <div className={cn(styles.header__wrapper)}>
        <div className={cn(styles.header__content)}>
          <Link href="/">
            <Image src="/logo.svg" alt="ds-logo" width="155" height="50" priority />
          </Link>
          <StandardButton onClick={handleSignClick} loading={isLoading}>
            {isAuthorized ? 'Выйти' : 'Войти'}
          </StandardButton>
        </div>
      </div>
    </header>
  );
}
