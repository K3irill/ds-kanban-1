import cn from 'classnames';
import { useEffect } from 'react';
import styles from './TaskComponent.module.scss';

const TaskComponent = ({ component }) => {
  useEffect(() => {
    console.log(component.name);
  }, [component]);
  return (
    <div style={{ backgroundColor: `${component.color}` }} className={cn(styles['task-component'])}>
      <span>{component.name}</span>
    </div>
  );
};

export default TaskComponent;
