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
import {
  Switch,
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import useAuthStore from '@/store/store';
import styles from './KanbanPage.module.scss';
//----------------------------------------------------
/* eslint-disable no-nested-ternary */

export default function KanbanPage() {
  const { user } = useAuthStore();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [taskNameValue, setTaskNameValue] = useState('');
  const [onlyMyTask, setOnlyMyTask] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [peopleQuery, setPeopleQuery] = useState('');
  const [typeQuery, setTypeQuery] = useState('');
  const [componentQuery, setComponentQuery] = useState('');
  const router = useRouter();
  const { slug } = router.query;
  const projectSlug = Array.isArray(slug) ? slug[0] : slug;
  const { project, isLoading, error, projectUsers, isLoadingUsers } = useProject(projectSlug || '');
  const { listTasks, taskTypes, taskPriority, isLoadingTasks, taskComponent } = useTasks(
    project?.slug || ''
  );
  const [filteredUsers, setFilteredUsers] = useState({});
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const breadcrumbs = [
    { href: '/', label: 'Главная', isFirst: true },
    { href: '/projects', label: 'Проекты' },
    ...(project ? [{ href: `/projects/${slug}`, label: project.name, isActive: true }] : []),
  ];

  useEffect(() => {
    if (projectUsers && listTasks) {
      const userMap = {};
      listTasks.forEach((task) => {
        const usersForTask = projectUsers.filter(
          (user) => task.users && task.users.includes(user.id)
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

  useEffect(() => {
    let filtered = listTasks || [];

    if (onlyMyTask) {
      filtered = filtered.filter((task) => task.users && task.users.includes(user.id));
    }
    if (selectedPerson) {
      filtered = filtered.filter((task) => task.users && task.users.includes(selectedPerson.id));
    }

    if (selectedType) {
      filtered = filtered.filter((task) => task.task_type === selectedType.id);
    }

    if (selectedComponent) {
      filtered = filtered.filter((task) => task.component === selectedComponent.id);
    }

    if (taskNameValue) {
      filtered = filtered.filter((task) =>
        task.name.toLowerCase().includes(taskNameValue.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [onlyMyTask, selectedPerson, selectedType, selectedComponent, taskNameValue, listTasks]);

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
              <h1>{project?.name || 'Загрузка...'}</h1>{' '}
              <div className={cn(styles['switch-element'])}>
                <Switch
                  checked={onlyMyTask}
                  onChange={setOnlyMyTask}
                  className={cn(styles['switch-container'], { [styles.active]: onlyMyTask })}
                >
                  <span className={cn(styles['switch-thumb'], { [styles.active]: onlyMyTask })} />
                </Switch>
                <span className={cn(styles['switch-element__text'])}>Только мои</span>
              </div>
            </div>
            <div className={cn(styles['project-kanban__filters'])}>
              <div className={cn(styles['project-kanban__inputs'])}>
                {/* Инпуты */}
                <div className={cn(styles['project-kanban__input'])}>
                  <label htmlFor="">
                    <span>Название задачи</span>
                  </label>
                  <input
                    value={taskNameValue}
                    onChange={(e) => setTaskNameValue(e.target.value)}
                    type="text"
                    placeholder="Название задачи"
                  />
                </div>

                <div className={cn(styles['project-kanban__input'])}>
                  <label htmlFor="assignee">
                    <span>Выбрать пользователя</span>
                  </label>
                  <Combobox
                    value={selectedPerson}
                    onChange={setSelectedPerson}
                    onClose={() => setPeopleQuery('')}
                  >
                    <div className={styles['combobox-container']}>
                      <ComboboxInput
                        className={styles['combobox-input']}
                        aria-label="Assignee"
                        displayValue={(person) => person?.name || ''}
                        onChange={(event) => setPeopleQuery(event.target.value)}
                        placeholder="Выберите пользователя"
                      />
                      <ComboboxOptions className={styles['combobox-options']}>
                        {filteredPeople.length === 0 && peopleQuery !== '' ? (
                          <ComboboxOption
                            value="Нет совпадений"
                            disabled
                            className={styles['no-matches']}
                          >
                            Нет совпадений
                          </ComboboxOption>
                        ) : (
                          filteredPeople.map((person) => (
                            <ComboboxOption
                              key={person.id}
                              value={person}
                              className={({ active }) =>
                                cn(styles['combobox-option'], { [styles.selected]: active })
                              }
                            >
                              {person.name}
                            </ComboboxOption>
                          ))
                        )}
                      </ComboboxOptions>
                    </div>
                  </Combobox>
                </div>

                <div className={cn(styles['project-kanban__input'])}>
                  <label htmlFor="assignee">
                    <span>Выбрать тип</span>
                  </label>
                  <Combobox
                    value={selectedType}
                    onChange={setSelectedType}
                    onClose={() => setTypeQuery('')}
                  >
                    <div className={styles['combobox-container']}>
                      <ComboboxInput
                        className={styles['combobox-input']}
                        aria-label="Assignee"
                        displayValue={(type) => type?.name || ''}
                        onChange={(event) => setTypeQuery(event.target.value)}
                        placeholder="Выберите тип задачи"
                      />
                      <ComboboxOptions className={styles['combobox-options']}>
                        {filteredTypes.length === 0 && typeQuery !== '' ? (
                          <ComboboxOption
                            value="Нет совпадений"
                            disabled
                            className={styles['no-matches']}
                          >
                            Нет совпадений
                          </ComboboxOption>
                        ) : (
                          filteredTypes.map((type) => (
                            <ComboboxOption
                              key={type.id}
                              value={type}
                              className={({ active }) =>
                                cn(styles['combobox-option'], { [styles.selected]: active })
                              }
                            >
                              {type.name}
                            </ComboboxOption>
                          ))
                        )}
                      </ComboboxOptions>
                    </div>
                  </Combobox>
                </div>

                <div className={cn(styles['project-kanban__input'])}>
                  <label htmlFor="assignee">
                    <span>Выбрать компонент</span>
                  </label>
                  <Combobox
                    value={selectedComponent}
                    onChange={setSelectedComponent}
                    onClose={() => setComponentQuery('')}
                  >
                    <div className={styles['combobox-container']}>
                      <ComboboxInput
                        className={styles['combobox-input']}
                        aria-label="Assignee"
                        displayValue={(component) => component?.name || ''}
                        onChange={(event) => setComponentQuery(event.target.value)}
                        placeholder="Выберите компонент задачи"
                      />
                      <ComboboxOptions className={styles['combobox-options']}>
                        {filteredComponents.length === 0 && componentQuery !== '' ? (
                          <ComboboxOption
                            value="Нет совпадений"
                            disabled
                            className={styles['no-matches']}
                          >
                            Нет совпадений
                          </ComboboxOption>
                        ) : (
                          filteredComponents.map((component) => (
                            <ComboboxOption
                              key={component.id}
                              value={component}
                              className={({ active }) =>
                                cn(styles['combobox-option'], { [styles.selected]: active })
                              }
                            >
                              {component.name}
                            </ComboboxOption>
                          ))
                        )}
                      </ComboboxOptions>
                    </div>
                  </Combobox>
                </div>
              </div>
              <div className={cn(styles['project-kanban__calendars'])}>
                {/* дата начала дата завершения */}
              </div>
            </div>
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
