import cn from 'classnames';
import styles from './TaskType.module.scss';

const TASK_TYPES = [
  {
    type: 'task',
  },
  {
    type: 'bug',
  },
  {
    type: 'improvement',
  },
  {
    type: 'feature',
  },
  {
    type: 'epic',
  },
  {
    type: 'release',
  },
  {
    type: 'backlog',
  },
  {
    type: 'guarantee',
  },
];

const TaskType = ({ type: task_type }) => (
  <div className={cn(styles['task-type'], styles[`task-type--${TASK_TYPES[task_type.id].type}`])}>
    <span>{task_type.name}</span>
  </div>
);

export default TaskType;
