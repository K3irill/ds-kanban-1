import cn from 'classnames';
import styles from './TaskComponent.module.scss';

const TASK_COMPONENTS = [
  {
    name: 'Разработка',
    type: 'dev',
  },
  {
    name: 'Дизайн',
    type: 'design',
  },
  {
    name: 'Верстка',
    type: 'markup',
  },
  {
    name: 'Тестирование',
    type: 'test',
  },
  {
    name: 'Контент',
    type: 'content',
  },
  {
    name: 'Менеджмент',
    type: 'manage',
  },
  {
    name: 'Фронтенд',
    type: 'front',
  },
  {
    name: 'Администрирование',
    type: 'admin',
  },
];

const TaskComponent = ({ type: task_components }) => (
  <div
    className={cn(
      styles['task-component'],
      styles[`task-component--${TASK_COMPONENTS[task_components].type}`]
    )}
  >
    <span>{TASK_COMPONENTS[task_components].name}</span>
  </div>
);

export default TaskComponent;
