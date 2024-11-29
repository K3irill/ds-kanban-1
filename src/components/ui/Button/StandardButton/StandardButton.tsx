import React, { ReactNode } from 'react';
import cn from 'classnames';
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
  ...rest
}: StandardButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[view], styles[size], className, {
        [styles[`${view}--loading`]]: loading,
      })}
      onClick={!loading ? onClick : undefined}
      type={type}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      {children}
      {loading && (
        <span
          className={cn(styles['loading-element'], { [styles['loading-small']]: size === 'small' })}
        >
          <svg className={styles['loading-icon']} viewBox="0 0 24 24" width="12" height="12">
            <use href="sprite.svg#loading" />
          </svg>
        </span>
      )}
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}

export default StandardButton;
