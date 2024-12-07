'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';
import ProjectService from '@/services/project.service';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Project } from '@/types/project.type';
import ProjectLayout from '@/components/layout/Project/ProjectLayout';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Loader from '@/components/ui/Loader/loader';
import TaskColumn from '@/components/task/TaskColumn/TaskColumn';
import TaskCard from '@/components/task/TaskCard/TaskCard';
import styles from './KanbanPage.module.scss';

const fetchProjectBySlug = async (slug: string): Promise<Project> =>
  ProjectService.getProject(slug);
const fetchListTasksBySlug = async (slug: string): Promise<Project> =>
  ProjectService.getListTasks(slug);
const PROJECT_STAGES = 'flow.possibleProjectStages';
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

  const {
    data: listTasks,
    isLoadingTasks,
    errorTasks,
  }: UseQueryResult<any, Error> = useQuery<any>({
    queryKey: ['listTasks', projectSlug],
    queryFn: () => fetchListTasksBySlug(projectSlug || ''),
    enabled: !!projectSlug,
  });

  const breadcrumbs = [
    { href: '/', label: 'Главная', isFirst: true },
    { href: '/projects', label: 'Проекты' },
    ...(project ? [{ href: `/projects/${slug}`, label: project.name, isActive: true }] : []),
  ];
  useEffect(() => {
    console.log(project);
    console.log(listTasks);
  }, []);
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
                {isLoadingTasks && <Loader />}
                {error && (
                  <p className={styles['error-message']}>Ошибка загрузки: {error.message}</p>
                )}
                {project &&
                  listTasks &&
                  project.flow.possibleProjectStages.map((stages) => {
                    const filteredTasks = listTasks.filter((task) => task.stage === stages.id);
                    return (
                      <TaskColumn
                        key={stages.id}
                        heading={stages.name}
                        taskCount={filteredTasks.length}
                      >
                        {filteredTasks.map((task) => (
                          <TaskCard
                            key={task.id}
                            link="#"
                            id={task.id}
                            priority={task.priority}
                            name={task.name}
                            users={task.users}
                            task_type={task.task_type}
                            task_component={project.flow.possibleProjectComponents[task.component]}
                          />
                        ))}
                      </TaskColumn>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </ProjectLayout>
    </>
  );
}
