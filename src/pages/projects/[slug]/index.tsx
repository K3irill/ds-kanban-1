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
import SwitchElement from '@/components/ui/SwitchElement/SwitchElement';
import FiltersBlock from '@/components/kanban/FiltersBlock/FiltersBlock';
import useAuthStore from '@/store/store';

import {
  TaskComponent,
  TaskType,
  UseAuthStoreReturn,
  UseProjectReturn,
  User,
  UseTasksReturn,
} from '@/types/task';
import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import useTaskFilters from '@/hooks/useTaskFilters';
import styles from './KanbanPage.module.scss';
//----------------------------------------------------
/* eslint-disable no-nested-ternary */

export default function KanbanPage() {
  const { user } = useAuthStore() as UseAuthStoreReturn;
  const [peopleQuery, setPeopleQuery] = useState<string>('');
  const [typeQuery, setTypeQuery] = useState<string>('');
  const [componentQuery, setComponentQuery] = useState<string>('');
  const router = useRouter();
  const { slug } = router.query;
  const projectSlug = Array.isArray(slug) ? slug[0] : slug;
  const { project, isLoading, error, projectUsers, isLoadingUsers }: UseProjectReturn = useProject(
    projectSlug || ''
  );
  const { listTasks, taskTypes, taskPriority, isLoadingTasks, taskComponent }: UseTasksReturn =
    useTasks(project?.slug || '');

  const [filteredUsers, setFilteredUsers] = useState<{ [taskId: number]: User[] }>({});
  const [filteredPeople, setFilteredPeople] = useState<User[]>([]);
  const [filteredTypes, setFilteredTypes] = useState<TaskType[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<TaskComponent[]>([]);
  const {
    startDate,
    endDate,
    selectedPersons,
    selectedType,
    taskNameValue,
    selectedComponent,
    onlyMyTask,
    filteredTasks,
    setStartDate,
    setEndDate,
    setTaskNameValue,
    setOnlyMyTask,
    setSelectedPersons,
    setSelectedType,
    setSelectedComponent,
  } = useTaskFilters({
    tasks: listTasks,
    users: projectUsers,
    taskTypes,
    taskComponents: taskComponent,
    currentUser: user,
    priority: taskPriority,
  });

  const breadcrumbs = [
    { href: '/', label: 'Главная', isFirst: true },
    { href: '/projects', label: 'Проекты' },
    ...(project ? [{ href: `/projects/${slug}`, label: project.name, isActive: true }] : []),
  ];

  useEffect(() => {
    if (projectUsers && listTasks) {
      const userMap: { [taskId: number]: User[] } = {};
      listTasks.forEach((task) => {
        const usersForTask = projectUsers.filter(
          (projectUser) => task.users && task.users.includes(projectUser.id)
        );
        userMap[task.id] = usersForTask;
      });
      setFilteredUsers(userMap);
    }
  }, [projectUsers, listTasks]);

  useEffect(() => {
    if (projectUsers) {
      const filterPeople =
        peopleQuery === ''
          ? projectUsers
          : projectUsers.filter((person) =>
              person.name.toLowerCase().includes(peopleQuery.toLowerCase())
            );
      setFilteredPeople(filterPeople);
    }
  }, [peopleQuery, projectUsers]);

  useEffect(() => {
    if (taskTypes) {
      const filterTypes =
        typeQuery === ''
          ? taskTypes
          : taskTypes.filter((type) => type.name.toLowerCase().includes(typeQuery.toLowerCase()));
      setFilteredTypes(filterTypes);
    }
  }, [typeQuery, taskTypes]);

  useEffect(() => {
    if (taskComponent) {
      const filterComponents =
        componentQuery === ''
          ? taskComponent
          : taskComponent.filter((component) =>
              component.name.toLowerCase().includes(componentQuery.toLowerCase())
            );
      setFilteredComponents(filterComponents);
    }
  }, [componentQuery, taskComponent]);

  if (!router.isReady)
    return (
      <div className={cn('loader-container')}>
        <Loader />
      </div>
    );

  return (
    <>
      <Head>
        <title>{project?.name || 'Загрузка...'}</title>
        <meta name="description" content="Проект" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProjectLayout breadcrumbs={breadcrumbs}>
        {isLoading && isLoadingUsers && isLoadingTasks ? (
          <div className={cn('loader-container')}>
            <Loader />
          </div>
        ) : (
          <>
            <div className={cn(styles['project-kanban__header'])}>
              <div className={cn(styles['project-kanban__header_left'])}>
                <h1>{project?.name || 'Загрузка...'}</h1>{' '}
                <SwitchElement
                  label="Только мои"
                  switchChecked={onlyMyTask}
                  switchOnChange={setOnlyMyTask}
                />
              </div>
              <div className={cn(styles['project-kanban__header_right'])}>
                <StandardButton iconPosition="left" icon="/icons/Create.svg">
                  Добавить задачу
                </StandardButton>
              </div>
            </div>

            <FiltersBlock
              taskNameValue={taskNameValue}
              setTaskNameValue={setTaskNameValue}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              selectedPersons={selectedPersons}
              setSelectedPersons={setSelectedPersons}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedComponent={selectedComponent}
              setSelectedComponent={setSelectedComponent}
              filteredPeople={filteredPeople}
              setPeopleQuery={setPeopleQuery}
              filteredTypes={filteredTypes}
              setTypeQuery={setTypeQuery}
              filteredComponents={filteredComponents}
              setComponentQuery={setComponentQuery}
            />
            <div className={cn(styles['project-kanban__tasks-wrapper'])}>
              <div className={cn(styles['project-kanban__tasks-container'])}>
                {isLoadingTasks ? (
                  <div className={cn('loader-container')}>
                    <Loader />
                  </div>
                ) : error ? (
                  <p className={styles['error-message']}>Ошибка загрузки: {error.message}</p>
                ) : (
                  project &&
                  filteredTasks &&
                  project.flow.possibleProjectStages.length > 0 &&
                  project.flow.possibleProjectStages.map((stage) => {
                    const tasksForStage = filteredTasks.filter((task) => task.stage === stage.id);

                    return (
                      <TaskColumn
                        key={stage.id}
                        heading={stage.name}
                        taskCount={tasksForStage.length}
                      >
                        {tasksForStage.map((task) => {
                          const taskTypeLabel = taskTypes && taskTypes[task.task_type - 1];
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
                                project.flow.possibleProjectComponents[task.component - 1]
                              }
                            />
                          );
                        })}
                      </TaskColumn>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}
      </ProjectLayout>
    </>
  );
}
