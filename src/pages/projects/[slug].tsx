'use client';

import { useRouter } from 'next/router';
import React from 'react';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Head from 'next/head';
import ProjectService from '@/services/project.service';
import Breadcrumb from '@/components/ui/Navigations/Breadcrumb/Breadcrumb';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Projects } from '@/types/project.type';
import cn from 'classnames';
import styles from './Projects.module.scss';

const fetchProjectBySlug = async (slug: string): Promise<Projects> =>
  ProjectService.getProject(slug);
export default function ProjectDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: project,
    isLoading,
    error,
  }: UseQueryResult<Projects, Error> = useQuery<Projects>({
    queryKey: ['project', slug],
    queryFn: () => fetchProjectBySlug(slug as string),
    enabled: !!slug,
  });

  return (
    <>
      <Head>
        <title>{project ? project.name : 'Загрузка проекта'}</title>
        <meta name="description" content="Детали проекта" />
      </Head>
      <div className={cn(styles['project-page'])}>
        <div>
          <Sidebar />
        </div>
        <div className={cn(styles.projects)}>
          <div className={cn(styles.projects__breadcrumb)}>
            <ul>
              <li>
                <Breadcrumb href="/" isFirst>
                  Главная
                </Breadcrumb>
              </li>
              <li>
                <Breadcrumb href="/projects">Проекты</Breadcrumb>
              </li>
              <li>
                <Breadcrumb href={`/project/${slug}`} isActive>
                  {isLoading ? 'Загрузка...' : project?.name}
                </Breadcrumb>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
