import { useEffect, useState } from 'react';
import { Task, TaskComponent, TaskType, User } from '@/types/task';

type UseTaskFiltersProps = {
  tasks: Task[];
  users: User[];
  taskTypes: TaskType[];
  taskComponents: TaskComponent[];
  currentUser: User;
};

export default function useTaskFilters({
  tasks,
  users,
  taskTypes,
  taskComponents,
  currentUser,
  priority,
}: UseTaskFiltersProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [taskNameValue, setTaskNameValue] = useState<string>('');
  const [onlyMyTask, setOnlyMyTask] = useState<boolean>(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState<User | null>(null);
  const [selectedType, setSelectedType] = useState<TaskType | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<TaskComponent | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    let filtered = tasks;

    if (onlyMyTask) {
      filtered = filtered.filter((task) => task.users?.includes(currentUser.id));
    }
    if (selectedPerson) {
      filtered = filtered.filter((task) => task.users?.includes(selectedPerson.id));
    }
    if (selectedType) {
      filtered = filtered.filter((task) => task.task_type === selectedType.id);
    }
    if (selectedComponent) {
      filtered = filtered.filter((task) => task.component === selectedComponent.id);
    }
    if (selectedPriority) {
      filtered = filtered.filter((task) => task.priority === selectedPriority.id);
    }
    if (taskNameValue) {
      filtered = filtered.filter((task) =>
        task.name.toLowerCase().includes(taskNameValue.toLowerCase())
      );
    }
    if (startDate) {
      filtered = filtered.filter((task) => new Date(task.date_start || 0) >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter((task) => new Date(task.date_end || 0) <= endDate);
    }

    setFilteredTasks(filtered);
  }, [
    onlyMyTask,
    selectedPerson,
    selectedType,
    selectedComponent,
    taskNameValue,
    startDate,
    endDate,
    tasks,
  ]);

  return {
    startDate,
    endDate,
    selectedPerson,
    selectedType,
    taskNameValue,
    selectedComponent,
    onlyMyTask,
    filteredTasks,
    setStartDate,
    setEndDate,
    setTaskNameValue,
    setOnlyMyTask,
    setSelectedPerson,
    setSelectedType,
    setSelectedComponent,
    setSelectedPriority,
  };
}
