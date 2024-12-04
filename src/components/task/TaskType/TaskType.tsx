import cn from 'classnames';
import styles from './TaskType.module.scss';

const TASK_TYPES = [
  {
    name: 'Задача',
    type: 'task',
  },
  {
    name: 'Баг',
    type: 'bug',
  },
  {
    name: 'Улучшение',
    type: 'improvement',
  },
  {
    name: 'Новый функционал',
    type: 'feature',
  },
  {
    name: 'Эпик',
    type: 'epic',
  },
  {
    name: 'Релиз',
    type: 'release',
  },
  {
    name: 'Бэклог',
    type: 'backlog',
  },
  {
    name: 'Гарантия',
    type: 'guarantee',
  },
];

const TaskType = ({ type: task_type }) => (
  <div className={cn(styles['task-type'], styles[`task-type--${TASK_TYPES[task_type].type}`])}>
    <span>{TASK_TYPES[task_type].name}</span>
  </div>
);

export default TaskType;
