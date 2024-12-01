import React, { ReactNode } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import styles from './IconButton.module.scss';
// ------------------------------------------------------------
/* eslint-disable react/button-has-type */

interface IconButtonProps {
  type?: 'submit' | 'button' | 'reset';
  children: string | ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  view?: 'primary' | 'secondary';
  size?: 'normal' | 'medium' | 'small';
  loading?: boolean;
}

export default function IconButton({
  children,
  type = 'button',
  onClick,
  className,
  view = 'primary',
  size = 'normal',
  loading,

  ...rest
}: IconButtonProps) {
  return (
    <button
      className={cn(
        styles.button,
        styles[`button--${view}`],
        styles[`button--${size}`],
        className,
        {
          [styles[`button--${view}-load`]]: loading,
        }
      )}
      onClick={!loading ? onClick : undefined}
      type={type}
      {...rest}
    >
      {loading ? (
        <span
          className={cn(styles['loading-element'], { [styles['loading-small']]: size === 'small' })}
        >
          <Image
            src={view === 'primary' ? 'icons/Loading.svg' : 'icons/Loading-blue.svg'}
            width={24}
            height={24}
            alt="loading"
          />
        </span>
      ) : (
        <p>{children}</p>
      )}
    </button>
  );
}
