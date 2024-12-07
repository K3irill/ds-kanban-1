'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import ProjectLayout from '@/components/layout/Project/ProjectLayout';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Loader from '@/components/ui/Loader/loader';
import TaskColumn from '@/components/task/TaskColumn/TaskColumn';

import useProject from '@/hooks/useProject';
import useTasks from '@/hooks/useTasks';
import TaskCard from '@/components/task/TaskCard/TaskCard';
import styles from './KanbanPage.module.scss';

export default function KanbanPage() {
  const router = useRouter();
  const { slug } = router.query;
  const projectSlug = Array.isArray(slug) ? slug[0] : slug;

  const { project, isLoading, error, projectUsers } = useProject(projectSlug || '');

  const { listTasks, taskTypes, taskPriority, isLoadingTasks } = useTasks(project?.slug || '');
  const [filteredUsers, setFilteredUsers] = useState<{ [key: number]: any[] }>({});

  const breadcrumbs = [
    { href: '/', label: 'Главная', isFirst: true },
    { href: '/projects', label: 'Проекты' },
    ...(project ? [{ href: `/projects/${slug}`, label: project.name, isActive: true }] : []),
  ];

  useEffect(() => {
    if (projectUsers && listTasks) {
      const userMap: { [key: number]: any[] } = {};

      listTasks.forEach((task) => {
        const usersForTask = projectUsers.filter(
          (user) => task.users && task.users.includes(user.id)
        );
        userMap[task.id] = usersForTask;
      });

      setFilteredUsers(userMap);
    }
  }, [projectUsers, listTasks]);

  // useEffect(() => {
  //   console.log(project);
  //   console.log(listTasks);
  //   console.log(projectUsers);
  // }, [project]);
  useEffect(() => {
    console.log(projectUsers);
  }, [projectUsers]);
  if (!router.isReady) return <Loader />;
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
                    console.log(listTasks);

                    return (
                      <TaskColumn
                        key={stages.id}
                        heading={stages.name}
                        taskCount={filteredTasks.length}
                      >
                        {filteredTasks.map((task) => {
                          const taskTypeLabel = taskTypes && taskTypes[task.task_type];
                          const taskPriorityLabel = taskPriority && taskPriority[task.priority - 1];
                          const taskUsers = filteredUsers[task.id] || [];

                          return (
                            <TaskCard
                              key={task.id}
                              id={task.id}
                              priority={taskPriorityLabel}
                              name={task.name}
                              users={taskUsers}
                              task_type={taskTypeLabel}
                              epic={task.epic_name}
                              task_component={
                                project.flow.possibleProjectComponents[task.component]
                              }
                            />
                          );
                        })}
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
