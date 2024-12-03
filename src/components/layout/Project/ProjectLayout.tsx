'use client';

import cn from 'classnames';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Breadcrumb, { BreadcrumbProps } from '@/components/ui/Navigations/Breadcrumb/Breadcrumb';
import React from 'react';
import styles from './ProjectLayout.module.scss';

interface ProjectLayoutProps {
  breadcrumbs: BreadcrumbProps[];
  children: React.ReactNode;
}

function ProjectLayout({ breadcrumbs, children }: ProjectLayoutProps) {
  return (
    <div className={cn(styles['page-layout'])}>
      <div>
        <Sidebar />
      </div>
      <div className={cn(styles['page-layout__content'])}>
        <div className={cn(styles['page-layout__breadcrumb'])}>
          <ul>
            {breadcrumbs.map(({ href, isActive, isFirst, label }, index) => (
              <li key={index as number}>
                <Breadcrumb href={href} isActive={isActive} isFirst={isFirst}>
                  {label}
                </Breadcrumb>
              </li>
            ))}
          </ul>
        </div>
        {children}
      </div>
    </div>
  );
}

export default ProjectLayout;
