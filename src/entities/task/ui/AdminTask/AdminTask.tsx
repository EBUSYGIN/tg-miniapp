import { Tag, Card } from '../../../../shared/ui';
import { TaskProps } from './AdminTask.props';
import styles from './AdminTask.module.css';

import { parse } from 'date-fns';

export function AdminTask({
  task,
  deadline,
  executors,

  priority,
}: TaskProps) {
  const date = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parse(deadline, 'dd.MM.yyyy HH:mm', new Date()));

  const getPriorityColor = (priority: string) => {
    const normalizedPriority = priority.trim().toLowerCase();
    switch (normalizedPriority) {
      case 'высокий':
        return '#ef4444';
      case 'средний':
        return '#f59e0b';
      case 'низкий':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <Card className={styles.taskCard}>
      <div className={styles.taskHeader}>
        <div className={styles.taskInfo}>
          <div className={styles.taskTitle}>{task} </div>
          <div className={styles.taskMeta}>
            <Tag
              className={styles.priorityTag}
              style={{ backgroundColor: getPriorityColor(priority) }}
            >
              {priority}
            </Tag>
            <span className={styles.deadline}>Дедлайн: {date}</span>
          </div>
        </div>
      </div>

      <div className={styles.executors}>
        <h4 className={styles.executorsTitle}>Исполнители:</h4>
        <div className={styles.executorsList}>
          {executors.map((executor) => (
            <div key={executor.id} className={styles.executor}>
              <span className={styles.executorName}>
                {executor.executor_name} - {executor.executor_rang}
              </span>
              {executor.in_work && (
                <span className={styles.inWorkBadge}>В работе</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
