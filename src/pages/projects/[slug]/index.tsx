'use client';

import React from 'react';
import Head from 'next/head';
import ProjectService from '@/services/project.service';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Project } from '@/types/project.type';
import ProjectLayout from '@/components/layout/Project/ProjectLayout';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Loader from '@/components/ui/Loader/loader';
import styles from './KanbanPage.module.scss';

const fetchProjectBySlug = async (slug: string): Promise<Project> =>
  ProjectService.getProject(slug);

export default function KanbanPage() {
  const router = useRouter();
  const { slug } = router.query;
  const projectSlug = Array.isArray(slug) ? slug[0] : slug;

  const {
    data: project,
    isLoading,
    error,
  }: UseQueryResult<any, Error> = useQuery<any>({
    queryKey: ['project', projectSlug],
    queryFn: () => fetchProjectBySlug(projectSlug || ''),
    enabled: !!projectSlug,
  });

  const breadcrumbs = [
    { href: '/', label: 'Главная', isFirst: true },
    { href: '/projects', label: 'Проекты' },
    ...(project ? [{ href: `/projects/${slug}`, label: project.name, isActive: true }] : []),
  ];

  return (
    <>
      <Head>
        <title>{project?.name || 'Загрузка...'}</title>
        <meta name="description" content="Проект" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProjectLayout breadcrumbs={breadcrumbs}>
        {isLoading ? (
          <div className={cn('loader-container')}>
            <Loader />
          </div>
        ) : (
          <div className={cn(styles['project-kanban'])}>
            <div className={cn(styles['project-kanban__header'])}>
              <h1>{project?.name || 'Загрузка...'}</h1>
            </div>

            <div className={cn(styles['project-kanban__tasks-container'])}>
              {error && <p className={styles['error-message']}>Ошибка загрузки: {error.message}</p>}

              {!isLoading && !error && (
                <div className={cn(styles['project-kanban__projects-activities'])}>
                  <p>содержимое проекта</p>
                </div>
              )}
            </div>
          </div>
        )}
      </ProjectLayout>
    </>
  );
}
