import cn from 'classnames';
import styles from './TaskType.module.scss';

const TASK_TYPES = [
  {
    type: 'feature',
  },
  {
    type: 'bug',
  },
  {
    type: 'task',
  },

  {
    type: 'improvement',
  },
  {
    type: 'release',
  },
  {
    type: 'epic',
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
