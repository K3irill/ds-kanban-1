import cn from 'classnames';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './Breadcrumb.module.scss';
/* eslint-disable */
export interface BreadcrumbProps {
  children?: string | ReactNode;
  href: string;
  className?: string;
  isActive?: boolean;
  isFirst?: boolean;
  label?: string;
}
export default function Breadcrumb({
  children,
  label,
  href,
  className,
  isActive,
  isFirst,
}: BreadcrumbProps) {
  return (
    <Link
      href={href}
      className={cn(styles.element, className, { [styles[`element--active`]]: isActive })}
    >
      {isFirst ? '' : <span className={styles.element__slash}>/</span>}
      <p>{children}</p>
    </Link>
  );
}
