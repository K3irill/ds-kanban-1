import React, { ReactNode } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import styles from './StandardButton.module.css';
// ------------------------------------------------------------
/* eslint-disable react/button-has-type */

interface StandardButtonProps {
  type?: 'submit' | 'button' | 'reset';
  children: string | ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  view?: 'primary' | 'secondary' | 'tertiary';
  size?: 'normal' | 'medium' | 'small';
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  isDisabled?: boolean;
}

function StandardButton({
  children,
  type = 'button',
  onClick,
  className,
  view = 'primary',
  size = 'normal',
  loading,
  icon,
  iconPosition,
  isDisabled = false,
  ...rest
}: StandardButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[view], styles[size], className, {
        [styles[`${view}--loading`]]: loading,
      })}
      onClick={!loading ? onClick : undefined}
      type={type}
      disabled={isDisabled}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      {children}
      {loading && (
        <p
          className={cn(styles['loading-element'], { [styles['loading-small']]: size === 'small' })}
        >
          <Image src="/icons/Loading.svg" alt="loading" width="20" height="20" />
        </p>
      )}
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}

export default StandardButton;
