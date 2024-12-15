import cn from 'classnames';
import { ReactNode } from 'react';
import styles from './PaginationElement.module.scss';
// ------------------------------------------------------------
/* eslint-disable react/button-has-type */

interface PaginationElementProps {
  children?: string | ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isMore?: boolean;
}
export default function PaginationElement({
  children,
  className,
  isActive,
  type = 'button',
  onClick,
  isMore,
}: PaginationElementProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(styles.element, className, {
        [styles[`element--active`]]: isActive && !isMore,
      })}
    >
      {isMore ? <span className={styles.element__more}>...</span> : <span>{children}</span>}
    </button>
  );
}
