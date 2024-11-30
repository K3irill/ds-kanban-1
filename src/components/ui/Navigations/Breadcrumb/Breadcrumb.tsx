import cn from 'classnames';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './Breadcrumb.module.scss';

interface BreadcrumbProps {
  children: string | ReactNode;
  href: string;
  className?: string;
  isActive?: boolean;
  isFirst?: boolean;
}
export default function Breadcrumb({
  children,
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
      {isFirst ? '/' : ''}
      <span>{children}</span>
    </Link>
  );
}
