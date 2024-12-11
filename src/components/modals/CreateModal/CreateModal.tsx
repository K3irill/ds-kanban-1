import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import CustomCombobox from '@/components/ui/CustomCombobox/CustomCombobox';
import DateInput from '@/components/ui/DateInput/DateInput';
import useProject from '@/hooks/useProject';
import useTasks from '@/hooks/useTasks';
import useAuthStore from '@/store/store';
import { TaskComponent, TaskType, UseProjectReturn, User, UseTasksReturn } from '@/types/task';
import useTaskFilters from '@/hooks/useTaskFilters';
import { useRouter } from 'next/router';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import ProjectService from '@/services/project.service';
import styles from './CreateModal.module.scss';

const CreateModal = () => {
  const router = useRouter();
  const { slug } = router.query;
  const projectSlug = Array.isArray(slug) ? slug[0] : slug;

  const { project, isLoading, error, projectUsers }: UseProjectReturn = useProject(
    projectSlug || ''
  );
  const { taskTypes, taskComponent, taskPriority }: UseTasksReturn = useTasks(project?.slug || '');
  const { user } = useAuthStore();
  const [taskName, setTaskName] = useState('');
  const [typeQuery, setTypeQuery] = useState('');
  const [componentQuery, setComponentQuery] = useState('');
  const [peopleQuery, setPeopleQuery] = useState('');
  const [priorityQuery, setPriorityQuery] = useState('');
  const [filteredPeople, setFilteredPeople] = useState<User[]>([]);
  const [filteredTypes, setFilteredTypes] = useState<TaskType[]>([]);
  const [filteredPriority, setFilteredPriority] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState<TaskComponent[]>([]);

  const {
    startDate,
    endDate,
    selectedPerson,
    selectedType,
    selectedComponent,
    selectedPriority,
    setStartDate,
    setEndDate,
    setSelectedPerson,
    setSelectedType,
    setSelectedComponent,
    setSelectedPriority,
  } = useTaskFilters({
    tasks: [],
    users: projectUsers,
    taskTypes,
    taskComponents: taskComponent,
    currentUser: user,
    priority: taskPriority,
  });

  useEffect(() => {
    if (projectUsers) {
      const filtered = projectUsers.filter((user) =>
        user.name.toLowerCase().includes(peopleQuery.toLowerCase())
      );
      setFilteredPeople(filtered);
    }
  }, [peopleQuery, projectUsers]);

  useEffect(() => {
    if (taskTypes) {
      const filtered = taskTypes.filter((type) =>
        type.name.toLowerCase().includes(typeQuery.toLowerCase())
      );
      setFilteredTypes(filtered);
    }
  }, [typeQuery, taskTypes]);

  useEffect(() => {
    if (taskComponent) {
      const filtered = taskComponent.filter((component) =>
        component.name.toLowerCase().includes(componentQuery.toLowerCase())
      );
      setFilteredComponents(filtered);
    }
  }, [componentQuery, taskComponent]);

  useEffect(() => {
    if (taskPriority) {
      const filtered = taskPriority.filter((priority) =>
        priority.name.toLowerCase().includes(priorityQuery.toLowerCase())
      );
      setFilteredPriority(filtered);
    }
  }, [priorityQuery, taskPriority]);

  const {
    mutate: createTask,
    isLoading: isCreating,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (taskData) => ProjectService.createTask('project1', taskData),
    onSuccess: () => {
      alert('Задача успешно создана!');
    },
    onError: () => {
      alert('Произошла ошибка при создании задачи.');
    },
  });
  useEffect(() => {
    console.log(selectedPriority);
  }, [selectedPriority]);

  const handleCreateTask = () => {
    if (!taskName || !startDate || !endDate) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    const taskData = {
      name: taskName,
      description: '',
      stage_id: 1,
      task_type_id: selectedType.id,
      component_id: selectedComponent.id,
      priority_id: 2,
      block_id: 1,
      release_id: 1,
      related_id: 1,
      epic_id: 1,
      estimate_cost: 10,
      estimate_worker: 1,
      layout_link: '',
      markup_link: '',
      dev_link: '',
      executors: [selectedPerson],
      begin: startDate.toISOString(),
      end: endDate.toISOString(),
    };

    createTask(taskData);
  };
  return (
    <div className={cn(styles.modal__wrapper)}>
      <div className={cn(styles.modal)}>
        <div className={cn(styles.modal__header)}>
          <h2 className={cn(styles.modal__header_title)}>Создание задачи</h2>
          <button className={cn(styles.modal__header_close)} type="button">
            X
          </button>
        </div>
        <div className={cn(styles.modal__main)}>
          <div className={cn(styles['modal__text-input'])}>
            <input
              onChange={(e) => setTaskName(e.target.value)}
              type="text"
              placeholder="Название задачи"
            />
          </div>

          <div className={cn(styles['modal__main-comboboxes'])}>
            <CustomCombobox
              label="Выбрать тип"
              value={selectedType}
              onChange={setSelectedType}
              onQueryChange={setTypeQuery}
              displayValue={(type: TaskType) => type?.name || ''}
              placeholder="Тип задачи"
              options={filteredTypes}
            />
            <CustomCombobox
              label="Компонент"
              value={selectedComponent}
              onChange={setSelectedComponent}
              onQueryChange={setComponentQuery}
              displayValue={(component: TaskComponent) => component?.name || ''}
              placeholder="Компонент"
              options={filteredComponents}
            />
            <CustomCombobox
              label="Исполнитель"
              value={selectedPerson}
              onChange={setSelectedPerson}
              onQueryChange={setPeopleQuery}
              displayValue={(person: User) => person?.name || ''}
              placeholder="Исполнитель"
              options={filteredPeople}
            />
          </div>

          <div className={cn(styles['modal__extra-comboboxes'])}>
            <CustomCombobox
              label="Приоритет"
              value={selectedPriority}
              onChange={setSelectedPriority}
              onQueryChange={setPriorityQuery}
              displayValue={(priority) => priority?.name || ''}
              placeholder="Приоритет"
              options={filteredPriority}
            />

            <input type="text" placeholder="Оценка" />
            <DateInput
              selectedDate={startDate}
              onChange={setStartDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholder="Дата начала"
            />
            <DateInput
              selectedDate={endDate}
              onChange={setEndDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholder="Дата завершения"
            />
          </div>
        </div>

        <div className={cn(styles.modal__footer)}>
          <StandardButton onClick={handleCreateTask} disabled={isLoading}>
            {isCreating ? 'Создание...' : 'Добавить'}
          </StandardButton>
          <StandardButton view="secondary">Отменить</StandardButton>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
