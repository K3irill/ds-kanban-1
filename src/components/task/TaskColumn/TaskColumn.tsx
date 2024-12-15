import React, { useEffect, useRef } from 'react';
import styles from './TaskColumn.module.scss';
/* eslint-disable */
interface TaskColumnProps {
  children: React.ReactNode;
  heading?: string;
  taskCount?: number;
  forMain?: boolean;
  scrollDirection?: 'up' | 'down';
}

const TaskColumn = ({
  children,
  heading,
  taskCount,
  forMain,
  scrollDirection,
}: TaskColumnProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 1;
    let animationFrameId: number;

    const scrollContent = () => {
      if (scrollDirection === 'up') {
        container.scrollTop -= scrollAmount;
        if (container.scrollTop <= 0) {
          container.scrollTop = container.scrollHeight;
        }
      } else if (scrollDirection === 'down') {
        container.scrollTop += scrollAmount;
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
          container.scrollTop = 0;
        }
      }

      animationFrameId = requestAnimationFrame(scrollContent);
    };

    scrollContent();

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollDirection]);

  return (
    <div className={styles.column}>
      <div className={styles['column__heading-wrapper']}>
        {heading && <h3 className={styles.column__heading}>{heading}</h3>}
        {taskCount && <span className={styles.column__taskCount}>{taskCount}</span>}
      </div>
      {forMain ? (
        <div
          ref={containerRef}
          className={styles.column__item}
          style={{ overflow: 'auto', height: '100vh', marginTop: '-20px', scrollbarWidth: 'none' }}
        >
          {children}
        </div>
      ) : (
        <div className={styles.column__item}>{children}</div>
      )}
    </div>
  );
};

export default TaskColumn;
