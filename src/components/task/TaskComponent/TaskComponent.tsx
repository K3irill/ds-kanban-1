import cn from 'classnames';
import styles from './TaskComponent.module.scss';

const TaskComponent = ({ component }: any) => (
  <div style={{ backgroundColor: `${component.color}` }} className={cn(styles['task-component'])}>
    <span>{component.name}</span>
  </div>
);

export default TaskComponent;
