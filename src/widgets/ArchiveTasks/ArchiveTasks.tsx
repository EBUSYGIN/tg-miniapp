import { useEffect, useState } from 'react';
import { Card, Title, Tag } from '../../shared/ui';
import styles from './ArchiveTasks.module.css';
import { ITask } from '@/entities/task/types';
import { taskHandler } from '@/entities/task/handler';

export function ArchiveTasks() {
  const [archivedTasks, setArchivedTasks] = useState<ITask[] | null>(null);

  useEffect(() => {
    const getArchivedTasks = async () => {
      try {
        const data = await taskHandler.getArchiveTasks();
        if (data.success) {
          setArchivedTasks(data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getArchivedTasks();
  }, []);

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
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (!archivedTasks || archivedTasks.length < 1) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📋</div>
        <Title tag='h3' className={styles.emptyTitle}>
          Архив пуст
        </Title>
        <p className={styles.emptyText}>
          Здесь будут отображаться завершенные задачи
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title tag='h2' className={styles.title}>
          Архивные задачи ({archivedTasks.length})
        </Title>
      </div>

      <div className={styles.tasksList}>
        {archivedTasks.map((task) => (
          <Card key={task.id} className={styles.taskCard}>
            <div className={styles.taskHeader}>
              <div className={styles.taskInfo}>
                <Title tag='h3' className={styles.taskTitle}>
                  {task.task}
                </Title>
                <div className={styles.taskMeta}>
                  <Tag
                    className={styles.priorityTag}
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </Tag>
                  <span className={styles.deadline}>
                    Дедлайн: {formatDate(task.deadline)}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.executors}>
              <h4 className={styles.executorsTitle}>Исполнители:</h4>
              <div className={styles.executorsList}>
                {task.executors.map((executor) => (
                  <div key={executor.id} className={styles.executor}>
                    <span className={styles.executorName}>
                      {executor.executor_name}
                    </span>
                    {executor.is_complete && (
                      <span className={styles.completedBadge}>✓ Завершено</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.taskFooter}>
              <span className={styles.createdAt}>
                Создано: {formatDate(task.created_at)}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
