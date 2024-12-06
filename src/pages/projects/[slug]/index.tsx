'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';
import ProjectService from '@/services/project.service';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { Project } from '@/types/project.type';
import ProjectLayout from '@/components/layout/Project/ProjectLayout';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Loader from '@/components/ui/Loader/loader';
import TaskColumn from '@/components/task/TaskColumn/TaskColumn';
import TaskCard from '@/components/task/TaskCard/TaskCard';
import TaskService from '@/services/task.service';
import { AxiosError } from 'axios';
import useProject from '@/hooks/useProject';
import styles from './KanbanPage.module.scss';

export default function KanbanPage() {
  const router = useRouter();
  const { slug } = router.query;
  const projectSlug = Array.isArray(slug) ? slug[0] : slug;

  const { project, isLoading, error } = useProject(projectSlug || '');
  // const {
  //   data: project,
  //   isLoading,
  //   error,
  //   isSuccess,
  //   isError,
  // }: UseQueryResult<any, Error> = useQuery<any>({
  //   queryKey: ['project', projectSlug],
  //   queryFn: () => fetchProjectBySlug(projectSlug || ''),
  //   enabled: !!projectSlug,
  // });

  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log('Запрос успешный');
  //   }
  // }, [isSuccess, project]);
  // useEffect(() => {
  //   if (isError) {
  //     console.log('Ошибка');
  //   }
  // }, [isError]);

  // const { data: tasks } = useQuery({
  //   queryKey: ['project', projectSlug],
  //   queryFn: () => TaskService.getTasks(projectSlug || ''),
  //   enabled: !!projectSlug,
  // });

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
          <>
            <div className={cn(styles['project-kanban__header'])}>
              <h1>{project?.name || 'Загрузка...'}</h1>
            </div>
            <div className={cn(styles['project-kanban__filters'])}>
              <div className={cn(styles['project-kanban__inputs'])}>
                {/* инпуты */}
                <label htmlFor="">
                  <span>Название задачи</span>
                  <input type="text" />
                </label>
              </div>
              <div className={cn(styles['project-kanban__calendars'])}>
                {/* дата начала дата завершения */}
              </div>
            </div>
            <div className={cn(styles['project-kanban__tasks-wrapper'])}>
              <div className={cn(styles['project-kanban__tasks-container'])}>
                {error && (
                  <p className={styles['error-message']}>Ошибка загрузки: {error.message}</p>
                )}
                <TaskColumn heading="Новые" taskCount={0}>
                  <TaskCard
                    link="#"
                    id={1}
                    priority={1}
                    name={1}
                    users={1}
                    task_type={1}
                    task_component={1}
                  />
                </TaskColumn>
                <TaskColumn heading="В работе" taskCount={0}>
                  <div>some</div>
                </TaskColumn>
                <TaskColumn heading="Выполнены" taskCount={0}>
                  <div>some</div>
                </TaskColumn>
                <TaskColumn heading="Ревью" taskCount={0}>
                  <div>some</div>
                </TaskColumn>
                <TaskColumn heading="Готовы к тестированию" taskCount={0}>
                  <div>some</div>
                </TaskColumn>
                <TaskColumn heading="В тестировании" taskCount={0}>
                  <div>some</div>
                </TaskColumn>
                <TaskColumn heading="Решены" taskCount={0}>
                  <div>some</div>
                </TaskColumn>
              </div>
            </div>
          </>
        )}
      </ProjectLayout>
    </>
  );
}
