import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import CustomCombobox from '@/components/ui/CustomCombobox/CustomCombobox';
import DateInput from '@/components/ui/DateInput/DateInput';
import useProject from '@/hooks/useProject';
import useTasks from '@/hooks/useTasks';
import useAuthStore, { useMainStore } from '@/store/store';
import { TaskComponent, TaskType, UseProjectReturn, User, UseTasksReturn } from '@/types/task';
import useTaskFilters from '@/hooks/useTaskFilters';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import ProjectService from '@/services/project.service';
import { useForm } from 'react-hook-form';
import IconButton from '@/components/ui/Button/IconButton/IconButton';
import useTaskStore from '@/store/taskStore';
import TaskService from '@/services/task.service';
import styles from './CreateModal.module.scss';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
/* eslint-disable */
interface TaskFormValues {
  taskName: string;
  selectedPriority: string | null;
  selectedType: string | null;
  selectedComponent: string | null;
  selectedPersons: User[];
  startDate: Date | null;
  endDate: Date | null;
  layoutLink: string;
  markupLink: string;
  devLink: string;
}

// type ModalType = 'creating' | 'editing';

const CreateModal: React.FC = () => {
  const { idTask: id } = useTaskStore();

  const { isCreatedModalOpen, setIsCreatedModalOpen, modalType: type } = useMainStore();
  const router = useRouter();
  const { slug } = router.query;
  const projectSlug: string = Array.isArray(slug) ? slug[0] : slug || '';

  const { project, isLoading, projectUsers }: UseProjectReturn = useProject(projectSlug);
  const { taskTypes, taskComponent, taskPriority }: UseTasksReturn = useTasks(project?.slug || '');
  const { user } = useAuthStore();

  const [typeQuery, setTypeQuery] = useState<string>('');
  const [componentQuery, setComponentQuery] = useState<string>('');
  const [peopleQuery, setPeopleQuery] = useState<string>('');
  const [priorityQuery, setPriorityQuery] = useState<string>('');

  const [filteredPeople, setFilteredPeople] = useState<User[]>([]);
  const [filteredTypes, setFilteredTypes] = useState<TaskType[]>([]);
  const [filteredPriority, setFilteredPriority] = useState<any>([]);
  const [filteredComponents, setFilteredComponents] = useState<TaskComponent[]>([]);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const {
    startDate,
    endDate,
    selectedPersons,
    selectedType,
    selectedComponent,
    selectedPriority,
    setStartDate,
    setEndDate,
    setSelectedPersons,
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: {
      taskName: '',
      selectedPriority: null,
      selectedType: null,
      selectedComponent: null,
      selectedPersons: [],
      startDate: null,
      endDate: null,
      layoutLink: '',
      markupLink: '',
      devLink: '',
    },
    mode: 'onBlur',
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
      const filtered = taskPriority.filter((priority: any) =>
        priority.name.toLowerCase().includes(priorityQuery.toLowerCase())
      );
      setFilteredPriority(filtered);
    }
  }, [priorityQuery, taskPriority]);

  const queryClient = useQueryClient();

  const { mutate: createTask } = useMutation({
    mutationFn: (taskData: Partial<any>) => ProjectService.createTask(projectSlug, taskData),
    onSuccess: () => {
      alert('Задача успешно создана!');
      queryClient.invalidateQueries({ queryKey: ['tasks', projectSlug] });
    },
    onError: () => {
      alert('Произошла ошибка при создании задачи.');
    },
  });

  const { data: taskInfo }: UseQueryResult<any, Error> = useQuery<any>({
    queryKey: ['taskInfo'],
    queryFn: () => TaskService.getTask(id),
    enabled: !!id,
  });

  const { mutate: editTask } = useMutation({
    mutationFn: (taskData: Partial<any>) => TaskService.patchTask(id, taskData),
    onSuccess: () => {
      alert('Задача успешно изменена!');
      queryClient.invalidateQueries({ queryKey: ['tasks', projectSlug] });
    },
    onError: () => {
      alert('Произошла ошибка при редактировании задачи.');
    },
  });

  const onSubmit = (data: any) => {
    if (!projectSlug || !data.taskName || !startDate || !endDate) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    const taskData = {
      name: data.taskName ?? taskInfo?.name,
      description: '' /*taskInfo?.description*/,
      stage_id: taskInfo?.stage?.id ?? 1,
      task_type_id: selectedType?.id,
      component_id: selectedComponent?.id,
      priority_id: selectedPriority?.id,
      layout_link: data.layoutLink ?? taskInfo?.layout_link,
      markup_link: data.markupLink ?? taskInfo?.markup_link,
      dev_link: data.devLink ?? taskInfo?.dev_link,
      executors: selectedPersons.map((p) => p.id),
      data_start: startDate,
      data_end: endDate,
      begin: startDate.toISOString(),
      end: endDate.toISOString(),
    };

    if (type === 'creating') {
      createTask(taskData);
    } else {
      editTask(taskData);
    }
  };

  return (
    <div className={cn(styles.modal__wrapper, { [styles.hidden]: !isCreatedModalOpen })}>
      <div className={cn(styles.modal)}>
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          closeConfirmModal={setIsConfirmModalOpen}
          onClick={setIsCreatedModalOpen}
        />
        <div className={cn(styles.modal__header)}>
          <h2 className={cn(styles.modal__header_title)}>
            {type === 'creating' ? 'Создание задачи' : 'Редактирование задачи'}
          </h2>

          <IconButton
            className={cn(styles.modal__header_close)}
            onClick={() => setIsConfirmModalOpen(true)}
            view="secondary"
          >
            <svg className="social-icon" viewBox="0 0 24 24" width="24" height="24">
              <use href="/sprite.svg#close" />
            </svg>
          </IconButton>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={cn(styles.modal__main)}>
            <div className={cn(styles['modal__text-input'])}>
              <input
                {...register('taskName', {
                  required: 'Название задачи обязательно',
                  maxLength: { value: 100, message: 'Максимальная длина — 100 символов' },
                })}
                type="text"
                placeholder="Название задачи"
              />
              {errors.taskName && (
                <span className={cn(styles.modal__error)}>{errors.taskName.message}</span>
              )}
            </div>

            <div className={cn(styles['modal__main-comboboxes'])}>
              <div>
                <CustomCombobox
                  label="Выбрать тип"
                  value={selectedType}
                  onChange={(value) => setSelectedType(value)}
                  onQueryChange={setTypeQuery}
                  displayValue={(type: TaskType) => type?.name || ''}
                  placeholder="Тип задачи"
                  options={filteredTypes}
                />
                {errors.selectedType && (
                  <span className={cn(styles.modal__error)}>{errors.selectedType.message}</span>
                )}
              </div>

              <div>
                <CustomCombobox
                  label="Компонент"
                  value={selectedComponent}
                  onChange={(value) => setSelectedComponent(value)}
                  onQueryChange={setComponentQuery}
                  displayValue={(component: TaskComponent) => component?.name || ''}
                  placeholder="Компонент"
                  options={filteredComponents}
                />
                {errors.selectedComponent && (
                  <span className={cn(styles.modal__error)}>
                    {errors.selectedComponent.message}
                  </span>
                )}
              </div>

              <div>
                <CustomCombobox
                  label="Исполнители"
                  value={selectedPersons}
                  onChange={(value) => setSelectedPersons(value)}
                  onQueryChange={setPeopleQuery}
                  options={filteredPeople}
                  displayValue={(person: any) => person.name}
                  placeholder="Выберите исполнителей"
                  isMulti
                />
                {errors.selectedPersons && (
                  <span className={cn(styles.modal__error)}>{errors.selectedPersons.message}</span>
                )}
              </div>
            </div>

            <div className={cn(styles['modal__extra-comboboxes'])}>
              <div>
                <CustomCombobox
                  label="Приоритет"
                  value={selectedPriority}
                  onChange={(value) => setSelectedPriority(value)}
                  onQueryChange={setPriorityQuery}
                  displayValue={(priority: any) => priority?.name || ''}
                  placeholder="Приоритет"
                  options={filteredPriority}
                />
                {errors.selectedPriority && (
                  <span className={cn(styles.modal__error)}>{errors.selectedPriority.message}</span>
                )}
              </div>

              <div>
                <DateInput
                  selectedDate={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholder="Дата начала"
                />
                {errors.startDate && (
                  <span className={cn(styles.modal__error)}>{errors.startDate.message}</span>
                )}
              </div>

              <div>
                <DateInput
                  selectedDate={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  placeholder="Дата завершения"
                />
                {errors.endDate && (
                  <span className={cn(styles.modal__error)}>{errors.endDate.message}</span>
                )}
              </div>
            </div>

            <div className={cn(styles['modal__links-wrapper'])}>
              <label>
                <span>Layout link</span>
                <input
                  type="text"
                  placeholder="Layout link"
                  {...register('layoutLink', {
                    validate: (value) =>
                      value === '' ||
                      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ||
                      'Неверный формат URL',
                  })}
                />
                {errors.layoutLink && (
                  <span className={cn(styles.modal__error)}>{errors.layoutLink.message}</span>
                )}
              </label>

              <label>
                <span>Markup link</span>
                <input
                  type="text"
                  placeholder="Markup link"
                  {...register('markupLink', {
                    validate: (value) =>
                      value === '' ||
                      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ||
                      'Неверный формат URL',
                  })}
                />
                {errors.markupLink && (
                  <span className={cn(styles.modal__error)}>{errors.markupLink.message}</span>
                )}
              </label>

              <label>
                <span>Dev link</span>
                <input
                  type="text"
                  placeholder="Dev link"
                  {...register('devLink', {
                    validate: (value) =>
                      value === '' ||
                      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ||
                      'Неверный формат URL',
                  })}
                />
                {errors.devLink && (
                  <span className={cn(styles.modal__error)}>{errors.devLink.message}</span>
                )}
              </label>
            </div>
          </div>

          <div className={cn(styles.modal__footer)}>
            <StandardButton type="submit" loading={isLoading}>
              {type === 'creating' ? 'Добавить' : 'Сохранить'}
            </StandardButton>
            <StandardButton onClick={() => setIsConfirmModalOpen(true)} view="secondary">
              Отменить
            </StandardButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
